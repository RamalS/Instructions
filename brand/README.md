# Bistra glavica: logo

Znak je olovka iz čijeg vrha izbija rasprsak: ideja koja „sine” dok se piše. Uz znak ide naziv BISTRA GLAVICA, a ispod njega opcionalno „obrt za instrukcije i poduku”.

U SVG datotekama tekst je pretvoren u krivulje, pa logo izgleda isto na svakom računalu, i kad font nije instaliran.

## Datoteke

| Datoteka | Za što |
|---|---|
| `svg/logo-slozeni-*.svg` | Glavni logo: znak, naziv u dva reda i podnaslov. Letci, plakati, potpis u e-mailu. |
| `svg/logo-vodoravni-*.svg` | Znak i naziv u jednom redu. Zaglavlja, uske trake, potpisi. |
| `svg/znak-*.svg` | Samo olovka. Ikone, naljepnice, vodeni žig. |
| `svg/profilna-slika.svg` | Kvadrat 1080 × 1080 s dovoljno ruba da stane i u krug (Instagram, WhatsApp, Google profil). |
| `png/` | Iste stvari kao PNG s prozirnom pozadinom, za programe koji ne čitaju SVG (Word, Canva, društvene mreže). |

Varijante:

- `boja` je za svijetlu podlogu i najčešće se koristi.
- `tamna-podloga` je za tamnu podlogu.
- `crna` je jednobojna, za tisak u jednoj boji, pečat i faks.
- `bijela` je jednobojna, preko fotografije ili obojene podloge.

## Boje

| Boja | HEX |
|---|---|
| Tinta (tekst, obrub) | `#17140F` |
| Papir (pozadina) | `#FBF7EF` |
| Sunce (olovka) | `#F2C230` |
| Narančasta (rasprsak, gumica) | `#E8461E` |

## Pismo

- Naziv: **Bricolage Grotesque**, ExtraBold (800), velika slova.
- Podnaslov i tekst: **Figtree**.

Oba pisma su besplatna na Google Fonts.

## Pravila

- Oko loga ostavi prazan prostor barem pola visine olovke.
- Ne mijenjaj boje, ne rasteži i ne okreći logo, ne dodaji sjene.
- Ispod 24 px koristi samo znak, bez naziva.

## Ponovno generiranje

Ako se nešto promijeni u znaku ili nazivu, uredi `make_brand.py` pa pokreni iz korijena projekta:

```sh
uv run --no-project --with fonttools --with brotli --with uharfbuzz python brand/make_brand.py "$PWD" brand/svg
for f in brand/svg/*.svg; do n=$(basename "$f" .svg); case $n in
  znak-*) rsvg-convert -w 1024 "$f" -o brand/png/$n-1024.png; rsvg-convert -w 512 "$f" -o brand/png/$n-512.png;;
  logo-*) rsvg-convert -w 2000 "$f" -o brand/png/$n.png;;
  profilna*) rsvg-convert -w 1080 "$f" -o brand/png/$n.png;;
esac; done
```

Isti znak je na stranici u `src/components/Logo.tsx` i `public/favicon.svg`.
