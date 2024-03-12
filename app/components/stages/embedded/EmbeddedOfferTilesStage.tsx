import React, {useEffect, useRef} from 'react';
import {useEmbeddedStageStore} from "@/app/state/embedded_stages";
import {useGeneralStageStore} from "@/app/state/general_stages";
import OfferTileLoan from "@/app/components/OfferTileLoan";
import OfferTileCC from "@/app/components/OfferTileCC";

const EmbeddedOfferTilesStage = () => {

    const savedPanelType = useEmbeddedStageStore((state) => state.panelType)
    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const allOffersResponse = useEmbeddedStageStore((state) => state.allOffersResponse);

    const savedJwtBearerToken = useGeneralStageStore((state) => state.jwtBearerToken);

    const backRef = useRef(null);
    const continueRef = useRef(null);

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)

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

    return (
        <div className="m-auto text-center">

            <div>
                <br/>
                <h4 className="text-2xl">{allOffersResponse.mocked ? "Mocked " : ""}Offer Tiles</h4>
                {(false) && (
                    <div className={"jsonContainer"}>
                        <pre>{JSON.stringify(allOffersResponse.response_json_as_object, null, 2)}</pre>
                    </div>
                )}
                <br/>
                {allOffersResponse?.response_json_as_object?.["offers"]
                    .filter(productTypeItem => productTypeItem["product_type"] !== "CreditCard")
                    .map((productTypeItem) => (<div key={productTypeItem}>
                            {productTypeItem["product_offers"].map((productOfferItem) => (
                                <div key={productOfferItem["uuid"]}>
                                    <OfferTileLoan offer={...productOfferItem}></OfferTileLoan>
                                </div>
                            ))}
                        </div>
                    ))}
                {allOffersResponse?.response_json_as_object?.["offers"]
                    .filter(productTypeItem => productTypeItem["product_type"] === "CreditCard")
                    .map((productTypeItem) => (<div key={""}>
                            {productTypeItem["product_offers"].map((productOfferItem) => (
                                <div key={productOfferItem["uuid"]}>
                                    <OfferTileCC offer={...productOfferItem}></OfferTileCC>
                                </div>
                            ))}
                        </div>
                    ))}
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
export default EmbeddedOfferTilesStage
