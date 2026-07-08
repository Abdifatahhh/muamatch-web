import type { Dictionary } from "./types";

const dictionary: Dictionary = {
  meta: {
    title: "Boek professionele makeup-artiesten",
    description:
      "Vind, vergelijk en boek professionele makeup-artiesten op één plek. MUA Match laat klanten met vertrouwen boeken en helpt artiesten hun business te laten groeien.",
  },
  navAria: "Hoofdmenu",
  nav: {
    howItWorks: "Zo werkt het",
    forClients: "Voor klanten",
    forMuas: "Voor MUA's",
    contact: "Contact",
    login: "Inloggen",
  },
  header: {
    ariaHome: "MUA Match home",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
  },
  localeSwitcher: {
    label: "Taal",
    en: "English",
    nl: "Nederlands",
  },
  hero: {
    title: "Vind de perfecte makeup-artiest voor elke gelegenheid.",
    lead: "Vergelijk portfolio's, tarieven en beschikbaarheid en boek je match in één app.",
    appStoreAlt: "Download in de App Store",
    playAlt: "Ontdek het op Google Play",
    imageAlt: "Een makeup-artiest aan het werk met een klant",
    badge: "Gratis voor klanten & makeup-artiesten",
    freeNote: "Gratis op iOS en Android, geen abonnement.",
    ratingNote: "Beoordeeld met 4,9/5 door klanten",
    chipVerified: "Geverifieerde artiesten",
    chipBooking: "Boeking bevestigd",
  },
  socialProof: {
    title: "Vertrouwd door beautyprofessionals in heel Europa",
    stats: [
      { value: "500+", label: "Makeup-artiesten" },
      { value: "20+", label: "Landen" },
      { value: "10.000+", label: "Matches" },
      { value: "4,9", label: "Gemiddelde score" },
    ],
  },
  howItWorks: {
    title: "Zo werkt het",
    subtitle: "Van ontdekken tot boeken in drie eenvoudige stappen.",
    steps: [
      { title: "Ontdek", description: "Blader door geverifieerde artiesten bij jou in de buurt." },
      { title: "Vergelijk", description: "Bekijk portfolio's, tarieven en beschikbaarheid." },
      { title: "Boek", description: "Chat, stem de details af en boek direct." },
    ],
  },
  forClients: {
    eyebrow: "Voor klanten",
    title: "Boek met vertrouwen een makeup-artiest",
    lead: "Vind, vergelijk en boek de juiste artiest voor jouw gelegenheid, alles op één plek.",
    items: [
      "Bekijk geverifieerde artiesten",
      "Vergelijk portfolio's & tarieven",
      "Check echte beschikbaarheid",
      "Lees eerlijke reviews",
      "Boek & chat in de app",
      "Gratis te downloaden",
    ],
    cta: "Vind jouw MUA",
    note: "Gratis te downloaden, geen boekingskosten.",
    mediaAlt: "Makeup-looks van artiesten op MUA Match",
  },
  forMuas: {
    eyebrow: "Voor MUA's",
    title: "Laat je makeup-business groeien",
    lead: "Word ontdekt door nieuwe klanten en beheer boekingen, chats en je portfolio vanuit één dashboard.",
    items: [
      "Word ontdekt door nieuwe klanten",
      "Toon je portfolio",
      "Ontvang boekingsaanvragen",
      "Beheer je agenda",
      "Chat met klanten",
      "Volg je groei",
    ],
    ctaJoin: "Aanmelden als makeup-artiest",
    note: "Gratis aanmelden. Geen maandkosten.",
    dashboard: {
      title: "Jouw dashboard",
      bookingsLabel: "Boekingen",
      ratingLabel: "Score",
      viewsLabel: "Profielweergaven",
      earningsLabel: "Deze maand",
      requestTitle: "Nieuwe boekingsaanvraag",
      requestBody: "Bruidsproef · za 14:00",
    },
  },
  featured: {
    title: "Uitgelichte makeup-artiesten",
    subtitle: "Een voorproefje van het talent dat je in heel Europa vindt op MUA Match.",
    viewLabel: "Bekijk profiel",
    ratingLabel: "Score",
    artists: [
      { name: "Lena Vos", location: "Amsterdam, NL", specialty: "Naturel & bruids", rating: "4,9" },
      { name: "Kelly Moreau", location: "Parijs, FR", specialty: "Glamour & events", rating: "4,8" },
      { name: "Diana Velvet", location: "Londen, VK", specialty: "Bruids & editorial", rating: "4,9" },
      { name: "Sofia Russo", location: "Milaan, IT", specialty: "Runway & beauty", rating: "4,8" },
    ],
    photoAlt: (name) => `${name}, makeup-artiest`,
  },
  appScreens: {
    title: "Zie de app in actie",
    subtitle: "Ontdekken, chatten en boeken, gewoon vanaf je telefoon.",
    screens: [
      { label: "Home", caption: "Je afspraken en favoriete artiesten in één oogopslag." },
      { label: "Ontdek", caption: "Vind artiesten op stijl, beoordeling en locatie." },
      { label: "Glam AI", caption: "Krijg persoonlijk beautyadvies van je AI-assistent." },
      { label: "Boekingen", caption: "Volg elke aanvraag en boeking op één plek." },
      { label: "Reviews", caption: "Lees en deel eerlijke reviews." },
    ],
  },
  reviews: {
    title: "Geliefd bij klanten en artiesten",
    subtitle: "Echte verhalen uit de MUA Match-community.",
    clientLabel: "Klant",
    muaLabel: "Makeup-artiest",
    items: [
      {
        quote:
          "Ik vond en boekte binnen enkele minuten een geweldige artiest voor mijn bruiloft. De portfolio's maakten de keuze makkelijk.",
        name: "Emma R.",
        role: "Bruid, Londen",
        type: "client",
      },
      {
        quote:
          "Tarieven en beschikbaarheid op één plek vergelijken scheelde me zoveel tijd voor mijn shoot.",
        name: "Noa de Vries",
        role: "Klant, Amsterdam",
        type: "client",
      },
      {
        quote:
          "MUA Match levert me een gestage stroom boekingsaanvragen en het dashboard houdt alles overzichtelijk.",
        name: "Diana Velvet",
        role: "Makeup-artiest, Londen",
        type: "mua",
      },
      {
        quote:
          "Ik toon mijn portfolio en word ontdekt door klanten die ik anders nooit had bereikt.",
        name: "Amara O.",
        role: "Makeup-artiest, Lagos",
        type: "mua",
      },
    ],
  },
  faq: {
    title: "Veelgestelde vragen",
    subtitle: "Hoe MUA Match werkt voor klanten en makeup-artiesten.",
    items: [
      {
        q: "Is de app gratis te downloaden?",
        a: "Ja. MUA Match is volledig gratis te downloaden en te gebruiken voor zowel klanten als makeup-artiesten, op iOS en Android. Geen abonnement en geen boekingskosten. Je betaalt alleen het tarief van je artiest voor de afspraak.",
      },
      {
        q: "Hoe boek ik een makeup-artiest in de app?",
        a: "Open de app, zoek op stijl, locatie en datum en bekijk artiestprofielen. Vergelijk portfolio's, tarieven en reviews, tik dan op boeken om een aanvraag te sturen en stem de details af in de chat. Je krijgt een bevestiging zodra de artiest accepteert.",
      },
      {
        q: "Hoe meld ik me aan als makeup-artiest?",
        a: "Download de app en tik op “Aanmelden als makeup-artiest”. Maak je profiel aan, voeg je portfolio, diensten en tarieven toe en stel je beschikbaarheid in. Zodra je live staat, vinden klanten in de buurt je en sturen ze aanvragen rechtstreeks naar je dashboard.",
      },
      {
        q: "Hoe werken betalingen en tarieven?",
        a: "Elke artiest bepaalt de eigen tarieven, die op het profiel staan. Je spreekt de prijs af in de chat vóór je bevestigt, dus geen verrassingen. De betaling regel je rechtstreeks met je artiest voor de afspraak.",
      },
      {
        q: "Kan ik chatten met een artiest voordat ik boek?",
        a: "Ja. Zodra je een aanvraag stuurt kun je de artiest een bericht sturen in de app om de look, locatie en timing te bespreken, referenties te delen en vragen te stellen voordat er iets vaststaat.",
      },
      {
        q: "Kan ik een boeking verzetten of annuleren?",
        a: "Ja. Je verzet of annuleert vanuit het tabblad Boekingen in de app, afhankelijk van het annuleringsbeleid dat op het profiel van de artiest staat.",
      },
      {
        q: "Waar is MUA Match beschikbaar?",
        a: "MUA Match is actief in Nederland en Europa en blijft groeien. Zoek op locatie om artiesten bij jou in de buurt te vinden, of filter op artiesten die op de dag zelf naar je toe komen.",
      },
    ],
    backToHome: "Terug naar home",
    contactPrompt: "Nog een vraag?",
    contactCta: "Neem contact op",
  },
  getApp: {
    title: "Download de MUA Match app",
    lead: "Boek sneller, chat met je artiest en regel alles onderweg.",
    qrLabel: "Scan om te downloaden",
    qrHint: "Richt je camera op de code en de juiste store opent vanzelf.",
    ratingLine: "Beoordeeld met 4,9 van 5 door klanten",
    freeLine: "Gratis op iOS en Android",
    bullets: ["Boek in een paar tikken", "Chat direct met artiesten", "Herinneringen voor elke afspraak"],
  },
  contact: {
    title: "Neem contact op",
    body: "Vragen of feedback? Stuur ons een bericht en we reageren zo snel mogelijk.",
    socialAria: "Social media",
  },
  contactForm: {
    name: "Naam",
    email: "E-mail",
    message: "Bericht",
    placeholderName: "Je naam",
    placeholderEmail: "jij@voorbeeld.nl",
    placeholderBody: "Waar kunnen we mee helpen?",
    submit: "Verstuur bericht",
    mailSubjectPrefix: "Bericht van ",
    mailSubjectFallback: "Bericht via muamatch.com",
    mailBodyNamePrefix: "Naam: ",
    mailBodyEmailPrefix: "E-mail: ",
  },
  cookie: {
    bannerAria: "Cookiemelding",
    text: "Deze website gebruikt cookies. Door verder te surfen ga je akkoord.",
    more: "Meer informatie",
    accept: "Akkoord",
  },
  legal: {
    fetchFailed:
      "Deze pagina kon niet worden geladen. Je vindt het document op muamatch.com.",
    openOfficial: "Open officiële pagina",
  },
  footer: {
    tagline: "Vind, vergelijk en boek professionele makeup-artiesten.",
    quickLinksAria: "Snelle links",
    legalAria: "Juridische links",
    faq: "FAQ",
    contact: "Contact",
    login: "Inloggen",
    terms: "Algemene voorwaarden",
    privacy: "Privacybeleid",
    cookiePolicy: "Cookiebeleid",
  },
};

export default dictionary;
