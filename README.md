# ⚡ Blitz – AI-Powered Website Builder

![image](https://github.com/user-attachments/assets/a4f2ccd7-a6ed-4b08-a4bc-d5573c86a8d5)

**⚡ Blitz** is a modern full-stack app builder inspired by Bolt and Lovable. Built using Next.js, Prisma, tRPC, Clerk, and Tailwind CSS — Blitz allows users to go from 💬 chat to full-stack 💻 apps in seconds.

---

## ✨ Features

* 🔐 Auth with Clerk + Middleware Protection
* 🗯️ Prompt-based app generator (chat → code)
* 🧱 Templates: SaaS, Chat App, Blog CMS, Budget Tracker, etc.
* 🧬 Dynamic file system generation
* 📁 Project dashboard for recent builds
* 🌘 Dark Mode with next-themes
* 📜 Syntax highlighting via PrismJS
* 📦 UI with Radix, Lucide, Sonner & Tailwind v4
* ⚡ Fast builds with Turbopack

---

## 🧑‍💻 Tech Stack

| Category       | Tech                                                                 |
| -------------- | -------------------------------------------------------------------- |
| **Framework**  | [Next.js 15](https://nextjs.org/) + Turbopack                        |
| **Auth**       | [Clerk.dev](https://clerk.dev/)                                      |
| **ORM**        | [Prisma](https://www.prisma.io/)                                     |
| **API**        | [tRPC](https://trpc.io/)                                             |
| **Styling**    | [Tailwind CSS](https://tailwindcss.com/), `tw-animate-css`           |
| **Components** | [Radix UI](https://www.radix-ui.com/), [Lucide](https://lucide.dev/) |
| **Editor**     | [PrismJS](https://prismjs.com/)                                      |
| **Toasts**     | [Sonner](https://sonner.emilkowal.dev/)                              |

---

## 🚀 Getting Started

```bash
# 1. Clone
$ git clone https://github.com/satyam-code45/blitz.git
$ cd blitz

# 2. Install dependencies
$ npm install

# 3. Configure environment variables
$ cp .env.example .env
# Add Clerk, DB, etc.

# 4. Set up database
$ npx prisma db push

# 5. Start development
$ npm dev
```

> Visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
📦 blitz/
├── app/                     # App directory (Next.js 15)
│   ├── api/                 # API routes (tRPC handlers)
│   ├── dashboard/           # User project dashboard
│   ├── projects/[slug]/     # Dynamic project viewer
│   └── layout.tsx           # Root layout
├── components/              # Reusable components
├── lib/                     # Utilities and helpers
├── prisma/                  # DB schema and client
├── public/                  # Static files and assets
├── styles/                  # Tailwind styles
├── trpc/                    # Routers and context
└── hooks/, middleware.ts, tailwind.config.ts
```

---

## 📜 Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Run built app
npx inngest-cli@latest dev  # Run inngest locally
```

---

## 🤝 Contributing

PRs welcome! 🧠

```bash
git checkout -b feat/your-feature
npm commit
npm push --set-upstream origin feat/your-feature
```

Then open a [PR](https://github.com/satyam-code45/blitz/pulls)

---

## 🔗 Deployment

This project is ready to deploy with [Vercel](https://vercel.com/):

* GitHub integration
* `.env` setup
* One-click deploy!

🌐 [Live Site](https://blitz-alpha-three.vercel.app)

---

## 👤 Author

Built with ❤️ by [Satyam](https://github.com/satyam-code45)
[![GitHub Followers](https://img.shields.io/github/followers/satyam-code45?label=Follow%20Me\&style=social)](https://github.com/satyam-code45)

---

## 📄 License

MIT Licensed. [Read here](LICENSE)
