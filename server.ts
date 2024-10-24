import { handleTripIntro } from './handlers/handleTripIntro.ts'
import { handleFood } from './handlers/handleFood.ts'
import { handleWeather } from './handlers/handleWeather.ts'

Deno.serve((req) => {
  const { pathname, searchParams } = new URL(req.url)

  switch (pathname) {
    case '/trip-intro':
      return handleTripIntro(searchParams)
    case '/food':
      return handleFood()
    case '/weather':
      return handleWeather()
    default:
      return new Response('Not found', { status: 404 })
  }
})
