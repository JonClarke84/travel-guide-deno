import { handleTripIntro } from './handlers/handleTripIntro.ts'
import { handleFood } from './handlers/handleFood.ts'
import { handleWeather } from './handlers/handleWeather.ts'
import { handleThingsToDo } from './handlers/handleThingsToDo.ts'
import { handleHomepage } from './handlers/handleHomepage.ts'

Deno.serve((req) => {
  const googlePlacesApiKey = Deno.env.get('GOOGLE_PLACES_KEY')
  const { pathname, searchParams } = new URL(req.url)

  switch (pathname) {
    case '/':
      return handleHomepage()
    case '/trip-intro':
      return handleTripIntro(searchParams)
    case '/food':
      return handleFood(searchParams, googlePlacesApiKey)
    case '/things-to-do':
      return handleThingsToDo(searchParams, googlePlacesApiKey)
    case '/weather':
      return handleWeather()
    default:
      return new Response('Not found', { status: 404 })
  }
})
