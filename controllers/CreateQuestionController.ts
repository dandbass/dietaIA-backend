import { FastifyRequest, FastifyReply } from "fastify"
import { CreateQuestionService } from "../services/CreateQuestionService"

export interface DataProps {
  license: String
  language: String
  state: String
  question: String
}

class CreateQuestionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { license, language, state, question } = request.body as DataProps
    const createTraining = new CreateQuestionService()
    const questions = await createTraining.execute({
      license,
      language,
      state,
      question,
    })
    reply.send(questions)
  }
}

export { CreateQuestionController }
