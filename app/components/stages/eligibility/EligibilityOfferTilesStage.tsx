import React, {useEffect, useRef, useState} from 'react';
import {useEligibilityStageStore} from "@/app/state/eligibility_stages";
import {useGeneralStageStore} from "@/app/state/general_stages";
import OfferTileLoan from "@/app/components/OfferTileLoan";
import OfferTileCC from "@/app/components/OfferTileCC";
import {Offer} from "@/app/state/offer_model";
import {obfuscateLenderOfferValues} from "@/app/utils/FormatUtils";
import Switch from "react-switch";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

const EligibilityOfferTilesStage = () => {

    const savedPanelType = useEligibilityStageStore((state) => state.panelType)
    const savedStage = useEligibilityStageStore((state) => state.currentStage);

    const allOffersResponse = useEligibilityStageStore((state) => state.allOffersResponse);

    const savedJwtBearerToken = useGeneralStageStore((state) => state.jwtBearerToken);

    const backRef = useRef(null);
    const continueRef = useRef(null);

    const setCurrentStage = useEligibilityStageStore((state) => state.setCurrentStage);
    const setOfferToProceed = useEligibilityStageStore((state) => state.setOfferToProceed);

    const obfuscateOffers = useEligibilityStageStore((state) => state.obfuscateOffers);

    const [usePostForProceed, setUsePostForProceed] = useState(true);
    const [overlayActive, setOverlayActive] = useState(false);

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

    const flattenAndSortOffers = (productOffers): Offer[] => {
        const ret = [] as Offer[];

        for (const offer of productOffers) {
            ret.push(...offer.product_offers);
        }

        let sortedOffers = ret.filter(offer => offer.offer_display_rank !== null)
            .sort((a, b) => (a.offer_display_rank! - b.offer_display_rank!))
            .concat(ret.filter(offer => offer.offer_display_rank === null)
                .sort((a, b) => (a.apr || 0) - (b.apr || 0))
            );

        if (obfuscateOffers) {
            // console.log("Obfuscating offers...");
            sortedOffers = obfuscateLenderOfferValues(sortedOffers);
        }

        return sortedOffers;
    }

    const proceedWithOffer = (offer: Offer) => {
        try {
            setOverlayActive(true);

            if (usePostForProceed) {
                setOfferToProceed({
                    offer: offer,
                    aro_reference: allOffersResponse.response_json_as_object["freedom_reference"]
                });
                setCurrentStage(savedStage + 1);
            } else {

                // URL needs to be unsecured to work (probably with a one-time or time-expired token)
                const getUrl = process.env.API_BASE_URL + offer.proceed_url_redirect;
                console.log("Offer GET Url :", getUrl);
                window.location.href = getUrl;

                /*

                // Causes CORS errors when it tries to do a redirect internally in the app.
                // We could change the server to return HTTP 200 and return a payload with the URL but then
                // we aren't really any different to the use of the original POST mechanism.

                fetch(process.env.API_BASE_URL + offer.proceed_url, {
                    headers: {
                        'Authorization': 'Basic ' + savedJwtBearerToken,
                    }
                })
                    .then(response => {
                        // Handle response
                        console.log('Response:', response);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                 */

            }
        } catch (e) {
            setOverlayActive(false);
        }
    }

    const handlePostOrGetProceedChange = (checked) => {
        setUsePostForProceed(checked);
    }

    return (
        <LoadingOverlayWrapper active={overlayActive} fadeSpeed={100}>
            <div className="m-auto text-center">

                <div>
                    <br/>
                    <h4 className="text-2xl">{allOffersResponse.mocked ? "Mocked " : ""}Offer Tiles</h4>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "10px"}}>
                        <span style={{paddingRight: "10px"}}>Offer Proceed Stays In-App:</span>
                        <Switch
                            onChange={handlePostOrGetProceedChange}
                            checked={usePostForProceed}
                            height={20}
                            width={40}
                            onColor={"#3A787B"}
                        />
                    </div>
                    <div
                        style={{
                            fontSize: "12px",
                            color: "grey",
                            paddingTop: "5px",
                        }}>{usePostForProceed ? "App will POST to the Proceed URL, keeping control" : "App will GET the Proceed URL and relinquish control to remote"}</div>
                    <br/>
                    {flattenAndSortOffers(allOffersResponse?.response_json_as_object?.["offers"])
                        .map((offer) => {
                            if (offer.product_type === "CreditCard" || offer.product_type === "Credit Card") {
                                return (<div key={offer["uuid"]}>
                                    <OfferTileCC offer={offer} onProceed={() => proceedWithOffer(offer)}></OfferTileCC>
                                </div>)
                            } else {
                                return (<div key={offer["uuid"]}>
                                    <OfferTileLoan offer={offer}
                                                   onProceed={() => proceedWithOffer(offer)}></OfferTileLoan>
                                </div>)
                            }
                        })}
                </div>

                <br/>
                <input
                    ref={backRef}
                    className="mx-8 bg-amber-700 hover:bg-amber-900 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    value="Back"
                    onClick={() => setCurrentStage(savedStage - 1)}
                />
                <br/><br/>
            </div>
        </LoadingOverlayWrapper>
    );
}
export default EligibilityOfferTilesStage
