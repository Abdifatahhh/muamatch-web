import type { Dictionary } from "./types";

const dictionary: Dictionary = {
  meta: {
    title: "MUA Match — Boek professionele makeup-artiesten",
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
    download: "App downloaden",
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
    lead: "Vergelijk portfolio's, tarieven en beschikbaarheid op één plek.",
    appStoreAlt: "Download in de App Store",
    playAlt: "Ontdek het op Google Play",
    imageAlt: "Een makeup-artiest aan het werk met een klant",
  },
  socialProof: {
    title: "Vertrouwd door beautyprofessionals wereldwijd",
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
      { title: "Ontdek", description: "Blader door makeup-artiesten wereldwijd." },
      { title: "Vergelijk", description: "Bekijk portfolio's, tarieven en beschikbaarheid." },
      { title: "Boek", description: "Neem contact op en boek direct." },
    ],
    cta: "Download de app",
  },
  forClients: {
    eyebrow: "Voor klanten",
    title: "Boek met vertrouwen een makeup-artiest",
    lead: "Vind, vergelijk en boek de juiste artiest voor jouw gelegenheid — alles op één plek.",
    items: [
      "Bekijk geverifieerde artiesten",
      "Vergelijk portfolio's",
      "Vergelijk tarieven",
      "Check beschikbaarheid",
      "Boek met vertrouwen",
    ],
    cta: "Vind jouw artiest",
  },
  forMuas: {
    eyebrow: "Voor MUA's",
    title: "Laat je makeup-business groeien",
    lead: "Word ontdekt door nieuwe klanten en beheer alles vanuit je eigen dashboard.",
    items: [
      "Word ontdekt",
      "Toon je portfolio",
      "Ontvang boekingsaanvragen",
      "Beheer je profiel",
      "Laat je business groeien",
    ],
    ctaJoin: "Aanmelden als makeup-artiest",
    ctaLogin: "Inloggen op dashboard",
  },
  featured: {
    title: "Uitgelichte makeup-artiesten",
    subtitle: "Een voorproefje van het talent dat je vindt op MUA Match.",
    viewLabel: "Bekijk profiel",
    ratingLabel: "Score",
    artists: [
      { name: "Diana Velvet", location: "Londen, VK", specialty: "Bruids & editorial", rating: "4,9" },
      { name: "Kelly Moreau", location: "Parijs, FR", specialty: "Glamour & events", rating: "4,8" },
      { name: "Jasmine Glow", location: "Dubai, VAE", specialty: "Bruids & henna", rating: "5,0" },
      { name: "Amara Okafor", location: "Lagos, NG", specialty: "Editorial & SFX", rating: "4,9" },
      { name: "Sofia Russo", location: "Milaan, IT", specialty: "Runway & beauty", rating: "4,8" },
      { name: "Lena Vos", location: "Amsterdam, NL", specialty: "Naturel & bruids", rating: "4,9" },
      { name: "Maya Sharma", location: "Mumbai, IN", specialty: "Bruids & party", rating: "5,0" },
      { name: "Carmen Ortiz", location: "Madrid, ES", specialty: "Glamour & editorial", rating: "4,7" },
    ],
    photoAlt: (name) => `${name}, makeup-artiest`,
  },
  appScreens: {
    title: "Zie de app in actie",
    subtitle: "Alles om te ontdekken, chatten en boeken — gewoon in je broekzak.",
    screens: [
      { label: "Zoeken", caption: "Vind artiesten op stijl, locatie en budget." },
      { label: "Profiel", caption: "Bekijk portfolio's, tarieven en reviews." },
      { label: "Chat", caption: "Stuur artiesten een bericht en stem details af." },
      { label: "Boeking", caption: "Bevestig en beheer boekingen met één tik." },
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
    subtitle: "Alles wat je moet weten over boeken en aanmelden.",
    items: [
      {
        q: "Hoe boek ik een makeup-artiest?",
        a: "Blader door artiesten, vergelijk portfolio's, tarieven en beschikbaarheid en stuur direct in de app een boekingsaanvraag. Je krijgt een bevestiging zodra de artiest accepteert.",
      },
      {
        q: "Hoe meld ik me aan als makeup-artiest?",
        a: "Download de app of open het dashboard en tik op “Aanmelden als makeup-artiest”. Maak je profiel aan, voeg je portfolio en tarieven toe en ontvang boekingsaanvragen.",
      },
      {
        q: "Hoe werken betalingen?",
        a: "Je spreekt het tarief af met je artiest en betaalt veilig via de app. Artiesten ontvangen hun verdiensten nadat de afspraak is afgerond.",
      },
      {
        q: "In welke landen is MUA Match beschikbaar?",
        a: "MUA Match is wereldwijd beschikbaar, met actieve artiesten in 20+ landen en groeiende. Zoek op locatie om artiesten bij jou in de buurt of op locatie te vinden.",
      },
      {
        q: "Kan ik een boeking annuleren of verzetten?",
        a: "Ja. Je beheert, verzet of annuleert boekingen in de app, afhankelijk van het annuleringsbeleid van de artiest op hun profiel.",
      },
    ],
  },
  downloadApp: {
    title: "Download de MUA Match app",
    lead: "Vind jouw perfecte match of laat je makeup-business groeien — beschikbaar op iOS en Android.",
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
