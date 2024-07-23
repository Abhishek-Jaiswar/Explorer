import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'
import postRoute from "./routes/auth.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from './routes/test.route.js'

const app = express()

// middlewares 
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


// Routes

app.use("/api/v1/post", postRoute)
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/test", testRoute)

app.options('*', cors());

export default app