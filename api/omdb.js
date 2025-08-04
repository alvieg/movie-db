import fetch from "node-fetch";

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    res.status(400).json({ error: "Missing query parameter 'q'" });
    return;
  }

  const OMDB_API_KEY = process.env.OMDB_API_KEY;

  if (!OMDB_API_KEY) {
    res.status(500).json({ error: "Missing OMDB_API_KEY environment variable" });
    return;
  }

  try {
    const omdbRes = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(q)}`);
    const data = await omdbRes.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from OMDb" });
  }
}
