import { DataProps } from "../controllers/CreateQuestionController"
import { GoogleGenerativeAI } from "@google/generative-ai"

class CreateQuestionService {
  async execute({ license, language, state, question }: DataProps) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
      const response = await model.generateContent(
        `Responda a pergunta de multipla escolha sobre teste para tirar a licensa a seguir de acordo com os parametros a ser passados: licensa de seguro de ${license} do estado americano ${state} na linguagem ${language} responda a seguinte questao: ${question} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade resposta dizendo a letra maiuscula a, b, c, d ou as segintes letras se mais opcoes ouver e adicionando na frente da letra o conteudo da letra correspondente. e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`
      )

      // console.log(JSON.stringify(response, null, 2))

      if (response.response && response.response.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0]
          .text as string

        let jsonString = jsonText
          .replace(/```json\n/g, "")
          .replace(/\n```/g, "")
          .trim()

        jsonString = jsonString.replace(/,\s*}/g, "}").replace(/,\s*\]/g, "]")

        // console.log("JSON Gerado Após Limpeza: ", jsonString)

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
      console.error("Erro no serviço:", error)
      throw new Error("Falha na execução do serviço.")
    }
  }
}

export { CreateQuestionService }
