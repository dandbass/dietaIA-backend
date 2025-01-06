import { FastifyRequest, FastifyReply } from "fastify"
import { CreateTripService } from "../services/CreateTripService"

export interface DataProps {
  country: String
  state: String
  days: String
}

class CreateTripController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { country, state, days } = request.body as DataProps
    const createNutrition = new CreateTripService()
    const trip = await createNutrition.execute({
      country,
      state,
      days,
    })
    reply.send(trip)
  }
}

export { CreateTripController }
