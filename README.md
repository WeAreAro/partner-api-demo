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

## Adding your API Bearer Token to the Environment

**If you want to skip this step, then mocked responses will be returned instead (the API will not be invoked).**

To execute the API and see real results you should request (and have been supplied with) a JWT Bearer Token for the Aro
Sandbox environment.

If you do not have this, please liaise with <u>Aro Partner Support</u>.

The token should be added into a file called `.env.local` that you should create in the root of the project folder,
and in the following format:

```
NEXT_PUBLIC_API_BEARER_TOKEN=<token starting ey...>
```

## Specifying API Bearer Token at Runtime

If you have not defined your API Token within the environment, it is possible to specify it at runtime and still see
real API responses.

This option will only be available if the environment variable defined above **is not** specified.

When running the app, there should be an option available on the top-right, as follows:

![img.png](docs/img_unlocked.png)

Clicking this button will show an input field where you can paste your bearer token. This will be the token supplied
to you that starts "ey".

![img_1.png](docs/img_set_token.png)

After entering a valid token, the lock should close. Now whenever you make API requests the token will be used.

![img_2.png](docs/img_locked.png)

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
