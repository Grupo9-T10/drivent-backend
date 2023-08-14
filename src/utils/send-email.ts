import nodemailer from "nodemailer"
import "dotenv/config"
import { Enrollment, Ticket, TicketType } from "@prisma/client";

const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:587,
  secure:false,
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  },
})

export function sendEmail(to:string,msg:string){
  const mailOptions ={
    from:process.env.EMAIL_USER,
    to,
    subject:"Confirmação de pagamento - DrivenT",
    html:msg,
  }

  transporter.sendMail(mailOptions,(error,info)=>{
    if(error) console.log(error)
    // else console.log("Email enviado - " + info.response)
  })
}

export function confirmationMessage(ticket:Ticket&{TicketType:TicketType},enrollment:Enrollment){
  return `
  <div>
  <h2 style="font-weight: normal;">Olá <span style="font-style: italic;">${enrollment.name}</span>, o pagamento do seu ticket de número <span style="font-style: italic;">${ticket.id}</span> foi confirmado:</h2>
  <div style="margin:10px 0;">
  <h2>${ticket.TicketType.includesHotel?"Presencial com Hotel":!ticket.TicketType.isRemote?"Presencial sem hotel":"Online"} - ${(ticket.TicketType.price).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</h2>
  </div>
  <h2 style="font-style: normal; font-weight: normal;">Lembre-se de escolher suas atividades durante o evento.</h2>
  </div>

  `
}