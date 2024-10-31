import { handleTripIntro } from './handlers/handleTripIntro.ts'
import { handleFood } from './handlers/handleFood.ts'
import { handleWeather } from './handlers/handleWeather.ts'
import { handleThingsToDo } from './handlers/handleThingsToDo.ts'
import { handleHtml } from './handlers/handleHtml.ts'

Deno.serve(async (req) => {
  const googlePlacesApiKey = Deno.env.get('GOOGLE_PLACES_KEY')
  const { pathname, searchParams } = new URL(req.url)

  switch (pathname) {
    case '/': {
      const page = await Deno.readFile('./html/index.html')
      return handleHtml(page)
    }
    case '/guide': {
      const page = await Deno.readFile('./html/guide.html')
      return handleHtml(page)
    }
    case '/trip-intro':
      return handleTripIntro(searchParams)
    case '/food':
      return handleFood(searchParams, googlePlacesApiKey)
    case '/things-to-do':
      return handleThingsToDo(googlePlacesApiKey, req.headers)
    case '/weather':
      return handleWeather()
    default:
      return new Response('Not found', { status: 404 })
  }
})
