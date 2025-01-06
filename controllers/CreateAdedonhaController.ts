import { FastifyRequest, FastifyReply } from "fastify"
import { CreateAdedonhaService } from "../services/CreateAdedonhaService"

export interface DataProps {
  language: String
  letter: String
}

class CreateAdedonhaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { language, letter } = request.body as DataProps
    const createAdedonha = new CreateAdedonhaService()
    const adedonha = await createAdedonha.execute({
      language,
      letter,
    })
    reply.send(adedonha)
  }
}

export { CreateAdedonhaController }
