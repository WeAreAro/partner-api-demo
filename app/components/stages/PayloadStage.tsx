import {FormType, OtherIncome, useStageStore} from '@/app/state/stages';
import React, {useEffect, useRef, useState} from 'react';
import {hasTokenDefinedInEnv, isValidJwtBearerToken} from "@/app/utils/BearerUtils";

const PayloadStage = () => {

    const savedFormType = useStageStore((state) => state.formType)

    const savedStage = useStageStore((state) => state.currentStage);

    const quotePayload = useStageStore((state) => state.quotePayload);
    const aboutYouPayload = useStageStore((state) => state.aboutYouPayload);

    const currentAddressPayload = useStageStore((state) => state.currentAddressPayload);
    const firstPreviousAddressPayload = useStageStore((state) => state.firstPreviousAddressPayload);
    const secondPreviousAddressPayload = useStageStore((state) => state.secondPreviousAddressPayload);

    const currentEmploymentPayload = useStageStore((state) => state.currentEmploymentPayload);
    const expenditurePayload = useStageStore((state) => state.expenditurePayload);

    const otherIncomePayload = useStageStore((state) => state.otherIncomePayload);

    const marketingConsentPayload = useStageStore((state) => state.marketingConsentPayload);

    const savedJwtBearerToken = useStageStore((state) => state.jwtBearerToken);

    const [payload, setPayload] = useState("");
    const [result, setResult] = useState(undefined as {});
    const [usingMocks, setUsingMocks] = useState(false);

    const backRef = useRef(null);

    // Unsecured loan specific.
    let unsecuredLoanOtherIncomePayload = [] as OtherIncome[];

    // Card specific.
    let cardAboutYouPayload = {}
    let cardCurrentEmploymentPayload = {}

    const setCurrentStage = useStageStore((state) => state.setCurrentStage)

    useEffect(() => {
        if (savedFormType === FormType.UNSECURED_LOAN) {
            unsecuredLoanOtherIncomePayload = mapUnsecuredLoanOtherIncomePayload();
        } else if (savedFormType === FormType.CARD) {
            cardAboutYouPayload = mapCardAboutYouPayload();
            cardCurrentEmploymentPayload = mapCardCurrentEmploymentDetailsPayload();
        }
        setPayload(generatePayload());
    }, [])

    useEffect(() => {
        if (payload) {
            sendPayload();
        }
    }, [payload])

    useEffect(() => {
        const handleKeyDown = (event) => {
            const isFormControlFocused = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA';

            if (!isFormControlFocused) {
                if (event.key === 'ArrowLeft') {
                    backRef?.current?.click();
                }
            }
        };

        // Add event listener for keydown events
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const mapCardCurrentEmploymentDetailsPayload = () => {
        const copy = Object.assign({}, currentEmploymentPayload);
        return {...copy, gross_income_all: currentEmploymentPayload.gross_income}
    }

    const mapCardAboutYouPayload = () => {
        const copy = Object.assign({}, aboutYouPayload);
        return {...copy, first_name: aboutYouPayload.forename}
    }

    const mapUnsecuredLoanOtherIncomePayload = () => {
        const otherIncome = [] as OtherIncome[]

        if (otherIncomePayload.income_1 > 0) {
            otherIncome.push({
                income: otherIncomePayload.income_1,
                income_description: otherIncomePayload.description_1,
                period: otherIncomePayload.period_1
            })
        }

        if (otherIncomePayload.income_2 > 0) {
            otherIncome.push({
                income: otherIncomePayload.income_2,
                income_description: otherIncomePayload.description_2,
                period: otherIncomePayload.period_2
            })
        }

        return otherIncome
    }

    const shouldSendFirstPreviousAddress = () => {
        return currentAddressPayload?.years_lived * 12 + currentAddressPayload?.months_lived < 36
    }

    const shouldSendSecondPreviousAddress = () => {
        return ((currentAddressPayload?.years_lived * 12 + currentAddressPayload?.months_lived)
                + ((firstPreviousAddressPayload?.years_lived * 12) + firstPreviousAddressPayload?.months_lived)
                < 36)
            && !isNaN(secondPreviousAddressPayload.years_lived) && !isNaN(secondPreviousAddressPayload.months_lived)
    }

    const generatePayload = () => {
        const payload = {
            "Partner": {
                "partner_code": "FFW-TEST",
                "reference": "1234567",
                "agree_terms": "Y"
            },

            // Journey specific.
            ...(savedFormType === FormType.UNSECURED_LOAN && {"Loan": {...quotePayload}}),
            ...(savedFormType === FormType.CARD && {"Quote": {...quotePayload}}),

            "Primary_Applicant": {
                // About you / Applicant details are standard.
                ...(savedFormType === FormType.UNSECURED_LOAN && {...aboutYouPayload}),
                ...(savedFormType === FormType.CARD && {...cardAboutYouPayload}),

                // Current address is standard.
                "Current_Address": {
                    ...currentAddressPayload
                },

                // First address is standard.
                ...(shouldSendFirstPreviousAddress() && {"First_Previous_Address": {...firstPreviousAddressPayload}}),

                // Second address is specific to unsecured loan.
                ...(savedFormType === FormType.UNSECURED_LOAN && shouldSendSecondPreviousAddress() && {"Second_Previous_Address": {...secondPreviousAddressPayload}}),

                // Employment differs.
                ...(savedFormType === FormType.UNSECURED_LOAN && {"Current_Employment": {...currentEmploymentPayload}}),
                ...(savedFormType === FormType.CARD && {"Current_Employment": {...cardCurrentEmploymentPayload}}),

                // Expenditure is standard.
                "Expenditure": {
                    ...expenditurePayload
                },

                // Other income is unsecured loan specific.
                ...(savedFormType === FormType.UNSECURED_LOAN && unsecuredLoanOtherIncomePayload.length > 0 && {
                    "Other_Income": unsecuredLoanOtherIncomePayload
                }),

                // Marketing consent is standard.
                "Marketing_Consent": {
                    ...marketingConsentPayload
                }
            }
        }

        return JSON.stringify(payload, null, 2);
    }

    async function fetchMockedResponses() {
        const response = await fetch('/mocks/mockedResponses.json');
        return await response.json();
    }

    const sendPayload = async () => {

        setUsingMocks(false);

        let useJwtToken = undefined;

        if (hasTokenDefinedInEnv()) {
            useJwtToken = process.env.NEXT_PUBLIC_API_BEARER_TOKEN;
        } else if (isValidJwtBearerToken(savedJwtBearerToken)) {
            useJwtToken = savedJwtBearerToken;
        }

        if (!useJwtToken) {
            const mockedResponses = await fetchMockedResponses();
            setResult(JSON.stringify(mockedResponses[FormType[savedFormType]], null, 2));

            setUsingMocks(true);
            return;
        }

        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + useJwtToken); // See README.md

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: payload,
        };

        const url = savedFormType === FormType.UNSECURED_LOAN ?
            "/ff-api/partner/v1/quote" :
            "/ff-api/partner/v1/quote/card"

        await fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.url) {
                    window.open(result.url, '_blank')?.focus();
                }
                setResult(JSON.stringify(result, null, 2))
            })
            .catch(error => console.log('error', error));
    }

    const isUsingMocks = (): boolean => {
        return usingMocks;
    }

    return (
        <div className="m-auto text-center">
            <div>
                <br/>
                <h4 className="text-2xl">API Request Payload</h4>
                <div className={"jsonContainer"}>
                    <pre>{`${payload}`}</pre>
                </div>
            </div>

            <div>
                <br/>
                <h4 className="text-2xl">{isUsingMocks() ? "Mocked " : ""}API
                    Response</h4>
                <div className={"jsonContainer"}>
                    <pre>{`${result ?? "Loading... Please wait."}`}</pre>
                </div>
            </div>
            <br/>
            <input
                ref={backRef}
                className="mx-8 bg-amber-700 hover:bg-lime-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                value="Back"
                onClick={() => setCurrentStage(savedStage - 1)}
            />
            <br/><br/>
        </div>
    );
}
export default PayloadStage
