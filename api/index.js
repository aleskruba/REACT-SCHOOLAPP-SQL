import express from "express";
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import gradeRoutes from "./routes/grades.js"
import commentRoutes from "./routes/comments.js"
import repliesRoutes from "./routes/replies.js"
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express()

app.use(express.json()) // to send data to db
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  const upload = multer({storage })
  
  
  app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  });

app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/replies", repliesRoutes)
app.use("/api/grades", gradeRoutes)

app.listen(8800,()=>{
    console.log('Connected on port 8800')
})