import OpenAI from 'npm:openai'
const client = new OpenAI()

export const openaiConnector = async (
  message: OpenAI.Chat.ChatCompletionUserMessageParam
) => {
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a travel expert, you only respond in single sentences unless prompted otherwise.' },
      message
    ]
  })
  return response
}
