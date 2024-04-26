import {Offer} from "@/app/state/offer_model";
import {formatNumber} from "@/app/utils/FormatUtils";

interface Props {
    offer: Offer
    onProceed?: () => void
}

const OfferTileLoan = (props: Props) => {

    return (<div className={"offerTileContainer"}>
            <div className={"offerTile flexContainer"}>
                <div className="flexColumn flexColumnBorder">
                    <div className={"offerTileColumnInnerPadding"} style={{height: "100%"}}>
                        <img alt={"logo"} src={props?.offer?.product_logo_url}
                             style={{width: "150px"}} className="offerColumnVerticalMargin"></img>
                    </div>
                </div>
                <div className="flexColumn flexColumnBorder">
                    <div className="flexColumnSplit">
                        <div className={"offerTileColumnInnerPadding"}>
                            <div style={{display: "block"}}>
                                <span>You could borrow</span>
                                <br/>
                                <span className="offerEmphasisedText">£{formatNumber(props?.offer?.loan_offered)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flexColumnSplitBorder"></div>
                    <div className="flexColumnSplit">
                        <div className={"offerTileColumnInnerPadding"}>
                            <div style={{display: "block"}}>
                                <span
                                    className="offerEmphasisedText">£{formatNumber(props?.offer?.total_repayment)}</span>
                                <br/>
                                <span>Total Repayable</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flexColumn flexColumnBorderThird">
                    <div className="flexColumnSplit">
                        <div className={"offerTileColumnInnerPadding"}>
                            <div style={{display: "block"}}>
                                <span>Over</span>
                                <br/>
                                <span className="offerEmphasisedText">{props?.offer?.term_requested} Months</span>
                            </div>
                        </div>
                    </div>
                    <div className="flexColumnSplitBorder"></div>
                    <div className="flexColumnSplit" style={{backgroundColor: "#9c9bf8"}}>
                        <div className={"offerTileColumnInnerPadding"}>
                            <div style={{display: "block"}}>
                                <span className="offerEmphasisedText">{props?.offer?.apr ?? props?.offer?.aprc} %</span>
                                <br/>
                                <span>Representative</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flexColumn">
                    <div className="flexColumnSplit">
                        <div className={"offerTileColumnInnerPadding offerTilePerMonth"}>
                            <div style={{display: "block"}}>
                                <span
                                    className="offerEmphasisedText">£{formatNumber(props?.offer?.monthly_repayment)}</span>
                                <br/>
                                <span>Per Month</span>
                            </div>
                        </div>
                    </div>
                    <div className="flexColumnSplitBorder"></div>
                    <div className="flexColumnSplit">
                        <div className={"offerTileColumnInnerPadding"}>
                            <div style={{display: "block"}}>
                            <span>
                                <input
                                    className="offerColumnVerticalMargin bg-lime-600 hover:bg-lime-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="submit"
                                    value={"Choose Offer"}
                                    onClick={props?.onProceed}
                                />
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"offerTileRepExample flexContainer"}>
                <div style={{display: "block"}}>
                    <span style={{fontWeight: "bold"}}>Representative example: </span>
                    <span>{props?.offer?.rep_example_text ?? "Some example text"}</span>
                </div>
            </div>
            <br/>
        </div>
    )
}

export default OfferTileLoan