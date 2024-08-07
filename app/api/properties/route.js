export const GET = () => {
  return new Response(
    JSON.stringify({ message: 'GET request at api/properties' }),
    { status: 200 }
  );
};
