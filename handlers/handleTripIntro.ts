import { openaiConnector } from '../connectors/openaiRecommender.ts'

export const handleTripIntro = async (
  headers: Headers
) => {
  const currentUrl = headers.get('hx-current-url')

  if (!currentUrl) {
    return new Response(
      'No current URL found',
      {
        status: 400,
        headers: {
          'Content-Type': 'text/plain'
        }
      }
    )
  }

  const searchParams = new URL(currentUrl).searchParams
  const region = searchParams.get('region')
  const country = searchParams.get('country')

  const response = await openaiConnector(
    {
      role: 'user',
      content: `I am planning a trip to ${region}, ${country}. Please write a 140 word, two sentence introduction for the travel guide. Please write in the style of an esteemed travel guide publication, you are to get the end user excited for their trip. However, if the place they have chosen is for any reason dangerous or travel is advised against it, please reflect that in your response. For this response you may give a larger amount of information, beyond a single sentence.`
    }
  )

  return new Response(
    response.choices[0].message.content,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  )
}
