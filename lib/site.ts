// Central place for external links and shared site constants.

export const APP_STORE = "https://apps.apple.com/nl/app/mua-match/id6566187518";
export const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.muamatch.muamatch";

// MUA CMS login, used by the header button, the mobile menu and the footer.
// Artist sign-up happens in the app, so the "join" CTA points at the store.
export const DASHBOARD_URL = "https://cms.muamatch.com";

export const INSTAGRAM_URL = "https://www.instagram.com/mua.match/";
export const TIKTOK_URL = "https://www.tiktok.com/@mua.match";
export const CONTACT_EMAIL = "info@muamatch.com";
export const SUPPORT_EMAIL = "support@muamatch.com";

const ASSET_BASE = "https://www.muamatch.com/assets";
export const asset = (path: string) => `${ASSET_BASE}/${path}`;

export const STORE_ICONS = {
  appStore: asset("apple-store-download-app-icon.svg"),
  playStore: asset("google-play-store-download-app-icon.svg"),
};
