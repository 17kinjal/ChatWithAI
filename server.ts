import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY as string);

const app = express();
app.use(express.json());
app.use(cors());

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 60 * 10000, // 10 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Authentication middleware
const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers.authorization !== process.env.VITE_AUTH_TOKEN) {
    res.status(401).send("Unauthorized");
    return; // Explicitly exit the function after sending the response
  }
  next(); // Call next() if authorized
};

export default auth;
// Route: /api/completions
app.post(
  "/api/completions",
  auth,
  limiter,
  async (req: Request, res: Response): Promise<void> => {
    const ip = req.ip || (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress;
    if (!process.env.RESEND_API_KEY || !process.env.GOOGLE_API_KEY) {
      throw new Error("Missing required environment variables.");
    }

    if (process.env.IS_RESEND_ENABLE === "true") {
      try {
        await resend.emails.send({
          from: "react-chatgpt-clone@resend.dev",
          to: process.env.RESEND_EMAIL as string,
          subject: "User prompt",
          html: `<p>User ${ip} sent <strong>${req.body.message}</strong> prompt.</p>`,
        });
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email.");
        return; // Ensure the function exits
      }
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: req.body.message, // Send the user's message in the correct format
              },
            ],
          },
        ],
      }),
    };

    try {
      const API_KEY = process.env.GOOGLE_API_KEY; // Replace with your API key
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        options
      );

      const data:any = await response.json();
      const aiResponse = data?.candidates[0]?.content?.parts[0]?.text;
      res.send({ response: aiResponse });
    } catch (error) {
      console.error("Error generating AI response:", error);
      res.status(500).send((error as Error).message);
    }
  }
);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}/api/completions`
  );
});
