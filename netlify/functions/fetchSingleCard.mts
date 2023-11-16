const fetchSingleCard = async (id: string) => {
  const API_KEY = process.env.VITE_API_KEY;
  const URL = process.env.VITE_RESOURCE_URL;
  try {
    const request = await fetch(`${URL}/${id}?key=${API_KEY}`);
    const cardData = await request.json();
    return cardData;
  } catch (e) {
    console.error(e);
  }
};

const handler = async (request: Request) => {
  const url = new URL(request.url);
  const { id } = Object.fromEntries(url.searchParams);
  try {
    const cardData = await fetchSingleCard(id);
    return new Response(JSON.stringify(cardData), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify(`Can't reach ${request.url} and retrive single card data`),
      {
        status: 500
      }
    );
  }
};

export default handler;
