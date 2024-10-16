import OpenAI from 'npm:openai'
const client = new OpenAI()

Deno.serve((_req) => {
  const body = new ReadableStream({
    start(controller) {
      (async () => {
        controller.enqueue(new TextEncoder().encode('data: Hello everyone I am alive\r\n'))

        const userMessages: OpenAI.Chat.ChatCompletionUserMessageParam[] = [
          { role: 'user', content: 'I am planning a trip to Paris. What should I do there? For this response you may give a large amount of information, beyond a single sentence.' },
          { role: 'user', content: 'I am planning a trip to Paris. Where should I go to eat?' },
          { role: 'user', content: 'I am planning a trip to Paris in April, what is the weather like?' }
        ]

        const getResponse = async (
          message: OpenAI.Chat.ChatCompletionUserMessageParam
        ) => {
          const response = await client.chat.completions.create({
            model: 'gpt-4o',
            messages: [
              { role: 'system', content: 'You are a travel expert, you only respond in single sentences unless prompted otherwise.' },
              message
            ]
          })
          return response.choices[0].message.content
        }

        const queueResponse = async (message: OpenAI.Chat.ChatCompletionUserMessageParam) => {
          const response = await getResponse(message)
          controller.enqueue(new TextEncoder().encode(`data: ${response}\r\n`))
        }

        const fetchPromises = userMessages.map((message) => queueResponse(message))

        await Promise.all(fetchPromises)

        controller.close()
        })
      ()
    }
  })
  return new Response(body, {
    headers: {
      'content-type': 'text/event-stream'
    }
  })
})
