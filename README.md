# Marketplace App for Good

# 1. Welcome and Project Overview

**Built with:**

- [Node](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Radix UI / Themes](https://www.radix-ui.com/) \*\*\*\*- Tailwind Component Library
- [Supabase](https://supabase.com/) - an open-source Firebase alternative with a platform based on a PostgreSQL Database.
- [PostgreSQL](https://www.postgresql.org/) & SQL
- [Vitest](https://vitest.dev/) - for testing. If you are familiar with Jest, this should mostly be the same.

**Not Yet Implemented**

- [Stripe](https://stripe.com/au)

# 2. Team Introduction

TODO

# 3. Development Environment Setup

## Installing Dependencies

### node

We will use the current LTS version of `node v20.12.1 (LTS)`.

https://nodejs.org/en/download

If you do need to manage multiple versions of node consider installing nvm:

- https://github.com/nvm-sh/nvm for unix-based systems (MacOS, linux, etc.)
- https://github.com/coreybutler/nvm-windows for windows based systems

### pnpm

https://pnpm.io/installation

This project uses pnpm as it’s package manager.

TL;DR - Run `npm i -g pnpm` to install pnpm.

### Docker

https://docs.docker.com/desktop/

The Supabase CLI uses Docker containers to manage the local development stack. We’ll need to install Docker to use a local Supabase environment.

### Supabase CLI

https://supabase.com/docs/guides/cli/getting-started

The CLI allows us to setup and run a local development environment, along with performing database management such as database migrations.

No need to install this one, as we will primarily be using `npx supabase <command>`, but you will need to setup an account and login via your using the Supabase CLI.

### NPM Packages

Run `pnpm i` to install all npm packages.

## Setting up env variables

In the root directory, there is a [.env.example](.env.example) file. Copy and paste this file as a `.env.local` file.

By default, this file will allow you to connect to a Local Supabase environment,. Feel free to swap out the Supabase env variables for your own Supabase account / instance.

For the Stripe keys, please contact [@davidtaing](https://github.com/davidtaing) for test environment keys.

## Running the Development Server

Run `pnpm dev` to start the Supabase local environment and start the Next.js development server.

# 4. Communication and Collaboration

Communication will mostly be done via the dedicated Discord channel.

For access to the Discord server, please contact [@davidtaing](https://github.com/davidtaing)

# 5. Project Codebase

This project was started using one of the Supabase templates, so the project codebase will likely have major changes in the future.

As of the 9th April 2024, we have:

- the `src` folder containing all code for the Next.js frontend and backend code. This project uses Next’s app router.
- and the `supabase` folder containing configuration, migration files and a seed script.

Feel free to add suggestions for how you would like to structure the code. Open to new ideas.

# 6. Additional Resources

- https://github.com/codesydney/migram-frontend - this is version 2 of the project. Also built with Next.js and Tailwind and Stripe.

# 7. Glossary

- **Customer**: Individuals who initiate tasks on the platform.
- **Service Provider**: A person or company that undertakes work. For example this could be a tradesperson like an Painter or something more generic like a tutor or a cleaner.
- **Tasks**: These represent pieces of work ranging from home repairs, gardening, cleaning or any other task they require help completing.
- **Quotes**: These are bids made by service-providers on a task.
- **Jobs**: Refer to Tasks where a Customer has agreed to go ahead with a Quote. This name has not yet been finalized yet; the naming may change.

# 8. Getting Started Tasks

- Setup local environment
- Add your name to the Team Introduction section and submit a pull request.
