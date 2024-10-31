  export const handleHtml = (page: Uint8Array) => {
    return new Response(
      page,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html'
        }
      }
    )
  }
