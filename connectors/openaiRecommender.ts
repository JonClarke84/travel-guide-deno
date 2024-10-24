import OpenAI from 'npm:openai'
const client = new OpenAI()

export const openaiConnector = async (
  message: OpenAI.Chat.ChatCompletionUserMessageParam
) => {
  const stream = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a travel expert, you only respond in single sentences unless prompted otherwise.' },
      message
    ],
    stream: true
  })
  let response = ''
  for await (const chunk of stream) {
    response += chunk.choices[0].delta.content || ''
  }
  return response
}
