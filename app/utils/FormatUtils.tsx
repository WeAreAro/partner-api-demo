import {Offer} from "@/app/state/offer_model";

export const formatNumber = (num: number) => {
    if (typeof num === 'undefined') {
        return "";
    }

    let [integerPart, decimalPart] = Number(num).toFixed(2).split('.');

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `${integerPart}${decimalPart === "00" ? "" : "." + decimalPart}`;
}

export const obfuscateOfferResponseJson = (obfuscate: boolean, jsonObject: any): any => {
    if (!obfuscate) {
        return jsonObject;
    }

    const allOffers = [] as Offer[];
    const offerTypes = ["unsecured_offers", "credit_card_offers", "auto_finance_offers", "secured_offers"]

    for (const offerType of offerTypes) {

        const offerTypeStr = offerTypes[offerType];

        console.log("Obfuscating offer type : ", offerTypeStr);

        if (jsonObject && jsonObject[offerTypeStr] && jsonObject[offerTypeStr].length > 0) {
            for (const offer of jsonObject[offerType]) {
                allOffers.push(offer);
            }
        }

    }

    obfuscateLenderOfferValues(allOffers);
    return jsonObject;
}

export const obfuscateLenderOfferValues = (offers: Offer[]) => {
    if (offers && offers.length > 0) {

        const firstLoan = offers.find(offer => offer.product_type !== "CreditCard" && offer.product_type !== "Credit Card");
        if (firstLoan) {
            for (const offer of offers) {
                if (offer.product_type !== "CreditCard" && offer.product_type !== "Credit Card") {
                    offer.apr = firstLoan.apr;
                    offer.total_repayment = firstLoan.total_repayment;
                    offer.monthly_repayment = firstLoan.monthly_repayment;
                }
            }
        }

        const firstCC = offers.find(offer => offer.product_type === "CreditCard" || offer.product_type === "Credit Card");
        if (firstCC) {
            for (const offer of offers) {
                if (offer.product_type === "CreditCard" || offer.product_type === "Credit Card") {
                    offer.apr = firstCC.apr;
                    offer.total_repayment = firstCC.total_repayment;
                    offer.monthly_repayment = firstCC.monthly_repayment;
                }
            }
        }
    }

    return offers;
}
