import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, listBooking, changeBooking, checkRoomAvailability } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("", listBooking)
  .get("/:roomId", checkRoomAvailability)
  .post("", bookingRoom)
  .put("/:bookingId", changeBooking);

export { bookingRouter };
