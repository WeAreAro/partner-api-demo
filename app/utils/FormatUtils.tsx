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

    if (jsonObject && jsonObject["offers"] && jsonObject["offers"].length > 0) {
        for (const offer of jsonObject["offers"]) {
            if (offer["product_offers"] && offer["product_offers"].length > 0) {
                console.log("Pushing for : ", offer["product_type"]);
                allOffers.push(...offer["product_offers"]);
            }
        }
    }

    obfuscateLenderOfferValues(allOffers);
    return jsonObject;
}

export const obfuscateLenderOfferValues = (offers: Offer[]) => {
    if (offers && offers.length > 0) {

        // console.log("Obfuscating : ", offers.length);

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

                    offer.product_attributes = firstCC.product_attributes;
                }
            }
        }
    }

    return offers;
}
