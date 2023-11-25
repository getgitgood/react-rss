export const experimental = {
  scrollRestoration: true
};

export async function redirects() {
  return [
    {
      source: '/games',
      destination: '/',
      permanent: true
    }
  ];
}
