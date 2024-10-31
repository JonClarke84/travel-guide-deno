  export const handleHomepage = async () => {
    const index = await Deno.readFile('../html/index.html')
    return new Response(
      index,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html'
        }
      }
    )
  }
