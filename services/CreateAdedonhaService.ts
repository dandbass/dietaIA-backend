import { DataProps } from "../controllers/CreateAdedonhaController"
import { GoogleGenerativeAI } from "@google/generative-ai"

class CreateAdedonhaService {
  async execute({ language, letter }: DataProps) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
      const response = await model.generateContent(
        `Crie um json com array de nome: respostas para um jogo chamado adedonha que todas as respostas começe com a letra: ${letter} de acordo com as categorias passadas a seguir: Nome, Verbo, Objeto, Animal, Trabalho, País, Estado, Cidade, Móveis, Parte do Corpo, Bebida, Comida, Marca. e para cada categoria, traga 3 opcoes de acordo com o idioma passado a seguir: ${language}, observacao a categoria estado pode ser de qualquer pais, e ao trazer as opcoes de estado tras o pais do estado entre parenteses apos o nome do estado e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade categoria com o nome da categoria (traduza o nome das categorias de acordo com a linguagem escolhida), a language com o nome da linguagem, a letter com a letra escolhida em maiuscula, a language e a letter venha fora do array de respostas e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`
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

export { CreateAdedonhaService }
