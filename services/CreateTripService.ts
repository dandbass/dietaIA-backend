import { DataProps } from "../controllers/CreateTripController"
import { GoogleGenerativeAI } from "@google/generative-ai"

class CreateTripService {
  async execute({ country, state, days }: DataProps) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
      const response = await model.generateContent(
        `Crie um itinerario de viagem completo no país: ${country} no estado: ${state} com ${days} dias de viagem e para cada dia sugira um lugar e dê sugestoes do que fazer nesse lugar e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade country com o nome do país, propriedade state com o estado, propriedade days com o numero de dias, um array itinerary com a propriedades, day com o numero do dia, location com o nome do lugar e um array activities com as sugestoes do respectivo lugar e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`
      )

      //console.log(JSON.stringify(response, null, 2))

      if (response.response && response.response.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0]
          .text as string

        let jsonString = jsonText
          .replace(/```json\n/g, "")
          .replace(/\n```/g, "")
          .trim()

        jsonString = jsonString.replace(/,\s*}/g, "}").replace(/,\s*\]/g, "]")

        //console.log("JSON Gerado Após Limpeza: ", jsonString)

        try {
          let jsonObject = JSON.parse(jsonString)
          //console.log("JSON Parseado:", jsonObject)

          return { data: jsonObject }
        } catch (error) {
          console.error("Erro ao tentar parsear o JSON:", error)
          throw new Error("Falha ao criar devido a erro no JSON gerado.")
        }
      }
    } catch (error) {
      console.error("Erro JSON: ", error)
      throw new Error("Failed create.")
    }
  }
}

export { CreateTripService }
