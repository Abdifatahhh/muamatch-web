export interface Dictionary {
  meta: { title: string; description: string };
  navAria: string;
  nav: {
    forClients: string;
    forMuas: string;
    contact: string;
    login: string;
    join: string;
  };
  menu: {
    label: string;
    open: string;
    close: string;
    downloadApp: string;
    help: string;
    darkMode: string;
  };
  header: { ariaHome: string; openMenu: string; closeMenu: string };
  localeSwitcher: { label: string; en: string; nl: string };
  hero: {
    title: string;
    lead: string;
    appStoreAlt: string;
    playAlt: string;
    imageAlt: string;
    badge: string;
    freeNote: string;
    ratingNote: string;
    chipVerified: string;
    chipBooking: string;
  };
  socialProof: {
    title: string;
    stats: { value: string; label: string }[];
  };
  whyUs: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
    badges: string[];
  };
  forClients: {
    eyebrow: string;
    title: string;
    lead: string;
    items: string[];
    cta: string;
    note: string;
  };
  forMuas: {
    eyebrow: string;
    title: string;
    lead: string;
    items: string[];
    ctaJoin: string;
    note: string;
    dashboard: {
      title: string;
      bookingsLabel: string;
      ratingLabel: string;
      viewsLabel: string;
      earningsLabel: string;
      requestTitle: string;
      requestBody: string;
    };
  };
  featured: {
    viewLabel: string;
    verifiedLabel: string;
    artists: { name: string; location: string; specialty: string; rating: string; verified?: boolean }[];
    photoAlt: (name: string) => string;
  };
  appScreens: {
    title: string;
    subtitle: string;
    cta: string;
    screens: { label: string; caption: string }[];
    float: {
      verified: string;
      favorite: string;
      chatTitle: string;
      chatBody: string;
      bookingTitle: string;
      bookingBody: string;
      reviewQuote: string;
      reviewName: string;
    };
  };
  reviews: {
    title: string;
    subtitle: string;
    clientLabel: string;
    muaLabel: string;
    items: { quote: string; name: string; role: string; type: "client" | "mua"; stars: number }[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
    backToHome: string;
    contactPrompt: string;
    contactCta: string;
  };
  getApp: {
    title: string;
    lead: string;
    qrLabel: string;
    qrHint: string;
    ratingLine: string;
    freeLine: string;
    bullets: string[];
  };
  contact: { title: string; body: string; socialAria: string };
  contactForm: {
    name: string;
    email: string;
    message: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderBody: string;
    submit: string;
    mailSubjectPrefix: string;
    mailSubjectFallback: string;
    mailBodyNamePrefix: string;
    mailBodyEmailPrefix: string;
  };
  cookie: { bannerAria: string; text: string; more: string; accept: string };
  footer: {
    tagline: string;
    quickLinksAria: string;
    legalAria: string;
    faq: string;
    contact: string;
    login: string;
    terms: string;
    privacy: string;
    cookiePolicy: string;
  };
}
