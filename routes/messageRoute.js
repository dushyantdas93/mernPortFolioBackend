import express from "express";
import Message from "../models/messageModel.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/message", async (req, res) => {
  try {
    const { fullname, email, subject, message } = req.body;

    // Manual validation
    if (!fullname || typeof fullname !== "string" || fullname.trim().length === 0) {
      return res.status(400).send({ success: false, message: "Fullname is required and must be a valid string" });
    }

    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).send({ success: false, message: "Valid email is required" });
    }

    if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
      return res.status(400).send({ success: false, message: "Subject is required" });
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).send({ success: false, message: "Message is required" });
    }

    // Create new message
    const createMessage = await Message.create({
      fullname,
      email,
      subject,
      message,
    });

    res.status(201).send({
      success: true,
      message: "Message sent successfully",
      data: createMessage,
    });

  } catch (error) {
    // Handle unexpected errors
    console.error("Error creating message:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error. Could not send the message.",
      error: error.message || error,
    });
  }
});

router.get("/message/getAll",requireSignIn,isAdmin, async (req, res) => {
  try {
    // Fetch all messages from the database
    const messages = await Message.find();

    if (messages.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No messages found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error. Could not fetch messages.",
      error: error.message || error,
    });
  }
});




export default router;
