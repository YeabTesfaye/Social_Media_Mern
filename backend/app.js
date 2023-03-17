import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import {CONNECTDB} from './config/db.js'
import {register } from "./controllers/auth.js";
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import postRotues from './routes/post.js';
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/post.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import {posts, users} from './data/index.js'
/*** CONFIGURATION ***/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
CONNECTDB()
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
/***** The End of CONFIGURATION ******/

/*************** FILE STORAGE ******/
// specify the storage location and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({storage});

/*** ROUTES WITH FILE ***/
app.post('/auth/register', upload.single("picture"), register);
app.post('/posts', verifyToken, upload.single("picture"), createPost)
/*** ROUTES ****/
app.use("/auth", authRoutes);
app.use('/', userRoutes);
app.use('/', postRotues)
/*****SERVER SETUP **********/
app.listen(PORT, () => {
  console.log(`the port is running at port ${PORT}`);
  /****** ADD DATA ONLY ONE TIME *****/
  // User.insertMany(users);
  // Post.insertMany(posts);
});
