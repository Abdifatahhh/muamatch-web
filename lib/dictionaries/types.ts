export interface Dictionary {
  meta: { title: string; description: string };
  navAria: string;
  nav: {
    howItWorks: string;
    forClients: string;
    forMuas: string;
    contact: string;
    login: string;
    download: string;
  };
  header: { ariaHome: string; openMenu: string; closeMenu: string };
  localeSwitcher: { label: string; en: string; nl: string };
  hero: {
    title: string;
    lead: string;
    appStoreAlt: string;
    playAlt: string;
    imageAlt: string;
  };
  socialProof: {
    title: string;
    stats: { value: string; label: string }[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: { title: string; description: string }[];
    cta: string;
  };
  forClients: {
    eyebrow: string;
    title: string;
    lead: string;
    items: string[];
    cta: string;
  };
  forMuas: {
    eyebrow: string;
    title: string;
    lead: string;
    items: string[];
    ctaJoin: string;
    ctaLogin: string;
  };
  featured: {
    title: string;
    subtitle: string;
    viewLabel: string;
    ratingLabel: string;
    artists: { name: string; location: string; specialty: string; rating: string }[];
    photoAlt: (name: string) => string;
  };
  appScreens: {
    title: string;
    subtitle: string;
    screens: { label: string; caption: string }[];
  };
  reviews: {
    title: string;
    subtitle: string;
    clientLabel: string;
    muaLabel: string;
    items: { quote: string; name: string; role: string; type: "client" | "mua" }[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  downloadApp: {
    title: string;
    lead: string;
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
  legal: {
    fetchFailed: string;
    openOfficial: string;
  };
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
