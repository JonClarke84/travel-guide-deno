import { googlePlacesConnector } from '../connectors/googlePlaces.ts'

export const handleThingsToDo = async (
  searchParams: URLSearchParams,
  apiKey: string | undefined
) => {
  const region = searchParams.get('region')
  const country = searchParams.get('country')

  const fieldMask = [
    'places.displayName',
    'places.editorialSummary',
    // 'places.formattedAddress',
    // 'places.priceLevel',
    // 'places.photos',
    // 'places.primaryType',
    // 'places.primaryTypeDisplayName',
    'places.rating',
    'places.websiteUri'
  ]

  const textQuery = `The best rated things to do in ${region}, ${country}`

  const data = await googlePlacesConnector(apiKey, fieldMask, textQuery)

  return new Response(
    JSON.stringify(data),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
