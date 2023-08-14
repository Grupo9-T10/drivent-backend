import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository, { PaymentParams } from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { prisma } from "../../config";
import { Prisma } from "@prisma/client";
import { confirmationMessage, sendEmail } from "../../utils/send-email";
import userRepository from "../../repositories/user-repository";

async function verifyTicketAndEnrollment(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findTickeyById(ticketId);
  
  if (!ticket) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);

  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  return enrollment
}

async function getPaymentByTicketId(userId: number, ticketId: number) {
  await verifyTicketAndEnrollment(ticketId, userId);

  const payment = await paymentRepository.findPaymentByTicketId(ticketId);

  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function paymentProcess(ticketId: number, userId: number, cardData: CardPaymentParams) {
  const enrollment = await verifyTicketAndEnrollment(ticketId, userId);

  const ticket = await ticketRepository.findTickeWithTypeById(ticketId);

  const paymentData = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await prisma.$transaction(async(tx:Prisma.TransactionClient)=>{
    const payment = await paymentRepository.createPayment(ticketId, paymentData,tx);
    await ticketRepository.ticketProcessPayment(ticketId,tx);
    return payment
  })
  
  const user = await userRepository.findById(enrollment.userId)
  const msg = confirmationMessage(ticket,enrollment)
  sendEmail(user.email,msg)

  return payment;
}

export type CardPaymentParams = {
  issuer: string,
  number: number,
  name: string,
  expirationDate: Date,
  cvv: number
}

const paymentService = {
  getPaymentByTicketId,
  paymentProcess,
};

export default paymentService;
