import React, {useEffect, useRef, useState} from 'react';
import {hasTokenDefinedInEnv, isValidJwtBearerToken} from "@/app/utils/BearerUtils";
import {
    EmbeddedAboutYouPayload,
    EmbeddedAboutYouPayloadWithDependentsAsList,
    EmbeddedOtherIncome,
    EmbeddedPanelType,
    useEmbeddedStageStore
} from "@/app/state/embedded_stages";
import {useGeneralStageStore} from "@/app/state/general_stages";

const EmbeddedAllOffersPayloadStage = () => {

    const savedPanelType = useEmbeddedStageStore((state) => state.panelType)
    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const partnerDetailsPayload = useEmbeddedStageStore((state) => state.partnerDetailsPayload);

    const loanPayload = useEmbeddedStageStore((state) => state.loanPayload);
    const cardPayload = useEmbeddedStageStore((state) => state.cardPayload);
    const securedPayload = useEmbeddedStageStore((state) => state.propertyDetailsPayload);

    const aboutYouPayload = useEmbeddedStageStore((state) => state.aboutYouPayload);
    const currentAddressPayload = useEmbeddedStageStore((state) => state.currentAddressPayload);
    const firstPreviousAddressPayload = useEmbeddedStageStore((state) => state.firstPreviousAddressPayload);
    const secondPreviousAddressPayload = useEmbeddedStageStore((state) => state.secondPreviousAddressPayload);
    const currentEmploymentPayload = useEmbeddedStageStore((state) => state.currentEmploymentPayload);
    const expenditurePayload = useEmbeddedStageStore((state) => state.expenditurePayload);
    const otherIncomePayload = useEmbeddedStageStore((state) => state.otherIncomePayload);

    const marketingConsentPayload = useEmbeddedStageStore((state) => state.marketingConsentPayload);

    const setAllOffersResponse = useEmbeddedStageStore((state) => state.setAllOffersResponse)
    const allOffersResponse = useEmbeddedStageStore((state) => state.allOffersResponse);

    const savedJwtBearerToken = useGeneralStageStore((state) => state.jwtBearerToken);

    const [payload, setPayload] = useState("");
    const [result, setResult] = useState("");
    const [usingMocks, setUsingMocks] = useState(false);
    const [allOffersResponseObject, setAllOffersResponseObject] = useState(undefined);

    const backRef = useRef(null);
    const continueRef = useRef(null);

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)

    let mappedOtherIncomePayload = [] as EmbeddedOtherIncome[];

    const mapOtherIncomePayload = () => {
        const otherIncome = [] as EmbeddedOtherIncome[]

        if (otherIncomePayload.income_1 > 0) {
            otherIncome.push({
                income: otherIncomePayload.income_1,
                income_description: otherIncomePayload.description_1,
            })
        }

        if (otherIncomePayload.income_2 > 0) {
            otherIncome.push({
                income: otherIncomePayload.income_2,
                income_description: otherIncomePayload.description_2,
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

    useEffect(() => {
        if (savedPanelType === EmbeddedPanelType.ALL) {
            mappedOtherIncomePayload = mapOtherIncomePayload();
        }

        const payload = generatePayload();

        console.log('Payload', payload);

        setPayload(payload);
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
                if (event.key === 'ArrowRight') {
                    continueRef?.current?.click();
                } else if (event.key === 'ArrowLeft') {
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

    useEffect(() => {

        console.log(allOffersResponse)

        if (allOffersResponse && allOffersResponse.response_json_as_object) {
            setAllOffersResponseObject(allOffersResponse.response_json_as_object);
        }

    }, [allOffersResponse]);

    function stringToNumberArray(input: string | undefined): number[] {
        if (!input || input.trim() === "") {
            return [];
        }

        return input.split(",").map(numString => parseInt(numString.trim(), 10));
    }

    function mapAboutYou(aboutYouPayload: EmbeddedAboutYouPayload): EmbeddedAboutYouPayloadWithDependentsAsList {
        let asList: EmbeddedAboutYouPayloadWithDependentsAsList = {
            ...aboutYouPayload,
            dependant_ages: stringToNumberArray(aboutYouPayload?.dependant_ages_comma_sep)
        };

        asList.dependant_ages_comma_sep = undefined;

        return asList;
    }

    const generatePayload = () => {
        console.log("saved panel type", EmbeddedPanelType.ALL, savedPanelType, loanPayload);

        const payload = {
            "Partner": {
                "partner_code": partnerDetailsPayload.partner_code ? partnerDetailsPayload.partner_code : undefined,
                "reference": partnerDetailsPayload.partner_reference ? partnerDetailsPayload.partner_reference : undefined,
                "campaign_code": partnerDetailsPayload.campaign_code ? partnerDetailsPayload.campaign_code : undefined,
                "agree_terms": "Y",
                ...(({"panel_type": EmbeddedPanelType[savedPanelType]}))
            },

            ...((savedPanelType === EmbeddedPanelType.ALL || savedPanelType === EmbeddedPanelType.SECURED) && {"Loan": {...loanPayload}}),

            ...(savedPanelType === EmbeddedPanelType.CREDITCARD && {"Credit_Card": {...cardPayload}}),

            ...(savedPanelType === EmbeddedPanelType.SECURED && {"Property": {...securedPayload}}),

            "Primary_Applicant": {
                "Personal_Details": {
                    ...({...mapAboutYou(aboutYouPayload)}),
                },

                "Current_Address": {
                    ...currentAddressPayload
                },

                ...(shouldSendFirstPreviousAddress() && {"First_Previous_Address": {...firstPreviousAddressPayload}}),

                ...(shouldSendSecondPreviousAddress() && {"Second_Previous_Address": {...secondPreviousAddressPayload}}),

                "Current_Employment": {
                    ...currentEmploymentPayload
                },

                "Expenditure": {
                    ...expenditurePayload
                },

                ...(savedPanelType === EmbeddedPanelType.ALL && mappedOtherIncomePayload.length > 0 && {
                    "Other_Income": mappedOtherIncomePayload
                }),

                "Marketing_Consent": {
                    ...marketingConsentPayload
                }
            },
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

        console.log('JWT', useJwtToken);

        if (!useJwtToken) {
            const mockedResponses = await fetchMockedResponses();

            let resultJson = JSON.stringify(mockedResponses["EMBEDDED_" + EmbeddedPanelType[savedPanelType]], null, 2);

            setResult(resultJson);
            setAllOffersResponse({
                mocked: true,
                response_json_as_object: mockedResponses["EMBEDDED_" + EmbeddedPanelType[savedPanelType]]
            });
            setUsingMocks(true);

            return;
        }

        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + useJwtToken); // See README.md

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: payload
        };

        const url = "/ff-api/partner/v1/quote/all-offers";

        await fetchWithTimeout(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.url) {
                    window.open(result.url, '_blank')?.focus();
                }
                if (result?.toString().startsWith("Internal Server Error")) {
                    setResult("Request timed out.");
                    setAllOffersResponse({mocked: true, response_json_as_object: undefined});
                } else {
                    let json = JSON.stringify(result, null, 2);
                    setResult(json);
                    setAllOffersResponse({mocked: false, response_json_as_object: result});
                }
            })
            .catch(error => {
                console.log('error', error);

                setResult(error && error.toString().startsWith("AbortError") ? "Request timed out." : error);
                setAllOffersResponse({mocked: true, response_json_as_object: undefined});
            });
    }

    async function fetchWithTimeout(resource: string, options = {}) {
        // @ts-ignore
        const {timeout = 30000} = options;

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(resource, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);

        return response;
    }

    const isUsingMocks = (): boolean => {
        return usingMocks;
    }

    const getNavButtons = () => {
        return (
            <>
                <input
                    ref={backRef}
                    className="mx-8 bg-amber-700 hover:bg-lime-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    style={{marginLeft: 0}}
                    type="submit"
                    value="Back"
                    onClick={() => setCurrentStage(savedStage - 1)}
                />
                {(allOffersResponseObject && allOffersResponseObject["offers"] && allOffersResponseObject["offers"].length > 0) &&
                    <input
                        ref={continueRef}
                        className="bg-lime-600 hover:bg-lime-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="submit"
                        value="Continue"
                        onClick={() => setCurrentStage(savedStage + 1)}
                    />
                }
            </>
        )
    }

    return (
        <div className="m-auto text-center">

            <div>
                <br/>
                <h4 className="text-2xl">{isUsingMocks() ? "Mocked " : ""}API
                    Response</h4>

                <br/>
                {getNavButtons()}
                <br/><br/>

                <h4 style={{fontSize: "18px"}}>Response JSON</h4>
                <div className={"jsonContainer"}>
                    <pre>{`${result ?? "Loading... Please wait."}`}</pre>
                </div>
            </div>

            <div>
                <br/>
                <h4 style={{fontSize: "18px"}}>Request JSON</h4>
                <div className={"jsonContainer"}>
                    <pre>{`${payload}`}</pre>
                </div>
            </div>

            <br/>
            {getNavButtons()}
            <br/><br/>
        </div>
    );
}
export default EmbeddedAllOffersPayloadStage