/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Example endpoint to say hello
 *     responses:
 *       200:
 *         description: Returns a hello message
 */
import express from "express";
const router = express.Router();

router.get("/hello", (req, res) => {
  res.send("Hello, world!");
});

export default router;
