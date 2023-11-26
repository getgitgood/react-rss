export async function redirects() {
  return [
    {
      source: '/games',
      destination: '/',
      permanent: true
    }
  ];
}
