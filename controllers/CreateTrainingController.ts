import { FastifyRequest, FastifyReply } from "fastify"
import { CreateTrainingService } from "../services/CreateTrainingService"

export interface DataProps {
  name: String
  weight: String
  height: String
  age: String
  gender: String
  objective: String
  level: String
}

class CreateTrainingController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, weight, height, age, gender, objective, level } =
      request.body as DataProps
    const createTraining = new CreateTrainingService()
    const training = await createTraining.execute({
      name,
      age,
      gender,
      height,
      weight,
      level,
      objective,
    })
    reply.send(training)
  }
}

export { CreateTrainingController }
