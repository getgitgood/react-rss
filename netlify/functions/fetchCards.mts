type FetchCardsNetlifyHandler = {
  search: string;
  page: string;
  page_size: string;
  ordering: string;
};

const fetchCards = async ({
  search,
  page,
  page_size,
  ordering
}: FetchCardsNetlifyHandler) => {
  const API_KEY = process.env.VITE_API_KEY;
  const URL = process.env.VITE_URL;
  try {
    const request = await fetch(
      `${URL}?key=${API_KEY}&search=${search}&page=${page}&page_size=${page_size}&ordering=${ordering}`
    );
    const cardsData = await request.json();

    return cardsData;
  } catch (e) {
    console.error(e);
  }
};

const handler = async (request: Request) => {
  const url = new URL(request.url);
  const { search, page, page_size, ordering } = Object.fromEntries(
    url.searchParams
  );
  try {
    const cardsData = await fetchCards({ search, page, page_size, ordering });

    return new Response(JSON.stringify(cardsData), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify(`Can't reach ${request.url}`), {
      status: 500
    });
  }
};

export default handler;
