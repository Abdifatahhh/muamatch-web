import type { Dictionary } from "./types";

const dictionary: Dictionary = {
  meta: {
    title: "Book professional makeup artists",
    description:
      "Find, compare and book professional makeup artists in one place. MUA Match helps clients book with confidence and helps artists grow their business.",
  },
  navAria: "Main navigation",
  nav: {
    howItWorks: "How It Works",
    forClients: "For Clients",
    forMuas: "For MUAs",
    contact: "Contact",
    login: "Log in",
    join: "Join as an artist",
  },
  menu: {
    label: "Menu",
    open: "Open menu",
    close: "Close menu",
    forClients: "For clients",
    forMuas: "For makeup artists",
    downloadApp: "Download the app",
    featured: "Featured artists",
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
    lead: "Compare portfolios, rates and availability, and book your match in one app.",
    appStoreAlt: "Download on the App Store",
    playAlt: "Get it on Google Play",
    imageAlt: "A makeup artist working with a client",
    badge: "Free for clients & makeup artists",
    freeNote: "Free on iOS and Android, no subscription.",
    ratingNote: "Rated 4.9/5 by clients",
    chipVerified: "Verified artists",
    chipBooking: "Booking confirmed",
  },
  socialProof: {
    title: "Trusted by beauty professionals across Europe",
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
      { title: "Discover", description: "Browse verified makeup artists near you." },
      { title: "Compare", description: "View portfolios, rates and availability." },
      { title: "Book", description: "Chat, agree the details and book directly." },
    ],
  },
  forClients: {
    eyebrow: "For Clients",
    title: "Book a makeup artist with confidence",
    lead: "Find, compare and book the right artist for your occasion, all in one place.",
    items: [
      "Browse verified artists",
      "Compare portfolios & rates",
      "Check real availability",
      "Read genuine reviews",
      "Book & chat in the app",
      "Free to download",
    ],
    cta: "Find your MUA",
    note: "Free to download, no booking fees.",
    mediaAlt: "Makeup looks from artists on MUA Match",
  },
  forMuas: {
    eyebrow: "For MUAs",
    title: "Grow your makeup business",
    lead: "Get discovered by new clients and manage bookings, chats and your portfolio from one dashboard.",
    items: [
      "Get discovered by new clients",
      "Showcase your portfolio",
      "Receive booking requests",
      "Manage your calendar",
      "Chat with clients",
      "Track your growth",
    ],
    ctaJoin: "Join as a makeup artist",
    note: "Free to join. No monthly fees.",
    dashboard: {
      title: "Your dashboard",
      bookingsLabel: "Bookings",
      ratingLabel: "Rating",
      viewsLabel: "Profile views",
      earningsLabel: "This month",
      requestTitle: "New booking request",
      requestBody: "Bridal trial · Sat 14:00",
    },
  },
  featured: {
    title: "Featured makeup artists",
    subtitle: "A glimpse of the talent you'll find across Europe on MUA Match.",
    viewLabel: "View profile",
    ratingLabel: "Rating",
    artists: [
      { name: "Lena Vos", location: "Amsterdam, NL", specialty: "Natural & bridal", rating: "4.9" },
      { name: "Kelly Moreau", location: "Paris, FR", specialty: "Glam & events", rating: "4.8" },
      { name: "Diana Velvet", location: "London, UK", specialty: "Bridal & editorial", rating: "4.9" },
      { name: "Sofia Russo", location: "Milan, IT", specialty: "Runway & beauty", rating: "4.8" },
    ],
    photoAlt: (name) => `${name}, makeup artist`,
  },
  appScreens: {
    title: "See the app in action",
    subtitle: "Discover, chat and book, straight from your phone.",
    screens: [
      { label: "Home", caption: "Your appointments and favourite artists at a glance." },
      { label: "Explore", caption: "Find artists by style, rating and location." },
      { label: "Glam AI", caption: "Get personal beauty advice from your AI assistant." },
      { label: "Bookings", caption: "Track every request and booking in one place." },
      { label: "Reviews", caption: "Read and share genuine reviews." },
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
    subtitle: "How MUA Match works for clients and makeup artists.",
    items: [
      {
        q: "Is the app free to download?",
        a: "Yes. MUA Match is completely free to download and use for both clients and makeup artists, on iOS and Android. There is no subscription and no booking fee. You only pay your artist's rate for the appointment.",
      },
      {
        q: "How do I book a makeup artist in the app?",
        a: "Open the app, search by style, location and date, and browse artist profiles. Compare portfolios, rates and reviews, then tap to send a booking request and agree the details in chat. You'll get a confirmation as soon as the artist accepts.",
      },
      {
        q: "How do I join as a makeup artist?",
        a: "Download the app and tap “Join as a makeup artist”. Create your profile, add your portfolio, services and rates, and set your availability. Once you're live, clients nearby can find you and send booking requests straight to your dashboard.",
      },
      {
        q: "How do payments and rates work?",
        a: "Each artist sets their own rates, shown on their profile. You agree the price in chat before confirming, so there are no surprises. Payment is handled directly with your artist for the appointment.",
      },
      {
        q: "Can I chat with an artist before I book?",
        a: "Yes. Once you send a request you can message the artist in the app to discuss the look, location and timing, share references and ask questions before anything is confirmed.",
      },
      {
        q: "Can I reschedule or cancel a booking?",
        a: "Yes. You can reschedule or cancel from the Bookings tab in the app, subject to the cancellation policy shown on the artist's profile.",
      },
      {
        q: "Where is MUA Match available?",
        a: "MUA Match is active across the Netherlands and Europe and keeps growing. Search by location to find artists near you, or filter for artists who travel to you on the day.",
      },
    ],
    backToHome: "Back to home",
    contactPrompt: "Still have a question?",
    contactCta: "Contact us",
  },
  getApp: {
    title: "Get the MUA Match app",
    lead: "Book faster, chat with your artist and manage everything on the go.",
    qrLabel: "Scan to download",
    qrHint: "Point your camera at the code and the right store opens automatically.",
    ratingLine: "Rated 4.9 out of 5 by clients",
    freeLine: "Free on iOS and Android",
    bullets: ["Book in a few taps", "Chat directly with artists", "Reminders for every appointment"],
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
