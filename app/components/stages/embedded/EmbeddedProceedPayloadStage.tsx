import React, {useEffect, useRef, useState} from 'react';
import {hasTokenDefinedInEnv, isValidJwtBearerToken} from "@/app/utils/BearerUtils";
import {EmbeddedPanelType, useEmbeddedStageStore} from "@/app/state/embedded_stages";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {fetchWithTimeout} from "@/app/utils/HttpUtils";
import {Accordion, AccordionItem as Item} from "@szhsin/react-accordion";
import LoadingOverlayWrapper from 'react-loading-overlay-ts';

const EmbeddedProceedPayloadStage = () => {

    const savedPanelType = useEmbeddedStageStore((state) => state.panelType)
    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const savedOfferToProceed = useEmbeddedStageStore((state) => state.offerToProceed);

    const setProceedResponse = useEmbeddedStageStore((state) => state.setProceedResponse)
    const proceedResponse = useEmbeddedStageStore((state) => state.proceedResponse);

    const savedJwtBearerToken = useGeneralStageStore((state) => state.jwtBearerToken);

    const [proceedUrl, setProceedUrl] = useState("");
    const [payload, setPayload] = useState("");
    const [result, setResult] = useState("Loading ... Please wait.");
    const [usingMocks, setUsingMocks] = useState(false);

    const backRef = useRef(null);
    const continueRef = useRef(null);

    const controller = new AbortController();

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)

    useEffect(() => {
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

    const generatePayload = () => {
        const payload = {
            // Nothing to add yet!
        }

        return JSON.stringify(payload, null, 2);
    }

    async function fetchMockedResponses() {
        const response = await fetch('/mocks/mockedProceedResponses.json');
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

        const url = "/ff-api" + savedOfferToProceed.offer["proceed_url"];
        setProceedUrl(url);

        if (!useJwtToken) {
            const mockedResponses = await fetchMockedResponses();

            const responseObject = mockedResponses["EMBEDDED_" + EmbeddedPanelType[savedPanelType]];

            responseObject["aro_reference"] = savedOfferToProceed.aro_reference;
            responseObject["offer_uuid"] = savedOfferToProceed.offer["uuid"];

            let resultJson = JSON.stringify(responseObject, null, 2);

            setResult(resultJson);
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
                if (result?.resume_url) {
                    window.open(result?.resume_url, '_blank')?.focus();
                }
                if (result?.toString().startsWith("Internal Server Error")) {
                    setResult("Request timed out.");
                    setProceedResponse({mocked: true, response_json_as_object: undefined});
                } else {
                    let json = JSON.stringify(result, null, 2);
                    setResult(json);
                    setProceedResponse({mocked: false, response_json_as_object: result});
                }
            })
            .catch(error => {
                console.log('error', error);

                setResult(error && error.toString().startsWith("AbortError") ? "Request timed out." : error);
                setProceedResponse({mocked: true, response_json_as_object: undefined});
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
export default EmbeddedProceedPayloadStage
