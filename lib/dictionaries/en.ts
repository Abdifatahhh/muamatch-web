import type { Dictionary } from "./types";

const dictionary: Dictionary = {
  meta: {
    title: "MUA Match — Book professional makeup artists",
    description:
      "Find, compare and book professional makeup artists in one place. MUA Match helps clients book with confidence and helps artists grow their business.",
  },
  navAria: "Main navigation",
  nav: {
    howItWorks: "How It Works",
    forClients: "For Clients",
    forMuas: "For MUAs",
    contact: "Contact",
    login: "Login",
    download: "Download App",
  },
  header: {
    ariaHome: "MUA Match home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  localeSwitcher: {
    label: "Language",
    en: "English",
    nl: "Nederlands",
  },
  hero: {
    title: "Find the perfect makeup artist for any occasion.",
    lead: "Compare portfolios, rates and availability in one place.",
    appStoreAlt: "Download on the App Store",
    playAlt: "Get it on Google Play",
    imageAlt: "A makeup artist working with a client",
  },
  socialProof: {
    title: "Trusted by beauty professionals worldwide",
    stats: [
      { value: "500+", label: "Makeup artists" },
      { value: "20+", label: "Countries" },
      { value: "10,000+", label: "Matches made" },
      { value: "4.9", label: "Average rating" },
    ],
  },
  howItWorks: {
    title: "How it works",
    subtitle: "From discovery to booking in three simple steps.",
    steps: [
      { title: "Discover", description: "Browse makeup artists worldwide." },
      { title: "Compare", description: "View portfolios, rates and availability." },
      { title: "Book", description: "Connect and book directly." },
    ],
    cta: "Download the app",
  },
  forClients: {
    eyebrow: "For Clients",
    title: "Book a makeup artist with confidence",
    lead: "Find, compare and book the right artist for your occasion — all in one place.",
    items: [
      "Browse verified artists",
      "Compare portfolios",
      "Compare rates",
      "Check availability",
      "Book with confidence",
    ],
    cta: "Find your artist",
  },
  forMuas: {
    eyebrow: "For MUAs",
    title: "Grow your makeup business",
    lead: "Get discovered by new clients and manage everything from your own dashboard.",
    items: [
      "Get discovered",
      "Showcase your portfolio",
      "Receive booking requests",
      "Manage your profile",
      "Grow your business",
    ],
    ctaJoin: "Join as a makeup artist",
    ctaLogin: "Login to dashboard",
  },
  featured: {
    title: "Featured makeup artists",
    subtitle: "A glimpse of the talent you'll find on MUA Match.",
    viewLabel: "View profile",
    ratingLabel: "Rating",
    artists: [
      { name: "Diana Velvet", location: "London, UK", specialty: "Bridal & editorial", rating: "4.9" },
      { name: "Kelly Moreau", location: "Paris, FR", specialty: "Glam & events", rating: "4.8" },
      { name: "Jasmine Glow", location: "Dubai, AE", specialty: "Bridal & henna", rating: "5.0" },
      { name: "Amara Okafor", location: "Lagos, NG", specialty: "Editorial & SFX", rating: "4.9" },
      { name: "Sofia Russo", location: "Milan, IT", specialty: "Runway & beauty", rating: "4.8" },
      { name: "Lena Vos", location: "Amsterdam, NL", specialty: "Natural & bridal", rating: "4.9" },
      { name: "Maya Sharma", location: "Mumbai, IN", specialty: "Bridal & party", rating: "5.0" },
      { name: "Carmen Ortiz", location: "Madrid, ES", specialty: "Glam & editorial", rating: "4.7" },
    ],
    photoAlt: (name) => `${name}, makeup artist`,
  },
  appScreens: {
    title: "See the app in action",
    subtitle: "Everything you need to discover, chat and book — right in your pocket.",
    screens: [
      { label: "Search", caption: "Find artists by style, location and budget." },
      { label: "Profile", caption: "Explore portfolios, rates and reviews." },
      { label: "Chat", caption: "Message artists and agree the details." },
      { label: "Booking", caption: "Confirm and manage bookings in one tap." },
    ],
  },
  reviews: {
    title: "Loved by clients and artists",
    subtitle: "Real stories from the MUA Match community.",
    clientLabel: "Client",
    muaLabel: "Makeup artist",
    items: [
      {
        quote:
          "I found and booked an amazing artist for my wedding in minutes. The portfolios made the choice easy.",
        name: "Emma R.",
        role: "Bride, London",
        type: "client",
      },
      {
        quote:
          "Comparing rates and availability in one place saved me so much time before my shoot.",
        name: "Noa de Vries",
        role: "Client, Amsterdam",
        type: "client",
      },
      {
        quote:
          "MUA Match brings me steady booking requests and the dashboard keeps everything organised.",
        name: "Diana Velvet",
        role: "Makeup artist, London",
        type: "mua",
      },
      {
        quote:
          "I showcase my portfolio and get discovered by clients I'd never have reached otherwise.",
        name: "Amara O.",
        role: "Makeup artist, Lagos",
        type: "mua",
      },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    subtitle: "Everything you need to know about booking and joining.",
    items: [
      {
        q: "How do I book a makeup artist?",
        a: "Browse artists, compare portfolios, rates and availability, then send a booking request directly in the app. You'll get a confirmation as soon as the artist accepts.",
      },
      {
        q: "How do I join as a makeup artist?",
        a: "Download the app or open the dashboard and tap “Join as a makeup artist”. Create your profile, add your portfolio and rates, and start receiving booking requests.",
      },
      {
        q: "How do payments work?",
        a: "You agree the rate with your artist and pay securely through the app. Artists receive their earnings after the appointment is completed.",
      },
      {
        q: "Which countries is MUA Match available in?",
        a: "MUA Match is available worldwide, with active artists in 20+ countries and growing. Search by location to find artists near you or on location.",
      },
      {
        q: "Can I cancel or reschedule a booking?",
        a: "Yes. You can manage, reschedule or cancel bookings from the app, subject to the artist's cancellation policy shown on their profile.",
      },
    ],
  },
  downloadApp: {
    title: "Download the MUA Match app",
    lead: "Find your perfect match or grow your makeup business — available on iOS and Android.",
  },
  contact: {
    title: "Get in touch",
    body: "Questions or feedback? Send us a message and we'll reply as soon as we can.",
    socialAria: "Social media",
  },
  contactForm: {
    name: "Name",
    email: "Email",
    message: "Message",
    placeholderName: "Your name",
    placeholderEmail: "you@example.com",
    placeholderBody: "How can we help?",
    submit: "Send message",
    mailSubjectPrefix: "Message from ",
    mailSubjectFallback: "Message via muamatch.com",
    mailBodyNamePrefix: "Name: ",
    mailBodyEmailPrefix: "Email: ",
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
    tagline: "Find, compare and book professional makeup artists.",
    quickLinksAria: "Quick links",
    legalAria: "Legal links",
    faq: "FAQ",
    contact: "Contact",
    login: "Login",
    terms: "Terms & conditions",
    privacy: "Privacy policy",
    cookiePolicy: "Cookie policy",
  },
};

export default dictionary;
