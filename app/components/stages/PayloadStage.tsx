import {FormType, OtherIncome, useStageStore} from '@/app/state/stages';
import React, {useEffect, useState} from 'react';

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
    const bankDetailsPayload = useStageStore((state) => state.bankDetailsPayload);

    const otherIncomePayload = useStageStore((state) => state.otherIncomePayload);

    const marketingConsentPayload = useStageStore((state) => state.marketingConsentPayload);

    const [payload, setPayload] = useState("");
    const [result, setResult] = useState(undefined as {});


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
                period: otherIncomePayload.period_1,
                rank: 1
            })
        }

        if (otherIncomePayload.income_2 > 0) {
            otherIncome.push({
                income: otherIncomePayload.income_2,
                income_description: otherIncomePayload.description_2,
                period: otherIncomePayload.period_2,
                rank: 2
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

                // Bank details is standard.
                "Bank_Details": {
                    ...bankDetailsPayload
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

        if (!process.env.NEXT_PUBLIC_API_BEARER_TOKEN || !process.env.NEXT_PUBLIC_API_BEARER_TOKEN.startsWith("ey")) {
            const mockedResponses = await fetchMockedResponses();
            setResult(JSON.stringify(mockedResponses[FormType[savedFormType]], null, 2));
            return;
        }

        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + process.env.NEXT_PUBLIC_API_BEARER_TOKEN); // See README.md

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


    return (
        <div className="m-auto text-center">
            <div>
                <h4 className="text-2xl">Payload</h4>
                <br></br>
                <pre>{`Payload: ${payload}`}</pre>
            </div>

            <div><h4 className="text-2xl">Result</h4>
                <br></br>
                <pre>{`Response: ${result ?? "Loading... Please wait."}`}</pre>
            </div>
            <input
                className="mx-8 bg-amber-700 hover:bg-lime-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                value="Back"
                onClick={() => setCurrentStage(savedStage - 1)}
            />
        </div>
    );
}
export default PayloadStage
