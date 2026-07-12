import type { Dictionary } from "./types";

const dictionary: Dictionary = {
  meta: {
    title: "Boek professionele makeup-artiesten",
    description:
      "Vind, vergelijk en boek professionele makeup-artiesten op één plek. MUA Match laat klanten met vertrouwen boeken en helpt artiesten hun business te laten groeien.",
  },
  navAria: "Hoofdmenu",
  nav: {
    forClients: "Voor klanten",
    forMuas: "Voor MUA's",
    contact: "Contact",
    login: "MUA Login",
    join: "Word makeup-artiest",
  },
  menu: {
    label: "Menu",
    open: "Menu openen",
    close: "Menu sluiten",
    downloadApp: "Download de app",
    help: "Hulp en ondersteuning",
    darkMode: "Donkere modus",
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
    title: "Vind de perfecte makeup-artiest voor elke gelegenheid",
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
  whyUs: {
    title: "Waarom MUA Match?",
    subtitle: "Alles wat je nodig hebt om met vertrouwen te boeken.",
    items: [
      { title: "Geverifieerde artiesten", description: "Elke artiest wordt gecheckt voordat die live gaat op het platform." },
      { title: "Transparante prijzen", description: "Tarieven staan op elk profiel, dus je kent de prijs vooraf." },
      { title: "Veilige boekingen", description: "Elke boeking wordt bevestigd en bijgehouden in de app." },
      { title: "Geen verborgen kosten", description: "De prijs die je afspreekt is de prijs die je betaalt." },
      { title: "Direct chatten", description: "Chat rechtstreeks met je artiest over de look, timing en details." },
      { title: "Echte reviews", description: "Lees echte ervaringen van klanten voordat je boekt." },
    ],
    badges: ["Vertrouwd in heel Europa", "Geverifieerde artiesten", "Veilige betalingen"],
  },
  forClients: {
    eyebrow: "Voor klanten",
    title: "Boek met vertrouwen een makeup-artiest",
    lead: "Zie er op je best uit op je bruiloft, fotoshoot of speciale dag. Vind, vergelijk en boek de juiste artiest, alles op één plek.",
    items: [
      "Bekijk geverifieerde artiesten",
      "Vergelijk portfolio's & tarieven",
      "Check echte beschikbaarheid",
      "Lees eerlijke reviews",
      "Boek & chat in de app",
      "Gratis te downloaden",
    ],
    cta: "Vind vandaag jouw artiest",
    note: "Gratis te downloaden.",
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
    viewLabel: "Bekijk profiel",
    verifiedLabel: "Geverifieerd",
    artists: [
      { name: "Lena Vos", location: "Amsterdam, NL", specialty: "Naturel & bruids", rating: "4,9" },
      { name: "Kelly Moreau", location: "Parijs, FR", specialty: "Glamour & events", rating: "4,8", verified: true },
      { name: "Diana Velvet", location: "Londen, VK", specialty: "Bruids & editorial", rating: "5,0" },
      { name: "Sofia Russo", location: "Milaan, IT", specialty: "Fotoshoots & branding", rating: "4,7" },
    ],
    photoAlt: (name) => `${name}, makeup-artiest`,
  },
  appScreens: {
    title: "Vind de perfecte makeup-artiest",
    subtitle:
      "Vergelijk portfolio's, tarieven en beschikbaarheid en boek de juiste artiest, alles in één app.",
    cta: "Download de app",
    screens: [
      { label: "Home", caption: "Je afspraken en favoriete artiesten in één oogopslag." },
      { label: "Ontdek", caption: "Vind artiesten op stijl, beoordeling en locatie." },
      { label: "Glam AI", caption: "Krijg persoonlijk beautyadvies van je AI-assistent." },
      { label: "Boekingen", caption: "Volg elke aanvraag en boeking op één plek." },
      { label: "Reviews", caption: "Lees en deel eerlijke reviews." },
    ],
    float: {
      verified: "Geverifieerde artiest",
      favorite: "Bewaard als favoriet",
      chatTitle: "Glam AI",
      chatBody: "3 artiesten vrij dit weekend",
      bookingTitle: "Boeking bevestigd",
      bookingBody: "za 14:00 · Amsterdam",
      reviewQuote: "Prachtige bruidslook, precies op tijd",
      reviewName: "Emma R.",
    },
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
        stars: 5,
      },
      {
        quote:
          "Tarieven en beschikbaarheid op één plek vergelijken scheelde me zoveel tijd voor mijn shoot.",
        name: "Noa de Vries",
        role: "Klant, Amsterdam",
        type: "client",
        stars: 4.5,
      },
      {
        quote:
          "MUA Match levert me een gestage stroom boekingsaanvragen en het dashboard houdt alles overzichtelijk.",
        name: "Diana Velvet",
        role: "Makeup-artiest, Londen",
        type: "mua",
        stars: 5,
      },
      {
        quote:
          "Ik toon mijn portfolio en word ontdekt door klanten die ik anders nooit had bereikt.",
        name: "Amara O.",
        role: "Makeup-artiest, Barcelona",
        type: "mua",
        stars: 4.5,
      },
    ],
  },
  faq: {
    title: "Veelgestelde vragen",
    subtitle: "Hoe MUA Match werkt voor klanten en makeup-artiesten.",
    items: [
      {
        q: "Hoe werkt het boeken van een makeup-artiest?",
        a: "Je stuurt een boekingsaanvraag via de app. De artiest heeft 48 uur om te accepteren of te weigeren. Na acceptatie betaal je binnen 48 uur een aanbetaling van 20% en is je boeking definitief. Betaal je de aanbetaling niet op tijd, dan vervalt de aanvraag automatisch zonder verplichtingen.",
      },
      {
        q: "Betaal ik het hele bedrag via de app?",
        a: "Nee. Via het platform betaal je alleen de aanbetaling van 20% om de boeking te bevestigen. De resterende 80% reken je rechtstreeks af met de artiest, bijvoorbeeld op de dag van je afspraak.",
      },
      {
        q: "Is MUA Match gratis te downloaden?",
        a: "Ja. De app is gratis te downloaden voor zowel klanten als makeup-artiesten. Een account aanmaken kost niets; je betaalt pas iets bij een daadwerkelijke boeking.",
      },
      {
        q: "Wat zijn de grootste voordelen voor klanten?",
        a: "Alles op één plek: je bekijkt geverifieerde artiesten, vergelijkt portfolio's, tarieven en echte reviews, chat direct over je look en boekt in een paar tikken. Glam AI, de slimme assistent in de app, helpt je bovendien de juiste artiest voor jouw gelegenheid te vinden. Je afspraak is bevestigd met een kleine aanbetaling en staat overzichtelijk in de app.",
      },
      {
        q: "Levert MUA Match zelf de make-updiensten?",
        a: "Nee. MUA Match is een platform dat klanten koppelt aan zelfstandige makeup-artiesten. De afspraak zelf is een overeenkomst tussen jou en de artiest, die verantwoordelijk is voor de uitvoering.",
      },
      {
        q: "Hoe meld ik me aan als makeup-artiest?",
        a: "Artiesten melden zich aan via de mobiele app. Maak je account aan, ga akkoord met de algemene voorwaarden en je registratie wordt per e-mail bevestigd. Daarna richt je je profiel, portfolio en beschikbaarheid in.",
      },
      {
        q: "Wat zijn de grootste voordelen voor makeup-artiesten?",
        a: "Je wordt gevonden door klanten in jouw regio zonder eigen marketing. Boekingsaanvragen, chat en je agenda zitten in één dashboard, je portfolio is meteen je etalage, en met extra's zoals promotiepakketten vergroot je je zichtbaarheid wanneer jij dat wilt.",
      },
      {
        q: "Wanneer ontvang ik als artiest de aanbetaling?",
        a: "MUA Match ontvangt de aanbetaling van 20%, houdt de service fee in en keert de rest aan je uit. De overige 80% van de sessieprijs regel je rechtstreeks met je klant.",
      },
      {
        q: "Mag ik betalingen buiten het platform om regelen om kosten te vermijden?",
        a: "Nee. Betalingen zo structureren dat platformvergoedingen worden ontweken is niet toegestaan en kan leiden tot blokkering. De aanbetaling loopt altijd via het platform; alleen de resterende 80% reken je rechtstreeks af.",
      },
      {
        q: "Wat gebeurt er bij misbruik?",
        a: "Valse of misleidende informatie, spam, kwetsende content en het omzeilen van platformbetalingen zijn niet toegestaan. MUA Match kan een account in zulke gevallen tijdelijk blokkeren of verwijderen, en gebruikers kunnen misbruik melden bij MUA Match.",
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
