# Gang App Setup

Code template for a next.js app with supabase, clerk, stripe, and shadcn.

## Reach out

Feel free to reach me at my twitter X [@limgangrui](https://x.com/limgangrui).

## Tech Stack

- IDE: [Cursor](https://www.cursor.com/)
- AI Tools: [V0](https://v0.dev/), [Perplexity](https://www.perplexity.com/)
- Frontend: [Next.js](https://nextjs.org/docs), [Tailwind](https://tailwindcss.com/docs/guides/nextjs), [Shadcn](https://ui.shadcn.com/docs/installation), [Framer Motion](https://www.framer.com/motion/introduction/)
- Backend: [PostgreSQL](https://www.postgresql.org/about/), [Supabase](https://supabase.com/), [Drizzle](https://orm.drizzle.team/docs/get-started-postgresql), [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- Auth: [Clerk](https://clerk.com/)
- Payments: [Stripe](https://stripe.com/)

## Prerequisites

You will need accounts for the following services.

They all have free plans that you can use to get started.

- Create a [Cursor](https://www.cursor.com/) account
- Create a [GitHub](https://github.com/) account
- Create a [Supabase](https://supabase.com/) account
- Create a [Clerk](https://clerk.com/) account
- Create a [Stripe](https://stripe.com/) account
- Create a [Vercel](https://vercel.com/) account

You will likely not need paid plans unless you are building a business.

## Environment Variables

```bash
# DB (Supabase)
DATABASE_URL=

# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup

# Payments (Stripe)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_YEARLY=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY=
```

## Setup

1. Clone the repository
```bash
git clone {replace with repo url} .
```
2. Copy `.env.example` to `.env.local` and fill in the environment variables from above
```bash
cp .env.example .env.local
```
3. Run `npm install` to install dependencies
```bash
npm install
```
4. Run `npm run dev` to run the app locally
```bash
npm run dev
```

## Auth testing for Clerk
- The syntax for Clerk's test email is you need to have a +clerk_test in the email address. E.g testl+clerk_test@example.com.
- Password can be anything or just use "password".
- Use `424242` for the verification code.

## Supabase testing
- Run the following command to generate the SQL for the tables:
```bash
npm run db:generate
```
- Run the following command to migrate the tables to Supabase:
```bash
npm run db:migrate
```