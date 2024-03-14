import React, {useEffect, useRef, useState} from 'react';
import {hasTokenDefinedInEnv, isValidJwtBearerToken} from "@/app/utils/BearerUtils";
import {
    EmbeddedAboutYouPayload,
    EmbeddedAboutYouPayloadWithDependentsAsList,
    EmbeddedJointOtherIncome,
    EmbeddedOtherIncome,
    EmbeddedPanelType,
    useEmbeddedStageStore
} from "@/app/state/embedded_stages";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {fetchWithTimeout} from "@/app/utils/HttpUtils";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import {Accordion, AccordionItem as Item} from "@szhsin/react-accordion";
import {requiresJointApplicant} from "@/app/utils/StageStepUtils";

const EmbeddedAllOffersPayloadStage = () => {

    const savedPanelType = useEmbeddedStageStore((state) => state.panelType)
    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const partnerDetailsPayload = useEmbeddedStageStore((state) => state.partnerDetailsPayload);

    const loanPayload = useEmbeddedStageStore((state) => state.loanPayload);
    const cardPayload = useEmbeddedStageStore((state) => state.cardPayload);
    const vehicleDetailsPayload = useEmbeddedStageStore((state) => state.vehicleDetailsPayload);
    const securedPayload = useEmbeddedStageStore((state) => state.propertyDetailsPayload);

    const aboutYouPayload = useEmbeddedStageStore((state) => state.aboutYouPayload);
    const currentAddressPayload = useEmbeddedStageStore((state) => state.currentAddressPayload);
    const currentEmploymentPayload = useEmbeddedStageStore((state) => state.currentEmploymentPayload);
    const expenditurePayload = useEmbeddedStageStore((state) => state.expenditurePayload);
    const otherIncomePayload = useEmbeddedStageStore((state) => state.otherIncomePayload);

    const jointAboutYouPayload = useEmbeddedStageStore((state) => state.jointAboutYouPayload);
    const jointCurrentAddressPayload = useEmbeddedStageStore((state) => state.jointCurrentAddressPayload);
    const jointCurrentEmploymentPayload = useEmbeddedStageStore((state) => state.jointCurrentEmploymentPayload);
    const jointOtherIncomePayload = useEmbeddedStageStore((state) => state.jointOtherIncomePayload);

    const marketingConsentPayload = useEmbeddedStageStore((state) => state.marketingConsentPayload);

    const setAllOffersResponse = useEmbeddedStageStore((state) => state.setAllOffersResponse)
    const allOffersResponse = useEmbeddedStageStore((state) => state.allOffersResponse);

    const savedJwtBearerToken = useGeneralStageStore((state) => state.jwtBearerToken);

    const [allOffersUrl, setAllOffersUrl] = useState("");
    const [payload, setPayload] = useState("");
    const [result, setResult] = useState("Loading ... Please wait.");
    const [usingMocks, setUsingMocks] = useState(false);
    const [allOffersResponseObject, setAllOffersResponseObject] = useState(undefined);

    const backRef = useRef(null);
    const continueRef = useRef(null);

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage);

    const controller = new AbortController();

    let mappedOtherIncomePayload = [] as EmbeddedOtherIncome[];

    let mappedJointOtherIncomePayload = [] as EmbeddedJointOtherIncome[];

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

    const mapJointOtherIncomePayload = () => {
        const jointOtherIncome = [] as EmbeddedJointOtherIncome[]

        if (jointOtherIncomePayload.income_1 > 0) {
            jointOtherIncome.push({
                income: jointOtherIncomePayload.income_1,
                income_description: jointOtherIncomePayload.description_1,
            })
        }

        if (jointOtherIncomePayload.income_2 > 0) {
            jointOtherIncome.push({
                income: jointOtherIncomePayload.income_2,
                income_description: jointOtherIncomePayload.description_2,
            })
        }

        return jointOtherIncome
    }

    useEffect(() => {
        if (savedPanelType === EmbeddedPanelType.ALL) {
            mappedOtherIncomePayload = mapOtherIncomePayload();
        }

        if (savedPanelType === EmbeddedPanelType.SECURED) {
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

            ...((savedPanelType === EmbeddedPanelType.ALL
                    || savedPanelType === EmbeddedPanelType.AUTOFINANCE
                    || savedPanelType === EmbeddedPanelType.SECURED)
                && {"Loan": {...loanPayload}}),

            ...(savedPanelType === EmbeddedPanelType.CREDITCARD && {"Credit_Card": {...cardPayload}}),

            ...(savedPanelType === EmbeddedPanelType.AUTOFINANCE && {"Auto_Finance": {...vehicleDetailsPayload}}),

            ...(savedPanelType === EmbeddedPanelType.SECURED && {"Property": {...securedPayload}}),

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

                ...(savedPanelType === EmbeddedPanelType.ALL && mappedOtherIncomePayload.length > 0 && {
                    "Other_Income": mappedOtherIncomePayload
                }),

                "Marketing_Consent": {
                    ...marketingConsentPayload
                }
            },

            ...(savedPanelType === EmbeddedPanelType.SECURED && requiresJointApplicant(aboutYouPayload) && {
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

        return JSON.stringify(payload, null, 2);
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

        if (hasTokenDefinedInEnv()) {
            useJwtToken = process.env.NEXT_PUBLIC_API_BEARER_TOKEN;
        } else if (isValidJwtBearerToken(savedJwtBearerToken)) {
            useJwtToken = savedJwtBearerToken;
        }

        const url = "/ff-api/partner/v1/quote/all-offers";
        setAllOffersUrl(url);

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

        await fetchWithTimeout(controller, url, requestOptions)
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
                    onClick={() => {
                        console.log("ABORT!", controller);
                        controller?.abort("Back pressed");
                        setCurrentStage(savedStage - 1);
                    }}
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
                    POST {allOffersUrl.replaceAll("/ff-api", "")}
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
export default EmbeddedAllOffersPayloadStage
