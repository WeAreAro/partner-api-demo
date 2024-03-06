# Aro Partner API Sandbox Project

The purpose of this project is to provide an example of how a Partner could implement the API within a modern frontend
stack.

It *is not intended* for production. It is not optimized and fails to use React optimizations and recommendations.

It *is intended* to provide clarity on the:

1. The expected payload and how it is handled for each journey.
2. Basic validation expected around required fields.
3. The conditional logic around certain aspects of the form such as if the applicant is retired.
4. How the result looks and could be handled.

The documentation is available [here](https://developer.aro.co.uk/).

A live version of this demo can be found [here](https://partner-api-demo.freedom-finance-test.cloud/)

## Setting up your API Bearer Token

To execute the API and see results you should have been supplied with a JWT Bearer Token for the Aro Sandbox
environment. If you do not have this, please liaise with Aro Partner Support.

The token should be added into a file called `.env.local` that should be created in the root of the project folder,
using the following format:

```
NEXT_PUBLIC_API_BEARER_TOKEN=<token starting ey...>
```

## Getting Started

Next, run the development server:

```bash
npm i next
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to test that the application runs OK.

There are two journeys that are available for use:

1. [http://localhost:3000/UnsecuredForm](http://localhost:3000/UnsecuredForm) for the Loan redirect journey
1. [http://localhost:3000/CardForm](http://localhost:3000/CardForm) for the Credit Card redirect journey

## Components

Bootstrapping common components from TailWindCSS.

## Aro Sandbox API

It currently uses [`next.config.js`] to bypass CORS for local development.
