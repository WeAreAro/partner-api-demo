import React, {useEffect, useRef, useState} from 'react';
import {hasTokenDefinedInEnv, isValidJwtBearerToken} from "@/app/utils/BearerUtils";
import {EmbeddedPanelType, useEmbeddedStageStore} from "@/app/state/embedded_stages";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {fetchWithTimeout} from "@/app/utils/HttpUtils";

const EmbeddedProceedPayloadStage = () => {

    const savedPanelType = useEmbeddedStageStore((state) => state.panelType)
    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const savedOfferToProceed = useEmbeddedStageStore((state) => state.offerToProceed);

    const setProceedResponse = useEmbeddedStageStore((state) => state.setProceedResponse)
    const proceedResponse = useEmbeddedStageStore((state) => state.proceedResponse);

    const savedJwtBearerToken = useGeneralStageStore((state) => state.jwtBearerToken);

    const [proceedUrl, setProceedUrl] = useState("");
    const [payload, setPayload] = useState("");
    const [result, setResult] = useState("");
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
        console.log("saved panel type", EmbeddedPanelType.ALL, savedPanelType);

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

        console.log('Saved Offer', savedOfferToProceed);

        const url = "/ff-api" + savedOfferToProceed.offer["proceed_url"];
        setProceedUrl(url);

        console.log('JWT', useJwtToken);

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
                if (result?.url) {
                    window.open(result.url, '_blank')?.focus();
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
                    className="mx-8 bg-amber-700 hover:bg-lime-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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

    return (
        <div className="m-auto text-center">

            <br/>
            {getNavButtons()}
            <br/>

            <div className={"urlDetails"}>
                POST {proceedUrl.replaceAll("/ff-api", "")}
            </div>

            <div>
                <br/>
                <h4 style={{fontSize: "18px"}}>Request JSON</h4>
                <div className={"jsonContainer"}>
                    <pre>{`${payload}`}</pre>
                </div>
            </div>

            <div>
                <br/>
                <h4 style={{fontSize: "18px"}}>{isUsingMocks() ? "Mocked " : ""}Response JSON</h4>
                <div className={"jsonContainer"}>
                    <pre>{`${result ?? "Loading... Please wait."}`}</pre>
                </div>
            </div>

            <br/>
            {getNavButtons()}
            <br/><br/>
        </div>
    );
}
export default EmbeddedProceedPayloadStage