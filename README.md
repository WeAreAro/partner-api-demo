# Partner API Sandbox Project

The purpose of this project is to provide an example of how a Partner could implement the API within a modern frontend stack.

It *is not intended* for production. It is not optimized and fails to use React optimizations and recommendations.

It *is intended* to provide clarity on the:

1. The expected payload and how it is handled for each journey.
2. Basic validation expected around required fields.
3. The conditional logic around certain aspects of the form such as if the applicant is retired.
4. How the result looks and could be handled.

The documentation is available [here](https://developer.freedomfinance.co.uk/).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Components

Bootstrapping common components from TailWindCSS. 

## Freedom Finance API

It currently uses [`next.config.js`] to bypass CORS for local development.