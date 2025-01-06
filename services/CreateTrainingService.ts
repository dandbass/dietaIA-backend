import { DataProps } from "../controllers/CreateTrainingController"
import { GoogleGenerativeAI } from "@google/generative-ai"

class CreateTrainingService {
  async execute({
    name,
    age,
    gender,
    height,
    weight,
    level,
    objective,
  }: DataProps) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
      const response = await model.generateContent(
        `Crie um treino completo para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, atualmente nível de atividade: ${level} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com objetivo atual, propriedade treinos com uma array contendo dentro cada objeto sendo um exercicio da dieta e dentro de cada exercicio a propriedade nome com nome do treino - dia da semana e a propriedade exercicios com array contendo o nome, series em numeros e repeticoes com o numero maximo e exato de repeticoes desse exercicio, nao incluir sabado e domingo e pode incluir uma propreidade com suplementos contendo array com sugestão de suplementos que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`
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

        //console.log("JSON Gerado Após Limpeza: ", jsonString)

        try {
          let jsonObject = JSON.parse(jsonString)
          //console.log("JSON Parseado:", jsonObject)

          return { data: jsonObject }
        } catch (error) {
          console.error("Erro ao tentar parsear o JSON:", error)
          throw new Error("Falha ao criar treino devido a erro no JSON gerado.")
        }
      }
    } catch (error) {
      console.error("Erro no serviço:", error)
      throw new Error("Falha na execução do serviço.")
    }
  }
}

export { CreateTrainingService }
