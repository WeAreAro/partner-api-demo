import {RedirectFormType, RedirectOtherIncome, useRedirectStageStore} from '@/app/state/redirect_stages';
import React, {useEffect, useRef, useState} from 'react';
import {hasTokenDefinedInEnv, isValidJwtBearerToken} from "@/app/utils/BearerUtils";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {fetchWithTimeout} from "@/app/utils/HttpUtils";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import {Accordion, AccordionItem as Item} from "@szhsin/react-accordion";
import {YesNoValue} from "@/app/state/enum/Common";
import DismissableMessage from "@/app/components/DismissableMessage";
import {removeUnwantedProperties} from "@/app/utils/ObjectUtils";

const PayloadStage = () => {

    const savedFormType = useRedirectStageStore((state) => state.formType)

    const savedStage = useRedirectStageStore((state) => state.currentStage);

    const partnerDetailsPayload = useRedirectStageStore((state) => state.partnerDetailsPayload);
    const quotePayload = useRedirectStageStore((state) => state.quotePayload);
    const aboutYouPayload = useRedirectStageStore((state) => state.aboutYouPayload);

    const currentAddressPayload = useRedirectStageStore((state) => state.currentAddressPayload);

    const currentEmploymentPayload = useRedirectStageStore((state) => state.currentEmploymentPayload);
    const expenditurePayload = useRedirectStageStore((state) => state.expenditurePayload);

    const otherIncomePayload = useRedirectStageStore((state) => state.otherIncomePayload);

    const marketingConsentPayload = useRedirectStageStore((state) => state.marketingConsentPayload);

    const savedJwtBearerToken = useGeneralStageStore((state) => state.jwtBearerToken);

    const controller = new AbortController();

    const [proceedUrl, setProceedUrl] = useState("");
    const [payload, setPayload] = useState("");
    const [result, setResult] = useState("Loading ... Please wait.");
    const [usingMocks, setUsingMocks] = useState(false);

    const backRef = useRef(null);

    // Unsecured loan specific.
    let unsecuredLoanOtherIncomePayload = [] as RedirectOtherIncome[];

    // Card specific.
    let cardAboutYouPayload = {}
    let cardCurrentEmploymentPayload = {}

    const setCurrentStage = useRedirectStageStore((state) => state.setCurrentStage)

    useEffect(() => {
        if (savedFormType === RedirectFormType.UNSECURED_LOAN) {
            unsecuredLoanOtherIncomePayload = mapUnsecuredLoanOtherIncomePayload();
        } else if (savedFormType === RedirectFormType.CARD) {
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
        const otherIncome = [] as RedirectOtherIncome[]

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

    const generatePayload = () => {
        const payload = {
            "Partner": {
                "partner_code": partnerDetailsPayload.partner_code ? partnerDetailsPayload.partner_code : undefined,
                "reference": partnerDetailsPayload.partner_reference ? partnerDetailsPayload.partner_reference : undefined,
                "campaign_code": partnerDetailsPayload.campaign_code ? partnerDetailsPayload.campaign_code : undefined,
                "agree_terms": partnerDetailsPayload.agree_terms ? partnerDetailsPayload.agree_terms : YesNoValue.No,
            },

            // Journey specific.
            ...(savedFormType === RedirectFormType.UNSECURED_LOAN && {"Loan": {...quotePayload}}),
            ...(savedFormType === RedirectFormType.CARD && {"Quote": {...quotePayload}}),

            "Primary_Applicant": {
                // About you / Applicant details are standard.
                ...(savedFormType === RedirectFormType.UNSECURED_LOAN && {...aboutYouPayload}),
                ...(savedFormType === RedirectFormType.CARD && {...cardAboutYouPayload}),

                // Current address is standard.
                "Current_Address": {
                    ...currentAddressPayload
                },

                // Employment differs.
                ...(savedFormType === RedirectFormType.UNSECURED_LOAN && {"Current_Employment": {...currentEmploymentPayload}}),
                ...(savedFormType === RedirectFormType.CARD && {"Current_Employment": {...cardCurrentEmploymentPayload}}),

                // Expenditure is standard.
                "Expenditure": {
                    ...expenditurePayload
                },

                // Other income is unsecured loan specific.
                ...(savedFormType === RedirectFormType.UNSECURED_LOAN && unsecuredLoanOtherIncomePayload.length > 0 && {
                    "Other_Income": unsecuredLoanOtherIncomePayload
                }),

                // Marketing consent is standard.
                "Marketing_Consent": {
                    ...marketingConsentPayload
                }
            }
        }

        return JSON.stringify(removeUnwantedProperties(payload, "null"), null, 2);
    }

    async function fetchMockedResponses() {
        const response = await fetch('/mocks/mockedRedirectResponses.json');
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

        const url = savedFormType === RedirectFormType.UNSECURED_LOAN ?
            "/ff-api/partner/v1/quote" :
            "/ff-api/partner/v1/quote/card"
        setProceedUrl(url);

        if (!useJwtToken) {
            const mockedResponses = await fetchMockedResponses();
            setResult(JSON.stringify(mockedResponses["REDIRECT_" + RedirectFormType[savedFormType]], null, 2));

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

        await fetchWithTimeout(controller, url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.url) {
                    window.open(result.url, '_blank')?.focus();
                }
                if (result?.toString().startsWith("Internal Server Error")) {
                    setResult("Request timed out.");
                } else {
                    setResult(JSON.stringify(result, null, 2));
                }
            })
            .catch(error => {
                console.log('error', error);
                setResult(error && error.toString().startsWith("AbortError") ? "Request timed out." : error);
            });
    }

    const isUsingMocks = (): boolean => {
        return usingMocks;
    }

    const getNavButtons = () => {
        return (<>
            <input
                ref={backRef}
                className="mx-8 bg-amber-700 hover:bg-amber-900 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                value="Back"
                onClick={() => {
                    controller?.abort("Back pressed");
                    setCurrentStage(savedStage - 1);
                }}
            />
        </>)
    }

    const AccordionItem = ({header, ...rest}) => (
        <Item
            {...rest}
            header={({state: {isEnter}}) => (
                <>
                    {header}
                    <img
                        className={`ml-auto transition-transform duration-200 ease-out ${
                            isEnter && "rotate-180"
                        }`}
                        src={"/chevron-down.svg"}
                        alt="Chevron"
                    />
                </>
            )}
            className="border-b"
            buttonProps={{
                className: ({isEnter}) =>
                    `flex w-full p-4 text-left hover:bg-slate-100 ${
                        isEnter && "bg-slate-200"
                    }`
            }}
            contentProps={{
                className: "transition-height duration-200 ease-out"
            }}
            panelProps={{className: "p-4"}}
        />
    );

    return (
        <LoadingOverlayWrapper active={result === "Loading ... Please wait."}>
            <div className="m-auto text-center">

                <br/>
                {getNavButtons()}
                <br/>

                <div className={"urlDetails"}>
                    <b>POST</b> {proceedUrl.replaceAll("/ff-api", "")}
                </div>

                <div className={"payloadRequestResponseWrapper"}>
                    <Accordion allowMultiple={true}>
                        <AccordionItem header={"Request JSON"}>
                            <div className={"jsonContainerRequest"}>
                                <pre>{`${payload}`}</pre>
                            </div>
                        </AccordionItem>
                        <AccordionItem header={isUsingMocks() ? "Mocked Response JSON" : "Response JSON"}
                                       initialEntered>
                            {isUsingMocks() && <DismissableMessage/>}
                            <div className={"jsonContainerResponse"}>
                                <pre>{`${result ?? "Loading... Please wait."}`}</pre>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>

                <br/>
                {getNavButtons()}
                <br/><br/>
            </div>
        </LoadingOverlayWrapper>
    );
}
export default PayloadStage
