export const responseHasOffers = (allOffersResponseObject): boolean => {

    if (allOffersResponseObject) {

        console.log(allOffersResponseObject);

        const offerTypes = ["unsecured_offers", "credit_card_offers", "auto_finance_offers", "secured_offers"]

        for (const offerType in offerTypes) {

            const offerTypeStr = offerTypes[offerType];

            if (allOffersResponseObject[offerTypeStr] !== undefined && allOffersResponseObject[offerTypeStr].length > 0) {
                console.log("Found offers for : ", offerType);
                return true;
            }
        }

    }

    console.log("No offers...")
    return false;
}