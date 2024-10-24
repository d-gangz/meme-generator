# Meme Generator Playground

A playground project for building and testing meme generation features using Next.js and modern web technologies.

## About

This is my experimental space for building a meme generator web application. It serves as a testing ground for various features and technologies while creating something fun and interactive.

## Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/docs)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/docs/guides/nextjs), [Shadcn UI](https://ui.shadcn.com/docs/installation)
- **Animations**: [Framer Motion](https://www.framer.com/motion/introduction/)
- **Backend**: [Supabase](https://supabase.com/) for storing meme templates and user creations
- **Authentication**: [Clerk](https://clerk.com/) for user management
- **Database ORM**: [Drizzle](https://orm.drizzle.team/docs/get-started-postgresql)
- **Image Processing**: Server Actions for meme generation

## Features (In Progress)

- Meme template upload and management
- Text overlay with customizable positioning
- Font selection and styling
- Image export capabilities
- User collections for saved memes
- Social sharing integration

## Setup

1. Clone the repository
```bash
git clone {replace with repo url} .
```

2. Copy `.env.example` to `.env.local` and fill in the environment variables
```bash
cp .env.example .env.local
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

## Database Setup

Initialize the database with meme templates and necessary tables:

```bash
npm run db:generate
npm run db:migrate
```

## Testing Accounts

### Auth Testing
- Use email format: `anything+clerk_test@example.com`
- Password: Can be anything (e.g., "password")
- Verification code: `424242`

## Contributing

Feel free to experiment and contribute! This is a playground project meant for learning and testing new features.

## Contact

Questions or suggestions? Reach out to me on Twitter [@limgangrui](https://x.com/limgangrui)
