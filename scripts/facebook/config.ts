import path from 'path';

export const FB_CONFIG = {
  // Directory where persistent session data (cookies, localStorage) is stored locally
  sessionDir: path.join(process.cwd(), '.facebook-session'),

  // Target snow travel Facebook groups (discovered from Pedro's account)
  groups: [
    {
      id: 'subidas-el-colorado',
      name: 'Subidas a El Colorado centro de ski',
      url: 'https://www.facebook.com/groups/725555104154677/',
    },
    {
      id: 'te-llevo-farellones',
      name: 'Te llevo a Farellones / Colorado / Valle nevado !',
      url: 'https://www.facebook.com/groups/697378590378977/',
    },
    {
      id: 'farellones-valle-nevado-la-parva',
      name: 'FARELLONES / VALLE NEVADO / LA PARVA',
      url: 'https://www.facebook.com/groups/481815184798354/',
    },
    {
      id: 'snowboard-y-ski-chile',
      name: 'Snowboard y Ski Chile',
      url: 'https://www.facebook.com/groups/1418722858392998/',
    },
    {
      id: 'subida-nieve-chile',
      name: 'Subida Nieve Chile',
      url: 'https://www.facebook.com/groups/286572238146346/',
    },
    {
      id: 'snowboard-chile',
      name: 'Snowboard Chile',
      url: 'https://www.facebook.com/groups/14738485257/',
    },
    {
      id: 'ski-snowboard-en-chile',
      name: 'Ski y Snowboard en Chile',
      url: 'https://www.facebook.com/groups/977956023437497/',
    },
    {
      id: 'ski-snowboard-santiago',
      name: 'Ski y Snowboard - Santiago de Chile',
      url: 'https://www.facebook.com/groups/473744349438576/',
    },
  ],

  // Excluded / Blacklisted groups (trekking / general outdoor without carpool focus)
  blacklistedGroups: [
    'El grupo de trekking no tan serio. Santiago, Chile',
    'chile outdoor, trekking, senderismo, montaña, ski, snowboard',
  ],

  // Browser configuration
  viewport: {
    width: 1280,
    height: 800,
  },

  // Realistic macOS Chrome User-Agent
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
};
