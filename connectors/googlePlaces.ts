export const googlePlacesConnector = async (
  googlePlacesApiKey: string | undefined = '',
  fieldMask: string[],
  textQuery: string
) => {
  if (!googlePlacesApiKey) {
    return new Response(
      JSON.stringify({ error: 'API key not found' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': googlePlacesApiKey,
      'X-Goog-FieldMask': fieldMask.join(',')
    },
    body: JSON.stringify({
      textQuery
    })
  })

  const responseMock = async () => {
    const json = await Deno.readTextFile('./tests/fixtures/places/thingsToDo.json')
    return JSON.parse(json)
  }

  const env = Deno.env.get('DENO_ENV') || 'development'

  const data = env === 'development' ? await responseMock() : await response.json()

  return data
}
