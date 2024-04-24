import {Offer} from "@/app/state/offer_model";

interface Props {
    offer: Offer
    onProceed?: () => void
}

const OfferTileCC = (props: Props) => {

    const getCreditLimit = (offer: Offer): string => {
        return "Up to £2500";
    }

    return (<div className={"offerTileContainer"}>
            <div className={"offerTile flexContainer offerTileBottomCC"}>
                <div className="flexColumn flexColumnBorder">
                    <div className={"offerTileColumnInnerPadding"} style={{height: "100%"}}>
                        <div style={{display: "block"}}>
                            <img alt={"logo"} src={props?.offer?.product_logo_url}
                                 style={{width: "150px", margin: "0 auto"}} className="offerColumnVerticalMargin"></img>
                            <div className={"offerTileProductName"}>{props?.offer?.product_name}</div>
                        </div>
                    </div>
                </div>
                <div className="flexColumn flexColumnBorder">
                    <div className="flexColumnSplit">
                        <div className={"offerTileColumnInnerPadding"} style={{backgroundColor: "#E4FDD9"}}>
                            <div style={{display: "block"}}>
                                <span className="offerEmphasisedText">{props?.offer?.apr}%</span>
                                <br/>
                                <span>Guaranteed APR</span>&nbsp;<span></span>
                            </div>
                        </div>
                    </div>
                    <div className="flexColumnSplitBorder"></div>
                    <div className="flexColumnSplit">
                        <div className={"offerTileColumnInnerPadding"}>
                            <div style={{display: "block"}}>
                                <span>Balance Transfer Available</span>
                                <br/>
                                <span className="offerEmphasisedText"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flexColumn flexColumnBorderThird">
                    <div className="flexColumnSplit">
                        <div className={"offerTileColumnInnerPadding"}>
                            <div style={{display: "block"}}>
                                <span>Credit Limit</span>
                                <br/>
                                <span className="offerEmphasisedText">{getCreditLimit(props?.offer)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flexColumnSplitBorder"></div>
                    <div className="flexColumnSplit">
                        <div className={"offerTileColumnInnerPadding"}>
                            <div style={{display: "block"}}>
                                <span>Contactless payments up to £100</span>
                                <br/>
                                <span className="offerEmphasisedText"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flexColumn">
                    <div className={"offerTileColumnInnerPadding offerTilePerMonth"} style={{height: "100%"}}>
                        <input
                            className="offerColumnVerticalMargin bg-lime-600 hover:bg-lime-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="submit"
                            value={"Choose Offer"}
                            onClick={props?.onProceed}
                        />
                    </div>
                </div>
            </div>
            <br/>
        </div>
    )
}

export default OfferTileCC