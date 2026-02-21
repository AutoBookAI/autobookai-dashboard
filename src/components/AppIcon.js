import React from 'react';

const APP_LOGOS = {
  // Social
  'google': 'https://cdn.simpleicons.org/google',
  'facebook': 'https://cdn.simpleicons.org/facebook/1877F2',
  'instagram': 'https://cdn.simpleicons.org/instagram/E4405F',
  'linkedin': 'https://cdn.simpleicons.org/linkedin/0A66C2',
  'tiktok': 'https://cdn.simpleicons.org/tiktok',
  'twitter': 'https://cdn.simpleicons.org/x',
  'twitter/x': 'https://cdn.simpleicons.org/x',
  'x': 'https://cdn.simpleicons.org/x',
  'snapchat': 'https://cdn.simpleicons.org/snapchat/FFFC00',
  'pinterest': 'https://cdn.simpleicons.org/pinterest/BD081C',
  'reddit': 'https://cdn.simpleicons.org/reddit/FF4500',
  'whatsapp': 'https://cdn.simpleicons.org/whatsapp/25D366',
  'telegram': 'https://cdn.simpleicons.org/telegram/26A5E4',

  // Email & Calendar
  'gmail': 'https://cdn.simpleicons.org/gmail/EA4335',
  'outlook': 'https://cdn.simpleicons.org/microsoftoutlook/0078D4',
  'outlook calendar': 'https://cdn.simpleicons.org/microsoftoutlook/0078D4',
  'yahoo mail': 'https://cdn.simpleicons.org/yahoo/6001D2',
  'google calendar': 'https://cdn.simpleicons.org/googlecalendar/4285F4',
  'apple calendar': 'https://cdn.simpleicons.org/apple/000000',
  'apple': 'https://cdn.simpleicons.org/apple/000000',

  // Productivity
  'notion': 'https://cdn.simpleicons.org/notion/000000',
  'slack': 'https://cdn.simpleicons.org/slack/4A154B',
  'trello': 'https://cdn.simpleicons.org/trello/0052CC',
  'asana': 'https://cdn.simpleicons.org/asana/F06A6A',
  'monday.com': 'https://cdn.simpleicons.org/mondaydotcom/6C36F9',
  'google drive': 'https://cdn.simpleicons.org/googledrive/4285F4',
  'dropbox': 'https://cdn.simpleicons.org/dropbox/0061FF',

  // Entertainment
  'spotify': 'https://cdn.simpleicons.org/spotify/1DB954',
  'netflix': 'https://cdn.simpleicons.org/netflix/E50914',
  'hulu': 'https://cdn.simpleicons.org/hulu/1CE783',
  'disney+': 'https://cdn.simpleicons.org/disneyplus/113CCF',
  'youtube': 'https://cdn.simpleicons.org/youtube/FF0000',
  'apple music': 'https://cdn.simpleicons.org/applemusic/FA243C',

  // Shopping
  'amazon': 'https://cdn.simpleicons.org/amazon/FF9900',
  'ebay': 'https://cdn.simpleicons.org/ebay/E53238',

  // Travel & Transport
  'uber': 'https://cdn.simpleicons.org/uber/000000',
  'uber eats': 'https://cdn.simpleicons.org/ubereats/06C167',
  'lyft': 'https://cdn.simpleicons.org/lyft/FF00BF',
  'airbnb': 'https://cdn.simpleicons.org/airbnb/FF5A5F',
  'booking.com': 'https://cdn.simpleicons.org/bookingdotcom/003580',
  'expedia': 'https://cdn.simpleicons.org/expedia/003580',
  'kayak': 'https://cdn.simpleicons.org/kayak/FF690F',

  // Food
  'doordash': 'https://cdn.simpleicons.org/doordash/FF3008',
  'grubhub': 'https://cdn.simpleicons.org/grubhub/F63440',
  'instacart': 'https://cdn.simpleicons.org/instacart/43B02A',
  'opentable': 'https://cdn.simpleicons.org/opentable/DA3743',
  'yelp': 'https://cdn.simpleicons.org/yelp/D32323',

  // Finance
  'paypal': 'https://cdn.simpleicons.org/paypal/00457C',
  'venmo': 'https://cdn.simpleicons.org/venmo/3D95CE',
  'cash app': 'https://cdn.simpleicons.org/cashapp/00C244',

  // Health & Fitness
  'strava': 'https://cdn.simpleicons.org/strava/FC4C02',
  'fitbit': 'https://cdn.simpleicons.org/fitbit/00B0B9',
  'peloton': 'https://cdn.simpleicons.org/peloton/181A1C',
  'myfitnesspal': 'https://cdn.simpleicons.org/myfitnesspal/0069CF',

  // Education
  'coursera': 'https://cdn.simpleicons.org/coursera/0056D2',
  'udemy': 'https://cdn.simpleicons.org/udemy/A435F0',
};

// Mapping from app id to favicon domain for apps not on Simple Icons
const FAVICON_DOMAINS = {
  'turo': 'turo.com',
  'postmates': 'postmates.com',
  'resy': 'resy.com',
  'hotelscom': 'hotels.com',
  'hotels.com': 'hotels.com',
  'vrbo': 'vrbo.com',
  'delta': 'delta.com',
  'united': 'united.com',
  'american': 'aa.com',
  'american airlines': 'aa.com',
  'southwest': 'southwest.com',
  'jetblue': 'jetblue.com',
  'spirit': 'spirit.com',
  'frontier': 'flyfrontier.com',
  'marriott': 'marriott.com',
  'hilton': 'hilton.com',
  'hyatt': 'hyatt.com',
  'ihg': 'ihg.com',
  'wyndham': 'wyndham.com',
  'best western': 'bestwestern.com',
  'bestwestern': 'bestwestern.com',
  'walmart': 'walmart.com',
  'target': 'target.com',
  'costco': 'costco.com',
  'whole foods': 'wholefoodsmarket.com',
  'wholefoods': 'wholefoodsmarket.com',
  'ticketmaster': 'ticketmaster.com',
  'stubhub': 'stubhub.com',
  'fandango': 'fandango.com',
  'zelle': 'zellepay.com',
  'bank of america': 'bankofamerica.com',
  'bankofamerica': 'bankofamerica.com',
  'chase': 'chase.com',
  'wells fargo': 'wellsfargo.com',
  'wellsfargo': 'wellsfargo.com',
  'apple health': 'apple.com',
  'apple_health': 'apple.com',
  'taskrabbit': 'taskrabbit.com',
  'thumbtack': 'thumbtack.com',
  'angi': 'angi.com',
  'nextdoor': 'nextdoor.com',
  'khan academy': 'khanacademy.org',
  'khanacademy': 'khanacademy.org',
  'classpass': 'classpass.com',
  'mondaycom': 'monday.com',
  'googledrive': 'drive.google.com',
  'google_calendar': 'calendar.google.com',
  'outlook_calendar': 'outlook.com',
  'apple_calendar': 'apple.com',
  'yahoo_mail': 'mail.yahoo.com',
  'disneyplus': 'disneyplus.com',
  'applemusic': 'music.apple.com',
  'cashapp': 'cash.app',
  'ubereats': 'ubereats.com',
};

function getLogoUrl(name) {
  const key = name.toLowerCase().trim();

  // Check direct mapping first
  if (APP_LOGOS[key]) return APP_LOGOS[key];

  // Check favicon domain mapping
  if (FAVICON_DOMAINS[key]) {
    return `https://www.google.com/s2/favicons?sz=64&domain=${FAVICON_DOMAINS[key]}`;
  }

  // Fallback: guess domain from name
  const domain = key.replace(/\s+/g, '') + '.com';
  return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
}

export default function AppIcon({ name, size = 24, style = {} }) {
  const logoUrl = getLogoUrl(name);

  return (
    <img
      src={logoUrl}
      alt={name}
      width={size}
      height={size}
      style={{ objectFit: 'contain', ...style }}
      onError={(e) => {
        // If image fails to load, show first letter as fallback
        e.target.style.display = 'none';
        if (e.target.nextSibling) return;
        const span = document.createElement('span');
        span.textContent = name.charAt(0).toUpperCase();
        span.style.cssText = `font-size:${size * 0.6}px;font-weight:700;color:rgba(255,255,255,0.5);`;
        e.target.parentNode.appendChild(span);
      }}
    />
  );
}

export { getLogoUrl, APP_LOGOS, FAVICON_DOMAINS };
