import connectToMongo from "./Database/db.js";
import express from "express";
import cors from "cors";
import payment from "./routes/payment.js";

connectToMongo();

const app = express();
const port = 4000;

// CORS configuration — allow only your frontend origins
const allowedOrigins = [
  "https://file-project-frontend.onrender.com", // your deployed frontend URL
  "http://localhost:3000",                      // your local frontend during development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("abhiraj");
});

app.use("/api/payment", payment);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
