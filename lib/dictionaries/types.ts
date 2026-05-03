export interface Dictionary {
  meta: { title: string; description: string };
  navAria: string;
  nav: {
    download: string;
    benefits: string;
    artists: string;
    contact: string;
    howItWorks: string;
  };
  header: { ariaHome: string; openMenu: string; closeMenu: string };
  localeSwitcher: { label: string; en: string; nl: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    appStoreAlt: string;
    playAlt: string;
  };
  trust: { title: string; platformLead: string };
  features: { title: string; subtitle: string; items: string[] };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: { title: string; description: string }[];
  };
  showcase: {
    title: string;
    subtitle: string;
    portfolioAlt: (artistName: string, index: number) => string;
  };
  contact: { title: string; body: string; socialAria: string };
  contactForm: {
    name: string;
    message: string;
    placeholderName: string;
    placeholderBody: string;
    submit: string;
    mailSubjectPrefix: string;
    mailSubjectFallback: string;
    mailBodyNamePrefix: string;
  };
  cookie: { bannerAria: string; text: string; more: string; accept: string };
  legal: {
    fetchFailed: string;
    openOfficial: string;
  };
  footer: {
    legalAria: string;
    terms: string;
    privacy: string;
    cookiePolicy: string;
  };
}
