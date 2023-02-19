import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import router from "./routers/routers.js";

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors())
app.use("/api", router)

async function main() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        app.listen(process.env.PORT, () => {
            console.log("Web application started on http://localhost:3000/");
        });
    } catch (e) {
        console.error(e);
    }
}

main()