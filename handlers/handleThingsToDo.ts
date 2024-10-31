import { googlePlacesConnector } from '../connectors/googlePlaces.ts'

export const handleThingsToDo = async (
  apiKey: string | undefined,
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

  type Place = {
    displayName: {
      text: string
    }
    rating: number
    editorialSummary: {
      text: string
    }
    websiteUri: string
  }

  const html =
    `<ul>
      ${data.places
        .map((place: Place) => {
          const name = place.displayName.text || 'No Name Available'
          const rating = place.rating ? `Rating: ${place.rating}` : 'No Rating Available'
          const summary = place.editorialSummary?.text || 'No Summary Available'
          const website = place.websiteUri
            ? `<a href="${place.websiteUri}" target="_blank">Website</a>`
            : 'No Website Available'

          return `
            <li>
              <h4 class="place-name">${name}</h4>
              <div class="rating">${rating}</div>
              <div class="summary">${summary}</div>
              <div class="website">${website}</div>
            </li>
          `
        })
        .join('')}
      </ul>
    `

  return new Response(
    html,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html'
      }
    }
  )
}
