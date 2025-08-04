import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const id = url.searchParams.get("id");
  const title = url.searchParams.get("t");
  const OMDB_API_KEY = process.env.OMDB_API_KEY;

  if (!id && !title) {
    return json({ error: "Missing id or title" }, { status: 400 });
  }

  const apiUrl = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return json(data);
  } catch (err) {
    return json({ error: "Fetch failed" }, { status: 500 });
  }
} 