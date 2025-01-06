import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify"
import { CreateNutritionController } from "../controllers/CreateNutritionController"
import { CreateTrainingController } from "../controllers/CreateTrainingController"
import { CreateTripController } from "../controllers/CreateTripController"
import { CreateQuestionController } from "../controllers/CreateQuestionController"
import { CreateAdedonhaController } from "../controllers/CreateAdedonhaController"

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "Welcome to api, IA Assistent." })
  })

  fastify.post(
    "/nutrition",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutritionController().handle(request, reply)
    }
  )

  fastify.post(
    "/training",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateTrainingController().handle(request, reply)
    }
  )

  fastify.post(
    "/trip",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateTripController().handle(request, reply)
    }
  )

  fastify.post(
    "/question",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateQuestionController().handle(request, reply)
    }
  )

  fastify.post(
    "/adedonha",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateAdedonhaController().handle(request, reply)
    }
  )
}
