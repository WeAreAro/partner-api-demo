import React, {useEffect, useRef} from 'react';
import {useEmbeddedStageStore} from "@/app/state/embedded_stages";
import {useGeneralStageStore} from "@/app/state/general_stages";
import OfferTileLoan from "@/app/components/OfferTileLoan";
import OfferTileCC from "@/app/components/OfferTileCC";
import {Offer} from "@/app/state/offer_model";
import {obfuscateLenderOfferValues} from "@/app/utils/FormatUtils";

const EmbeddedOfferTilesStage = () => {

    const savedPanelType = useEmbeddedStageStore((state) => state.panelType)
    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const allOffersResponse = useEmbeddedStageStore((state) => state.allOffersResponse);

    const savedJwtBearerToken = useGeneralStageStore((state) => state.jwtBearerToken);

    const backRef = useRef(null);
    const continueRef = useRef(null);

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage);
    const setOfferToProceed = useEmbeddedStageStore((state) => state.setOfferToProceed);

    const obfuscateOffers = useEmbeddedStageStore((state) => state.obfuscateOffers);

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
            console.log("Obfuscating offers...");
            sortedOffers = obfuscateLenderOfferValues(sortedOffers);
        }

        return sortedOffers;
    }

    const proceedWithOffer = (offer: Offer) => {
        setOfferToProceed({
            offer: offer,
            aro_reference: allOffersResponse.response_json_as_object["freedom_reference"]
        });
        setCurrentStage(savedStage + 1);
    }

    return (
        <div className="m-auto text-center">

            <div>
                <br/>
                <h4 className="text-2xl">{allOffersResponse.mocked ? "Mocked " : ""}Offer Tiles</h4>
                <br/>
                {flattenAndSortOffers(allOffersResponse?.response_json_as_object?.["offers"])
                    .map((offer) => {
                        if (offer.product_type === "CreditCard" || offer.product_type === "Credit Card") {
                            return (<div key={offer["uuid"]}>
                                <OfferTileCC offer={offer} onProceed={() => proceedWithOffer(offer)}></OfferTileCC>
                            </div>)
                        } else {
                            return (<div key={offer["uuid"]}>
                                <OfferTileLoan offer={offer} onProceed={() => proceedWithOffer(offer)}></OfferTileLoan>
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
    );
}
export default EmbeddedOfferTilesStage
