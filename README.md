# Aro Partner API Sandbox Project

The purpose of this project is to provide an example of how a Partner could implement the API within a modern frontend
stack.

It *is not intended* for production (it is not optimized and doesn't necessarily use React optimizations and
recommendations).

It *is intended* to provide clarity on the:

1. The expected payload and how it is handled for each journey.
2. Basic validation expected around required fields.
3. The conditional logic around certain aspects of the form (such as if the applicant is retired).
4. How the API requests are constructed and results handled.
5. How the API results can be displayed and interacted with.

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

## Getting Started for Development

Next, run the development server:

```bash
npm i next
npm run dev
```

Open [http://localhost:3000/DemoMenu](http://localhost:3000) with your browser to test that the application runs OK.

You will be presented with a menu page as follows that allows you to access each of the journeys supported by the APIs:

![img_demo.png](docs/img_demo_menu.png)

Alternatively you can access each journey individually:

1. [http://localhost:3000/UnsecuredForm](http://localhost:3000/UnsecuredForm) for the Redirect Loan journey
1. [http://localhost:3000/CardForm](http://localhost:3000/CardForm) for the Redirect Credit Card journey
1. [http://localhost:3000/EligibilityAll](http://localhost:3000/CardForm) for the Eligibility All Offers journey
1. [http://localhost:3000/EligibilityCard](http://localhost:3000/CardForm) for the Eligibility Credit Card journey
1. [http://localhost:3000/EligibilityAutoFinance](http://localhost:3000/CardForm) for the Eligibility Auto Finance
   journey
1. [http://localhost:3000/EligibilitySecured](http://localhost:3000/CardForm) for the Eligibility Secured journey

## Running a Production Build

A faster Production build can be run using these commands:

```bash
npm run build
npm start
```

## Form Validation

Simple form validation (such as required fields) is switched on by default. It can be useful to be able to play with the
data and observe how the API responses changes, so for this reason it is possible to *switch off* validation so that
fields can be left empty or have invalid data.

You can toggle whether validation is available by using the switch at the bottom of the form:

![img_validation_toggle.png](docs/img_validation_toggle.png)

## Components

Bootstrapping common components from TailWindCSS.

## Aro Sandbox API

It currently uses [`next.config.js`] to bypass CORS for local development.
