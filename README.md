# Bistra glavica

Web stranica za instrukcije iz matematike, fizike, informatike i biologije (Osijek i online).

React + TypeScript + Vite. Sadržaj (predmeti, cijene, kontakt) je u `src/data/content.ts`.

## Lokalno

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produkcijski build u dist/
```

## Docker

```bash
docker build -t patricia-edukacije .
docker run -p 8080:8080 patricia-edukacije   # http://localhost:8080
```

Kontejner koristi nginx i sluša na `$PORT` (zadano 8080).

## Railway

Spoji ovaj GitHub repozitorij u Railwayu. `railway.json` mu kaže da gradi iz `Dockerfile`, a Railway sam postavlja `PORT`. Javnu domenu uključiš u Settings → Networking → Generate Domain.

## Prije objave: kontakt forma

Forma zasad **ne šalje** poruke, nego ih samo ispisuje u konzolu preglednika. Za pravo slanje:

1. Na https://web3forms.com upiši e-mail i dobit ćeš access key.
2. Zamijeni tijelo funkcije `submitInquiry` u `src/lib/submitInquiry.ts` primjerom iz komentara.
3. Ključ postavi kao varijablu `VITE_WEB3FORMS_KEY` (u Railwayu kao build varijablu, a u Dockerfileu kao `ARG`/`ENV` prije `npm run build`).
