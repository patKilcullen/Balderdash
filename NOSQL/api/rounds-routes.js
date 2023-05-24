import express from "express"

const router = express.Router()

router.route("/").get((req,res) => res.send("hellocccc"))

export default router