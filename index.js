import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
mongoose.connect(process.env.DB_URL)
import express from "express"

//Third Party Module/Package/dependency
import bodyParser from "body-parser"

//user define module/package
import { signup,login } from "./controller/user.controller.js"

const app = new express()
app.listen(8080)

//middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("view"))
app.post("/api/signup",signup)
app.post("/api/login",login)
   


