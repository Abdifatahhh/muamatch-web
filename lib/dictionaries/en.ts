import type { Dictionary } from "./types";

const dictionary: Dictionary = {
  meta: {
    title: "MUA Match — Book professional makeup artists",
    description:
      "MUA Match is the platform to reserve makeup artists. Find clients or discover top MUAs near you.",
  },
  navAria: "Main navigation",
  nav: {
    download: "Download",
    benefits: "Benefits",
    howItWorks: "How it works",
    artists: "Artists",
    contact: "Contact",
  },
  header: {
    ariaHome: "MUA Match home",
  },
  localeSwitcher: {
    label: "Language",
    en: "English",
    nl: "Nederlands",
  },
  hero: {
    eyebrow: "Makeup & match",
    title: "Download the MUA Match app",
    lead: "Easily find your clients — or find the best makeup artists.",
    appStoreAlt: "Download on the App Store",
    playAlt: "Get it on Google Play",
  },
  trust: {
    title: "Built for MUAs and clients",
    platformLead:
      "Book bridal makeup, hair & makeup styling, and on-location appointments — with filters for availability, experience, rates, and more.",
  },
  features: {
    title: "Everything you need to match",
    subtitle:
      "From bridal to editorial: discover professional MUAs with clear profiles and filters.",
    items: [
      "Bridal makeup",
      "Hair & makeup styling",
      "On location",
      "Availability",
      "Experience",
      "International availability",
      "Popularity",
      "Rates",
    ],
  },
  howItWorks: {
    title: "How it works",
    subtitle: "Same smooth flow whether you book talent or grow your bookings.",
    steps: [
      {
        title: "Discover",
        description: "Browse profiles, portfolios, and reviews that fit your style or brief.",
      },
      {
        title: "Compare",
        description: "Filter by availability, services, rates, and location — including on-location.",
      },
      {
        title: "Book",
        description: "Match and reserve through the app so details stay clear for everyone.",
      },
    ],
  },
  showcase: {
    title: "Meet some of our MUAs",
    subtitle: "Real portfolio shots from the app — curated for a calm overview.",
    portfolioAlt: (artistName, index) => `${artistName} — portfolio ${index}`,
  },
  contact: {
    title: "Say hello :)",
    body: "Email us directly or leave a short message — we reply as soon as we can.",
    socialAria: "Social media",
  },
  contactForm: {
    name: "Name",
    message: "Message",
    placeholderName: "Your name",
    placeholderBody: "How can we help?",
    submit: "Send",
    mailSubjectPrefix: "Message from ",
    mailSubjectFallback: "Message via muamatch.com",
    mailBodyNamePrefix: "Name: ",
  },
  cookie: {
    bannerAria: "Cookie notice",
    text: "This site uses cookies. By continuing you agree.",
    more: "Learn more",
    accept: "OK",
  },
  legal: {
    fetchFailed:
      "This page could not be loaded. You can read the document on muamatch.com instead.",
    openOfficial: "Open official page",
  },
  footer: {
    legalAria: "Legal links",
    terms: "Terms & conditions",
    privacy: "Privacy policy",
    cookiePolicy: "Cookie policy",
  },
};

export default dictionary;
