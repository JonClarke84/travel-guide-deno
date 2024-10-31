import { openaiConnector } from '../connectors/openaiRecommender.ts'
import { createSSEResponse } from '../connectors/createSSEResponse.ts'

export const handleTripIntro = async (
  searchparams: URLSearchParams
) => {
  const country = searchparams.get('country')
  const region = searchparams.get('region')

  console.log('trip intro')
  const response = await openaiConnector(
    {
      role: 'user',
      content: `I am planning a trip to ${region}, ${country}. Please write a 140 word, two sentence introduction for the travel guide. Please write in the style of an esteemed travel guide publication, you are to get the end user excited for their trip. However, if the place they have chosen is for any reason dangerous or travel is advised against it, please reflect that in your response. For this response you may give a larger amount of information, beyond a single sentence.`
    }
  )

  return createSSEResponse(response)
}
