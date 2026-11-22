# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + Vite (static SPA), served by nginx in Docker, deployed on Railway. Chosen design direction: "Elementi" (periodic-table subject tiles, layered flat paper). Contact form backend not connected yet (planned: Web3Forms) — `src/lib/submitInquiry.ts` is a stub.

## Users

- Parents of primary-school (5.–8. razred) and secondary-school students in Osijek, looking for a reliable, qualified tutor and wanting to book quickly.
- Secondary-school students and maturanti (državna matura) choosing a tutor themselves, in Osijek in person or anywhere in Croatia online.

## Product Purpose

Website for Patricia Adžić's private tutoring business (instrukcije). It presents who she is, what she teaches, transparent prices, and lets visitors send an inquiry through a contact form. Success = inquiries from parents/students that turn into booked lessons.

## Positioning

Tutor with a master's degree in computer engineering (mag. ing. comp., FERIT Osijek, smjer Umjetna inteligencija i robotika) whose master's thesis was done during an Erasmus exchange at Ghent University (UGent), Belgium. Thesis combines mathematics, programming and biology (AI on dermatological images), which matches the four subjects she teaches. Personal stance from her press interview: "društvo treba više cijeniti znanje".

## Operating Context

- Subjects: matematika, fizika, informatika, biologija.
- Levels: osnovna škola, srednja škola, priprema za državnu maturu (matematika B and A razina).
- Format: uživo u Osijeku (at her place, or she comes over for a surcharge) and online (Google Meet / Zoom).
- 60-minute lessons; first lesson doubles as a knowledge assessment.

## Capabilities and Constraints

- Price list (proposed, accepted by user; same for all subjects, in person or online):
  - Osnovna škola: 15 € / sat, paket 10 sati 135 €
  - Srednja škola: 20 € / sat, paket 10 sati 180 €
  - Priprema za maturu: 25 € / sat, paket 10 sati 225 €
- Contact form fields: ime i prezime, e-mail, telefon (optional), roditelj/učenik, predmet (multi), razina i razred, uživo/online, poruka.
- Contact: patricia.adzic@gmail.com, +385 95 856 6268, Instagram @patriciaadzic.
- Business name: "Bistra glavica", obrt za instrukcije i poduku (chosen 2026-11-22; earlier working names "Patricia Edukacije", "Pametna mozgalica", "Pametna glavica" and "Iskrica znanja" are dropped).
- Logo: pencil with a burst at its tip (design "Bistra II · 3, Olovka i rasprsak" on the logo canvas), in `src/components/Logo.tsx` and `public/favicon.svg`. Avoid heads, four colored squares (reads as Windows), drops and a BG monogram.

## Brand Commitments

- Language: Croatian.
- Name: Patricia Adžić (always with ž and ć).

## Evidence on Hand

- Portrait photo: graduation (FERIT gown, holding FERIT diploma folder) — `src/assets/patricia-portret.*`, `patricia-lice.webp`.
- Press: Točka na i, TeenBiz serija, "Patricia Adžić: Društvo treba više cijeniti znanje", 23. 12. 2025. https://tockanai.hr/poduzetnik/teenbiz-patricia-adzic-drustvo-treba-vise-cijeniti-znanje-93534/
- Thesis: "Primjena varijacijskih autoenkodera za pretraživanje dermatoloških slika prema sadržaju", FERIT Osijek, 2026, mentorica Irena Galić, sumentor Marin Benčević. https://repozitorij.etfos.hr/object/etfos:6279 — written during Erasmus at Ghent University (per the user).
- NOT available, must not be fabricated: testimonials, student counts, pass rates, matura results, years of tutoring experience.

## Product Principles

1. Trust first: a parent should see qualifications, a real face and clear prices within seconds.
2. Transparent pricing, no "pitajte za cijenu".
3. Explain step by step — the site's tone mirrors the teaching: clear, warm, never condescending.
4. One clear action: send an inquiry / book the first lesson.
