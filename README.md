# Residents and programs manager app

![app iamge](/docs/app.png)

## Functionality

The app provides the next functionality:

- view all residents
- view all programs
- assign resident to a program from the residents page
- assign program to a resident from the programs page

## The idea

Provide a convinient way to display and manage residents and programs.

Since we deal with entities with many properties, presenting residents and programs as tables seems the most convinient way to provide all needed information to the user.

## Known tradeoffs and limitations

### Validation

Validation is applied only to forms used to create resident and program.

### Pagination

The API used doesn't support pagination. All data displayed at once.

### Data fetching

For simplicity data fetching is done in server components (pages, React Server Components). Obtained data (residents, programs) then passed to child components.

However, due to the dynamic nature of this data, in real world app, it would be better to fetch data on-demand in some use cases. Eg, always load fresh list of residents when opening modal to assign resident to a program.

## How to run

This app is built on top of:

- [Next.js](https://nextjs.org/) as React framework.
- [TypeScript](https://www.typescriptlang.org/) as strongly typed programming language.
- [TailwindCSS](https://tailwindcss.com/) as CSS framework.
- [Flowbite React](https://flowbite-react.com/) as an open-source UI component library built on top of Tailwind CSS with React components and based on the Flowbite Design System.
- [React Hook Form](https://react-hook-form.com/) to build forms.
- [Yup](https://github.com/jquense/yup) for forms validation.

### Install

In the root of the project run

```sh
npm i
```

to install dependencies.

### Configure

The app configuration is available through the `.env` file.

The `.env.example` file is provided in the root of the project. Simply rename (or copy) it to `.env.local` and provide needed settings.

```sh
API_URL=https://welbi.org/api/
TOKEN=token
```

Where:

- `API_URL` is API URL
- `TOKEN` is your personal authentication token

To obtain your authentication token, send a `POST` request containing your email (using `email` as the key, with the body formatted as raw JSON) to [https://welbi.org/api/start](https://welbi.org/api/start).

### Run

In the root of the project run

```sh
npm run dev
```

to start development server and access running app by the next URL: [http://localhost:3000/](http://localhost:3000/)

## Live version

Live version is available on Vercel by the next URL: [https://residents-manager-app.vercel.app/](https://residents-manager-app.vercel.app/)
