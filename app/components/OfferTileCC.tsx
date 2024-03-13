import {Offer} from "@/app/state/offer_model";
import {formatNumber} from "@/app/utils/FormatUtils";

interface Props {
    offer: Offer
}

const OfferTileCC = (props: Props) => {

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
                        <div className={"offerTileColumnInnerPadding"} style={{backgroundColor: "#E4FDD9"}}>
                            <div style={{display: "block"}}>
                                <span className="offerEmphasisedText">{props?.offer?.product_attributes?.apr}%</span>
                                <br/>
                                <span>{props?.offer?.product_attributes?.apr_label_1}</span>&nbsp;
                                <span>{props?.offer?.product_attributes?.apr_label_2}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flexColumnSplitBorder"></div>
                    <div className="flexColumnSplit">
                        <div className={"offerTileColumnInnerPadding"}>
                            <div style={{display: "block"}}>
                                <span>{props?.offer?.product_attributes?.purchases_1}</span>
                                <br/>
                                <span
                                    className="offerEmphasisedText">{props?.offer?.product_attributes?.purchases_3}</span>
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
                                <span
                                    className="offerEmphasisedText">From £{formatNumber(props?.offer?.product_attributes?.credit_limit_min)} to £{formatNumber(props?.offer?.product_attributes?.credit_limit_max)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flexColumnSplitBorder"></div>
                    <div className="flexColumnSplit">
                        <div className={"offerTileColumnInnerPadding"}>
                            <div style={{display: "block"}}>
                                <span>{props?.offer?.product_attributes?.balance_transfer_1}</span>
                                <br/>
                                <span
                                    className="offerEmphasisedText">{props?.offer?.product_attributes?.balance_transfer_3}</span>
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
                        />
                    </div>
                </div>
            </div>
            <div className={"offerTileRepExample flexContainer"}>
                <div style={{display: "block"}}>
                    <span style={{fontWeight: "bold"}}>Representative example: </span>
                    <span>{props?.offer?.product_attributes?.rep_example}</span>
                </div>
            </div>
            <br/>
        </div>
    )
}

export default OfferTileCC