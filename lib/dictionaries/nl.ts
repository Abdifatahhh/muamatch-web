import type { Dictionary } from "./types";

const dictionary: Dictionary = {
  meta: {
    title: "MUA Match — Reserveer makeup-artiesten",
    description:
      "MUA Match is een platform waar je makeup-artiesten kunt reserveren. Vind klanten of de beste MUAs bij jou in de buurt.",
  },
  navAria: "Hoofdmenu",
  nav: {
    download: "Download",
    benefits: "Voordelen",
    howItWorks: "Zo werkt het",
    artists: "Artiesten",
    contact: "Contact",
  },
  header: {
    ariaHome: "MUA Match home",
  },
  localeSwitcher: {
    label: "Taal",
    en: "English",
    nl: "Nederlands",
  },
  hero: {
    eyebrow: "Makeup & match",
    title: "Download de MUA Match app nu",
    lead: "Vind hier makkelijk je klanten — of vind hier de beste makeup-artiesten.",
    appStoreAlt: "Download in de App Store",
    playAlt: "Download op Google Play",
  },
  trust: {
    title: "Voor MUAs en klanten",
    platformLead:
      "Reserveer bruids make-up, make-up met haarstyling en diensten op locatie — met filters voor beschikbaarheid, ervaring, tarieven en meer.",
  },
  features: {
    title: "Alles wat je nodig hebt om te matchen",
    subtitle:
      "Van bruid tot editorial: ontdek en boek professionele MUAs met duidelijke filters en profielen.",
    items: [
      "Bruids make-up",
      "Make-up en haarstijl",
      "En op locatie",
      "Beschikbaarheid",
      "Ervaring",
      "Internationale beschikbaarheid",
      "Populariteit",
      "Tarieven",
    ],
  },
  howItWorks: {
    title: "Zo werkt het",
    subtitle: "Dezelfde flow of je nu talent boekt of juist meer boekingen wilt.",
    steps: [
      {
        title: "Ontdek",
        description: "Blader door profielen, portfolio’s en reviews die bij jouw stijl passen.",
      },
      {
        title: "Vergelijk",
        description: "Filter op beschikbaarheid, diensten, tarieven en locatie — inclusief op locatie.",
      },
      {
        title: "Boek",
        description: "Match en reserveer via de app zodat alles helder blijft voor iedereen.",
      },
    ],
  },
  showcase: {
    title: "Ontmoet een paar van onze MUAs",
    subtitle: "Echte portfolio’s uit de app — netjes gestapeld voor rustig scrollen.",
    portfolioAlt: (artistName, index) => `${artistName} — werk ${index}`,
  },
  contact: {
    title: "Zeg het maar :)",
    body: "Mail ons direct of laat een korte boodschap achter. We reageren zo snel mogelijk.",
    socialAria: "Social media",
  },
  contactForm: {
    name: "Naam",
    message: "Bericht",
    placeholderName: "Je naam",
    placeholderBody: "Waar kunnen we mee helpen?",
    submit: "Verstuur",
    mailSubjectPrefix: "Bericht van ",
    mailSubjectFallback: "Bericht via muamatch.com",
    mailBodyNamePrefix: "Naam: ",
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
    legalAria: "Juridische links",
    terms: "Algemene voorwaarden",
    privacy: "Privacybeleid",
    cookiePolicy: "Cookiebeleid",
  },
};

export default dictionary;
