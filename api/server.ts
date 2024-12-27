import Fastify from "fastify"
import cors from "@fastify/cors"
import dotenv from "dotenv"
import { routes } from "../routes/routes"

dotenv.config()

const app = Fastify({ logger: true })

// Define o handler para erros globais
app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message })
})

// Função serverless para o Vercel
export default async function handler(req: any, res: any) {
  await app.ready() // Aguarda o servidor estar pronto
  app.server.emit("request", req, res) // Passa a requisição e resposta do Vercel para o Fastify
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
