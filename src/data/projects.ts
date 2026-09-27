// Add a project by adding an object to this array. Nothing else needs to
// change — the home page card and the project's detail page are both
// generated from this data. The Project type below is the source of
// truth for what each field means; see the comments on it for details.

export interface ProjectVideo {
  /** URL to the video file itself (mp4, webm, etc). */
  src: string;
}

export interface ProjectLinks {
  /** Always shown on the detail page. */
  github: string;
  /** Optional. Omit the field (or leave it undefined) and the
   *  "Live demo" link simply won't render. */
  demo?: string;
}

export interface Project {
  /** Unique. Used in the URL: /project/<id> */
  id: string;
  name: string;
  year: number | string;
  /** One line. Used as both the card's description and the detail
   *  page's subtitle. */
  tagline: string;
  /** The longer write-up. Separate paragraphs with a blank line
   *  ("\n\n") — the detail page splits on that. */
  description: string;
  /** Plain technology names, in the order you want them displayed. */
  stack: string[];
  /** Optional. Short bullet points. Omit the field, or leave it as
   *  [], to skip this section. */
  highlights?: string[];
  /** Optional. Omit the field to skip the demo-video section
   *  entirely. */
  video?: ProjectVideo;
  /** Optional. Full-width screenshots, in display order. Omit or
   *  leave as [] to skip. */
  images?: string[];
  links: ProjectLinks;
}

export const projects: Project[] = [
{
    id: 'turn-based-campaign-system',
    name: 'Turn-Based Campaign System',
    year: 2026,
    tagline: 'A turn-based combat platform with a server-side game engine and content management dashboard.',
    description: `The Turn-Based Campaign System is a three-tier game platform built around a clear separation between the player experience, game logic, and content management. Players progress through multi-stage campaigns, choose playable creatures, manage action points, and fight enemies through strategic turn-based combat. Behind the game client, a dedicated admin dashboard provides workflows for creating campaigns, configuring creatures and abilities, managing media, and viewing platform statistics.

The most interesting part of the project is the combat engine. Combat resolution happens on the backend rather than trusting the client, with server-side accuracy rolls, damage calculation, defense mitigation, speed-based turn ordering, action-point management, and enemy decision making. The enemy AI evaluates available actions against the current combat state, changes behavior when its health is low, and accounts for available action points before selecting an action.

The project is also structured as three independently developed applications: a React game client, a React-based administration dashboard, and a Go REST API backed by PostgreSQL. Campaign progress and individual fights are persisted in the database, while Cloudinary handles creature and campaign media. On the frontend, Framer Motion drives combat animations and Howler.js manages background music, sound effects, crossfading, and browser audio-unlock behavior.`,
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Go',
      'PostgreSQL',
      'Cloudinary',
    ],
    highlights: [
      'Built a server-side combat engine covering accuracy rolls, damage calculation, defense mitigation, speed-based turn order, and action-point management.',
      'Implemented enemy AI that evaluates available actions based on combat state, AP availability, and health, including a defensive behavior when HP drops below 30%.',
      'Separated the system into a player game client, REST API/game engine, and dedicated admin dashboard.',
      'Built a multi-step campaign management workflow for configuring campaign stages, playable creatures, enemies, intro/outro media, and campaign status.',
      'Persisted campaign sessions and individual fights in PostgreSQL with migrations, indexes, and automatic timestamps.',
      'Implemented a frontend audio system with background music crossfading, sound effects, volume persistence, preloading, and browser autoplay handling.',
    ],
    video: {
      src: '/Turn-Based-Campaign-System/Screen Recording 2026-09-27 100553.mp4',
    },
    images: [
      '/Turn-Based-Campaign-System/Screenshot 2026-09-27 095724.png',
      '/Turn-Based-Campaign-System/Screenshot 2026-09-27 095742.png',
      '/Turn-Based-Campaign-System/Screenshot 2026-09-27 095752.png',
      '/Turn-Based-Campaign-System/Screenshot 2026-09-27 095800.png',
    ],
    links: {
      github: 'https://github.com/YaswanthRJ/Full-Stack-Turn-Based-Campaign-System',
      demo: 'https://elephant-oimi.onrender.com',
    },
  },
  {
    id: 'hogsaloon',
    name: 'Hogsaloon',
    year: 2026,
    tagline: 'A temporary chat platform that matches compatible strangers for real-time conversations with no permanent message retention.',
    description: `Hogsaloon is a real-time chat platform designed around spontaneous, ephemeral conversations. Users maintain permanent accounts with profiles, interests, and conversation preferences, but individual conversations are intentionally temporary. Instead of browsing users or swiping through profiles, a matchmaking system automatically places compatible users together using both thier preferences and languages.

Once a match is decided, the conversation runs in real time through Socket.IO. Messages are never permanently persisted; Redis temporarily retains only the latest 20 messages for the active session, allowing users to recover recent conversation state after a refresh or reconnect. Sessions can remain active for up to five hours, after which the conversation and its temporary message data are removed.

The application combines a React client with a NestJS backend and Socket.IO for real-time communication, with Redis handling the short-lived conversation state and matchmaking-related data. User profiles support display names, profile pictures, bios, interests, and conversation preferences, while Cloudinary handles profile image storage.`,
    stack: [
      'React',
      'NestJS',
      'Socket.IO',
      'Redis',
      'Cloudinary',
    ],
    highlights: [
      'Built automatic matchmaking based on overlapping user interests and conversation preferences rather than user browsing or swiping.',
      'Implemented real-time one-to-one chat using Socket.IO with support for reconnecting users.',
      'Designed ephemeral conversation storage where Redis retains only the latest 20 messages during an active session.',
      'Implemented five-hour conversation expiry with automatic cleanup of temporary message data.',
      'Built a queue-based flow for matchmaking, prioritizing user preferances.',
      'Created persistent user profiles with interests, and Cloudinary-backed profile images while keeping conversation data temporary.',
    ],
    images: [
      '/hogsaloon/Screenshot 2026-09-27 102924.png',
      '/hogsaloon/Screenshot 2026-09-27 103246.png',
      '/hogsaloon/Screenshot 2026-09-27 103340.png',
      '/hogsaloon/Screenshot 2026-09-27 103350.png',
      '/hogsaloon/Screenshot 2026-09-27 103720.png',
      '/hogsaloon/Screenshot 2026-09-27 103750.png',
    ],
    links: {
      github: 'https://github.com/YaswanthRJ/Hogsaloon',
    },
  },
  {
    id: 'ornis',
    name: 'Ornis',
    year: 2026,
    tagline: 'Bird species classification from images and audio recordings.',
    description: `Ornis is a machine learning web application that identifies bird species from two independent input types: uploaded images and uploaded audio recordings. Each input runs through its own classification pipeline, both powered by ShuffleNet V2 models but trained on fundamentally different data.

The audio pipeline is where most of the interesting engineering lives. Raw audio can't be fed directly to an image classifier, so the pipeline loads it with Librosa, normalizes and reduces noise, trims silence, and chunks the result into fixed-duration segments. Each chunk is converted into a mel-spectrogram image and classified independently, and the final species is chosen by majority voting across all chunks. That chunk-based approach means a single noisy or ambiguous moment in a recording doesn't poison the whole prediction.

The image pipeline is simpler but still deliberate: convert to RGB, resize to 224×224, normalize using ImageNet mean and std, then predict. The frontend is intentionally minimal — no layout shift, a supported-species modal, and a clean upload flow. The backend is a FastAPI service running PyTorch inference, which keeps the ML stack separate from the React client.`,
    stack: [
      'React',
      'Tailwind CSS',
      'FastAPI',
      'PyTorch',
      'ShuffleNet V2',
    ],
    highlights: [
      'Two independent ShuffleNet V2 classification pipelines — one for images, one for audio',
      'Audio pipeline with preprocessing, silence trimming, chunk-based classification, and majority voting across segments',
      'FastAPI backend running PyTorch inference, with a minimal React frontend designed to avoid layout shift',
    ],
    images: [
      '/ornis/Screenshot 2026-09-27 102350.png',
      '/ornis/Screenshot 2026-09-27 102410.png',
      '/ornis/Screenshot 2026-09-27 102428.png',
      '/ornis/Screenshot 2026-09-27 102447.png',
      '/ornis/Screenshot 2026-09-27 102459.png',
    ],
    links: {
      github: 'https://github.com/YaswanthRJ/Ornis',
    },
  },
  {
    id: 'multitenant-pm',
    name: 'Multi-Tenant PM',
    year: 2026,
    tagline: 'A multi-tenant project management system with role and permission-based access control.',
    description: `A full-stack project management application built around a permission model that separates roles from permissions. There are three roles — Super Admin, Admin, and Agent — but permissions are independent of roles, so an Agent can be granted project update rights without also being granted delete rights. The system resolves effective permissions from the database on every protected request rather than trusting the permissions baked into the authentication token, which means permission changes take effect immediately without forcing a re-login.

Tenant isolation is enforced at the resource-access layer, not in the UI. Project and user queries are scoped to the authenticated user's tenant, and individual resource lookups include tenant scope so a resource ID from another tenant can't be used to bypass authorization. Tenant IDs are never trusted from the frontend. Frontend permission checks exist for UI behavior — hiding buttons, disabling actions — but the backend middleware remains the actual authorization boundary.

The implementation deliberately favors a small, straightforward architecture over production-scale abstractions. Database access is raw SQL rather than an ORM, which keeps the queries readable and the authorization logic explicit. Authentication uses JWT with HTTP-only cookies, database-backed user lookup on protected routes, and disabled-account checks.`,
    stack: [
      'React',
      'Tailwind CSS',
      'Node.js',
      'PostgreSQL',
    ],
    highlights: [
      'Effective permissions resolved from the database on every protected request, so permission changes apply without re-login',
      'Tenant isolation enforced at the query level — resource IDs from other tenants cannot bypass authorization',
      'Permission-driven CRUD where the frontend hides actions but the backend middleware is the real authorization boundary',
      'Raw SQL database access instead of an ORM, keeping authorization logic explicit and readable',
    ],
    images: [
      '/project manager/Screenshot 2026-09-27 104138.png',
      '/project manager/Screenshot 2026-09-27 104249.png',
      '/project manager/Screenshot 2026-09-27 104257.png',
      '/project manager/Screenshot 2026-09-27 104309.png',
      '/project manager/Screenshot 2026-09-27 104318.png',
      '/project manager/Screenshot 2026-09-27 104323.png',
    ],
    links: {
      github: 'https://github.com/YaswanthRJ/Multi-Tenant-Project-Management-System',
    },
  },
  {
    id: 'shopdemo',
    name: 'ShopDemo',
    year: 2026,
    tagline: 'A full-stack e-commerce store with search, filtering, sorting, and a persistent cart.',
    description: `ShopDemo is a full-stack e-commerce application built with React and TypeScript on the frontend and an Express + MongoDB backend. The app supports browsing seeded products, searching by name, filtering by category, sorting by price or name, paginating results, and managing a cart that persists to local storage with toast feedback.

The backend is where the product logic lives. The products endpoint accepts category, search, sort, page, and limit as query parameters, so filtering and sorting happen server-side rather than being handled in the client. Sorting supports price ascending or descending and name ascending or descending, and pagination returns a total count alongside the current page and page count. A separate categories endpoint returns the distinct category list.

The frontend is a Vite + React application with pages, components, hooks, services, and a cart context. Axios handles API communication, React Router handles navigation, and the cart state is persisted to local storage so it survives a refresh. The backend is written in TypeScript with Express, Mongoose, CORS, and dotenv, and includes a seed script that clears existing products and inserts sample data — which makes the app immediately usable after setup.`,
    stack: [
      'React',
      'Node.js',
      'MongoDB',
    ],
    highlights: [
      'Server-side filtering, sorting, and pagination — the products endpoint accepts category, search, sort, page, and limit parameters',
      'Cart persisted to local storage with toast feedback for add and remove actions',
      'TypeScript end-to-end, with a Mongoose data layer and a seed script for immediate local setup',
    ],
    images: [
      '/shopdemo/Screenshot 2026-09-27 104948.png',
      '/shopdemo/Screenshot 2026-09-27 104954.png',
    ],
    links: {
      github: 'https://github.com/YaswanthRJ/intertoons-ecommerce',
      demo: 'https://ecommercefrontend-15zn.onrender.com',
    },
  },
  {
  id: 'soap',
  name: 'Soap Store',
  year: 2026,
  tagline: 'A lightweight storefront that turns a cart into a WhatsApp order message.',
  description: `Soap Store is a small e-commerce storefront for selling soap online. Customers browse a catalog, view individual product pages, and manage a cart that persists to local storage. Checkout is handled through WhatsApp: the cart is serialized into a formatted order message, and the seller and buyer finish the transaction in the app they already use.

That keeps the app small. There's no payment integration, no accounts, and no order-management backend — which is a good fit for a storefront at this scale.

The stack is Next.js 16 and React 19 with TypeScript, PostgreSQL via Drizzle ORM, and Tailwind CSS 4. Drizzle Kit handles schema generation and migrations, and a seed script populates the catalog so the app is usable immediately after setup. Cart state lives in a React context backed by local storage, which keeps the cart alive across refreshes without requiring accounts.`,
  stack: [
    'Next.js',
    'TypeScript',
    'PostgreSQL',
  ],
  highlights: [
    'Cart-to-WhatsApp order flow — no payment integration, no accounts, no order backend',
    'Cart state managed in React context and persisted to local storage, so it survives refreshes without server-side sessions',
    'Drizzle ORM with typed schema, Drizzle Kit migrations, and a seed script for immediate local setup',
  ],
    images: [
      '/soap/Screenshot 2026-09-27 104754.png',
      '/soap/Screenshot 2026-09-27 104804.png',
      '/soap/Screenshot 2026-09-27 104857.png',
    ],
  links: {
    github: 'https://github.com/YaswanthRJ/soap-ecommerce',
  },
},
];
