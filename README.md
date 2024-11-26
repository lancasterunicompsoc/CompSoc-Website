# compsocwebsite-app

This is the source code for the website of the Lancaster University Computing Society, LUCompSoc

The techstack:
- [TypeScript](https://www.typescriptlang.org/)
- [Nuxt 3](https://nuxt.com)
- Prisma ORM
- Uno CSS
- Deployment on Vercel

### Setup

Make sure to install the dependencies:

```bash
corepack enable
yarn
```

### Development Server

Start the development server on http://localhost:3000

```bash
yarn run dev
```

If you want to be able to upload slides, you need to setup your environment for vercel/blob

### Production

Build the application for production:

```bash
yarn run build
```

Locally preview production build (probably won't work as its trying to connect to turso):

```bash
yarn run preview
```
