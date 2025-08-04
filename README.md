# OMDb API Project

## Purpose

This was not meant to rival the [IMDb](https://imdb.com), it was just supposed to be a fun project to teach me how to use SvelteKit and API Backends.

## Using it

For this project, you can run it on your localhost or you can deploy on [Vercel](https://vercel.com)

---

For both methods, you need an API key from OMDb you can get one **FREE** [here](https://www.omdbapi.com/apikey.aspx)

### Deploying Locally 

1. Create a .env file in the project root
2. In the .env, write "OMDB_API_KEY=your_api_key_here"
3. Open a new terminal window ( ctrl + shift + ` )
4. Run 
```sh
npm install -g pnpm
pnpm i
pnpm run dev
```
5. Go to [http://localhost:5173](http://localhost:5173) or whatever localhost it provides

---

### Deploying to Vercel

1. Fork this repo
2. Go to [vercel.com](https://vercel.com) and sign up or sign in
3. Click "Add New" and then click "Project"
4. Click import on the repo that you forked
5. Make sure the framework preset is SvelteKit
6. For the root directory use "./"
7. For build and output settings use this:

* Build Command:
```sh
pnpm run build
```

* Output Directory:
```sh
.svelte-kit/output
```

* Install Command:
```sh
pnpm i
```

8. Under Environment Variables for the key put "OMDB_API_KEY" and for its value put your api key.
9. Click Deploy

---
