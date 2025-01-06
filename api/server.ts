import Fastify, { FastifyRequest, FastifyReply } from "fastify"
import cors from "@fastify/cors"
import dotenv from "dotenv"
import { routes } from "../routes/routes"

dotenv.config()

const app = Fastify({ logger: true })

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message })
})

export default async function handler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await app.ready()
  app.server.emit("request", request, reply)
}

const start = async () => {
  app.register(cors)
  app.register(routes)

  try {
    await app.listen({ port: 3333, host: "0.0.0.0" })
    console.log("Server started on http://localhost:3333")
  } catch (error) {
    console.log(error)
  }
}

start()
