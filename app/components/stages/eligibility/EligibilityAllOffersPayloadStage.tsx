import React, {useEffect, useRef, useState} from 'react';
import {hasApiKeyDefinedInEnv, hasTokenDefinedInEnv, isValidJwtBearerToken} from "@/app/utils/BearerUtils";
import {
    EligibilityAboutYouPayload,
    EligibilityAboutYouPayloadWithDependentsAsList,
    EligibilityJointOtherIncome,
    EligibilityOtherIncome,
    EligibilityPanelType,
    useEligibilityStageStore
} from "@/app/state/eligibility_stages";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {fetchWithTimeout} from "@/app/utils/HttpUtils";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import {Accordion, AccordionItem as Item} from "@szhsin/react-accordion";
import {requiresJointApplicant} from "@/app/utils/StageStepUtils";
import DismissableMessage from "@/app/components/DismissableMessage";
import {obfuscateOfferResponseJson} from "@/app/utils/FormatUtils";
import {removeUnwantedProperties} from "@/app/utils/ObjectUtils";
import {responseHasOffers} from "@/app/utils/OfferUtils";

const EligibilityAllOffersPayloadStage = () => {

    const savedPanelType = useEligibilityStageStore((state) => state.panelType)
    const savedStage = useEligibilityStageStore((state) => state.currentStage);

    const partnerDetailsPayload = useEligibilityStageStore((state) => state.partnerDetailsPayload);

    const loanPayload = useEligibilityStageStore((state) => state.loanPayload);
    const cardPayload = useEligibilityStageStore((state) => state.cardPayload);
    const vehicleDetailsPayload = useEligibilityStageStore((state) => state.vehicleDetailsPayload);
    const securedPayload = useEligibilityStageStore((state) => state.propertyDetailsPayload);

    const aboutYouPayload = useEligibilityStageStore((state) => state.aboutYouPayload);
    const currentAddressPayload = useEligibilityStageStore((state) => state.currentAddressPayload);
    const currentEmploymentPayload = useEligibilityStageStore((state) => state.currentEmploymentPayload);
    const expenditurePayload = useEligibilityStageStore((state) => state.expenditurePayload);
    const otherIncomePayload = useEligibilityStageStore((state) => state.otherIncomePayload);

    const jointAboutYouPayload = useEligibilityStageStore((state) => state.jointAboutYouPayload);
    const jointCurrentAddressPayload = useEligibilityStageStore((state) => state.jointCurrentAddressPayload);
    const jointCurrentEmploymentPayload = useEligibilityStageStore((state) => state.jointCurrentEmploymentPayload);
    const jointOtherIncomePayload = useEligibilityStageStore((state) => state.jointOtherIncomePayload);

    const marketingConsentPayload = useEligibilityStageStore((state) => state.marketingConsentPayload);

    const setAllOffersResponse = useEligibilityStageStore((state) => state.setAllOffersResponse)
    const allOffersResponse = useEligibilityStageStore((state) => state.allOffersResponse);

    const savedJwtBearerToken = useGeneralStageStore((state) => state.jwtBearerToken);
    const savedApiKey = useGeneralStageStore((state) => state.apiKey);

    const [allOffersUrl, setAllOffersUrl] = useState("");
    const [payload, setPayload] = useState("");
    const [result, setResult] = useState("Loading ... Please wait.");
    const [usingMocks, setUsingMocks] = useState(false);
    const [allOffersResponseObject, setAllOffersResponseObject] = useState(undefined);

    const backRef = useRef(null);
    const continueRef = useRef(null);

    const setCurrentStage = useEligibilityStageStore((state) => state.setCurrentStage);

    const obfuscateOffers = useEligibilityStageStore((state) => state.obfuscateOffers);

    const controller = new AbortController();

    let mappedOtherIncomePayload = [] as EligibilityOtherIncome[];

    let mappedJointOtherIncomePayload = [] as EligibilityJointOtherIncome[];

    const mapOtherIncomePayload = () => {
        const otherIncome = [] as EligibilityOtherIncome[]

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

    const mapJointOtherIncomePayload = () => {
        const jointOtherIncome = [] as EligibilityJointOtherIncome[]

        if (jointOtherIncomePayload.income_1 > 0) {
            jointOtherIncome.push({
                income: jointOtherIncomePayload.income_1,
                income_description: jointOtherIncomePayload.description_1,
                period: jointOtherIncomePayload.period_1
            })
        }

        if (jointOtherIncomePayload.income_2 > 0) {
            jointOtherIncome.push({
                income: jointOtherIncomePayload.income_2,
                income_description: jointOtherIncomePayload.description_2,
                period: jointOtherIncomePayload.period_2
            })
        }

        return jointOtherIncome
    }

    useEffect(() => {
        if (savedPanelType === EligibilityPanelType.ALL) {
            mappedOtherIncomePayload = mapOtherIncomePayload();
        }

        if (savedPanelType === EligibilityPanelType.SECURED) {
            mappedJointOtherIncomePayload = mapJointOtherIncomePayload();
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

    function mapAboutYou(aboutYouPayload: EligibilityAboutYouPayload): EligibilityAboutYouPayloadWithDependentsAsList {
        let asList: EligibilityAboutYouPayloadWithDependentsAsList = {
            ...aboutYouPayload,
            dependant_ages: stringToNumberArray(aboutYouPayload?.dependant_ages_comma_sep)
        };

        asList.dependant_ages_comma_sep = undefined;

        return asList;
    }

    const generatePayload = () => {
        const payload = {
            "Partner": {
                "partner_code": partnerDetailsPayload.partner_code ? partnerDetailsPayload.partner_code : undefined,
                "reference": partnerDetailsPayload.partner_reference ? partnerDetailsPayload.partner_reference : undefined,
                "campaign_code": partnerDetailsPayload.campaign_code ? partnerDetailsPayload.campaign_code : undefined,
                ...(({"panel_type": EligibilityPanelType[savedPanelType]}))
            },

            ...((savedPanelType === EligibilityPanelType.ALL
                    || savedPanelType === EligibilityPanelType.AUTOFINANCE
                    || savedPanelType === EligibilityPanelType.SECURED)
                && {"Loan": {...loanPayload}}),

            ...(savedPanelType === EligibilityPanelType.CREDITCARD && {"Credit_Card": {...cardPayload}}),

            ...(savedPanelType === EligibilityPanelType.AUTOFINANCE && {"Auto_Finance": {...vehicleDetailsPayload}}),

            ...(savedPanelType === EligibilityPanelType.SECURED && {"Property": {...securedPayload}}),

            "Primary_Applicant": {
                "Personal_Details": {
                    ...({...mapAboutYou(aboutYouPayload)}),
                },

                "Current_Address": {
                    ...currentAddressPayload
                },

                "Current_Employment": {
                    ...currentEmploymentPayload
                },

                "Expenditure": {
                    ...expenditurePayload
                },

                ...(savedPanelType === EligibilityPanelType.ALL && mappedOtherIncomePayload.length > 0 && {
                    "Other_Income": mappedOtherIncomePayload
                }),

                "Marketing_Consent": {
                    ...marketingConsentPayload
                }
            },

            ...(savedPanelType === EligibilityPanelType.SECURED && requiresJointApplicant(aboutYouPayload) && {
                "Joint_Applicant": {
                    "About_You": {...jointAboutYouPayload},
                    "Current_Address": {...jointCurrentAddressPayload},
                    "Current_Employment": {...jointCurrentEmploymentPayload},
                    ...(mappedJointOtherIncomePayload.length > 0 && {
                        "Other_Income": mappedJointOtherIncomePayload
                    }),
                }
            })
        }

        return JSON.stringify(removeUnwantedProperties(payload, "null"), null, 2);
    }

    async function fetchMockedResponses() {
        const response = await fetch('/mocks/mockedAllOffersResponses.json');
        return await response.json();
    }

    const sendPayload = async () => {

        setUsingMocks(false);
        setAllOffersResponse(undefined);
        setAllOffersResponseObject(undefined);
        setResult("Loading ... Please wait.");

        let useJwtToken = undefined;
        let useApiKey = undefined;

        if (hasTokenDefinedInEnv()) {
            useJwtToken = process.env.NEXT_PUBLIC_API_BEARER_TOKEN;
        } else if (isValidJwtBearerToken(savedJwtBearerToken)) {
            useJwtToken = savedJwtBearerToken;
        }

        if (hasApiKeyDefinedInEnv()) {
            useApiKey = process.env.NEXT_PUBLIC_API_KEY;
        } else {
            useApiKey = savedApiKey;
        }

        console.log("Using Bearer Token and API Key", useJwtToken, useApiKey);

        const url = "/ff-api/partner/v1/quote/all-offers";
        setAllOffersUrl(url);

        if (!useJwtToken) {
            const mockedResponses = await fetchMockedResponses();

            const obfuscatedResult = obfuscateOfferResponseJson(obfuscateOffers, mockedResponses["ELIGIBILITY_" + EligibilityPanelType[savedPanelType]]);
            let resultJson = JSON.stringify(obfuscatedResult, null, 2);

            setResult(resultJson);
            setAllOffersResponse({
                mocked: true,
                response_json_as_object: obfuscatedResult
            });
            setUsingMocks(true);

            return;
        }

        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + useJwtToken); // See README.md
        myHeaders.append("x-api-key", useApiKey ?? "");

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: payload
        };

        await fetchWithTimeout(controller, url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.toString().startsWith("Internal Server Error")) {
                    setResult("Request timed out.");
                    setAllOffersResponse({mocked: true, response_json_as_object: undefined});
                } else {
                    const obfuscatedResult = obfuscateOfferResponseJson(obfuscateOffers, result);
                    let json = JSON.stringify(obfuscatedResult, null, 2);
                    setResult(json);
                    setAllOffersResponse({mocked: false, response_json_as_object: obfuscatedResult});
                }
            })
            .catch(error => {
                console.log('error', error);

                setResult(error && error.toString().startsWith("AbortError") ? "Request timed out." : error);
                setAllOffersResponse({mocked: true, response_json_as_object: undefined});
            });
    }

    const isUsingMocks = (): boolean => {
        return usingMocks;
    }

    const getNavButtons = () => {
        return (
            <>
                <input
                    ref={backRef}
                    className="mx-8 bg-amber-700 hover:bg-amber-900 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    style={{marginLeft: 0}}
                    type="submit"
                    value="Back"
                    onClick={() => {
                        controller?.abort("Back pressed");
                        setCurrentStage(savedStage - 1);
                    }}
                />
                {(allOffersResponseObject && responseHasOffers(allOffersResponseObject)) &&
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
                    <b>POST</b> {allOffersUrl.replaceAll("/ff-api", "")}
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
                                <pre>{`${result}`}</pre>
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
export default EligibilityAllOffersPayloadStage
