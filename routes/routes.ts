import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify"
import { CreateNutritionController } from "../controllers/CreateNutritionController"

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/test", (request: FastifyRequest, reply: FastifyReply) => {
    let responseText =
      '```json\n{\n  "nome": "Danilo Maia",\n  "sexo": "Masculino",\n  "idade": 38,\n  "altura": 1.70,\n  "peso": 77,\n  "objetivo": "Hipertrofia",\n  "refeicoes": [\n    {\n      "horario": "7:00",\n      "nome": "Cafe da manha",\n      "alimentos": [\n        "300g de aveia",\n        "200ml de leite desnatado",\n        "1 banana",\n        "1 colher de sopa de pasta de amendoim"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da manha",\n      "alimentos": [\n        "150g de iogurte grego",\n        "50g de granola"\n      ]\n    },\n    {\n      "horario": "13:00",\n      "nome": "Almoco",\n      "alimentos": [\n        "200g de frango grelhado",\n        "150g de arroz integral",\n        "150g de batata doce",\n        "Salada verde a vontade"\n      ]\n    },\n    {\n      "horario": "16:00",\n      "nome": "Lanche da tarde",\n      "alimentos": [\n        "1 scoop de whey protein",\n        "1 fruta (maçã ou pera)"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Janta",\n      "alimentos": [\n        "150g de peixe grelhado",\n        "100g de brócolis",\n        "100g de quinoa"\n      ]\n    },\n    {\n      "horario": "21:00",\n      "nome": "Lanche antes de dormir",\n      "alimentos": [\n        "Caseina 1 scoop"\n      ]\n    }\n  ],\n  "suplementos": [\n    "Whey protein",\n    "Creatina",\n    "BCAA",\n    "Caseina"\n  ]\n}\n```'

    try {
      let jsonString = responseText
        .replace(/```\w*\n/g, "")
        .replace(/\n```/g, "")
        .trim()

      let jsonObject = JSON.parse(jsonString)

      return reply.send({ data: jsonObject })
    } catch (error) {
      console.log(error)
    }

    reply.send({ ok: true })
  })

  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutritionController().handle(request, reply)
    }
  )
}
