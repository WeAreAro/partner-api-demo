'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {EmbeddedPropertyDetailsPayload, useEmbeddedStageStore} from "@/app/state/embedded_stages";
import {PropertyType, YesNoValue} from "@/app/state/enum/Common";
import {EmbeddedStageForm} from "@/app/components/stages/embedded/EmbeddedStageForm";

const EmbeddedPropertyDetails = () => {

    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const savedPropertyDetailsPayload = useEmbeddedStageStore((state) => state.propertyDetailsPayload) as EmbeddedPropertyDetailsPayload;

    const savedEstimatedValue = savedPropertyDetailsPayload.estimated_value;
    const savedMortgageOutstanding = savedPropertyDetailsPayload.mortgage_outstanding;
    const savedMortgageLender = savedPropertyDetailsPayload.mortgage_lender;
    const savedPurchaseDate = savedPropertyDetailsPayload.purchase_date;
    const savedHasOtherOwners = savedPropertyDetailsPayload.has_other_owners;
    const savedPropertyType = savedPropertyDetailsPayload.property_type;
    const savedNumberOfBedrooms = savedPropertyDetailsPayload.number_of_bedrooms;
    const savedNumberOfFloorsInBuilding = savedPropertyDetailsPayload.number_of_floors_in_building;
    const savedCouncilPurchase = savedPropertyDetailsPayload.council_purchase;
    const savedPreviouslyCouncil = savedPropertyDetailsPayload.previously_council;
    const savedRecentlyCouncil = savedPropertyDetailsPayload.recently_council;
    const savedCouncilDiscountAmount = savedPropertyDetailsPayload.council_discount_amount;
    const savedHelpToBuyScheme = savedPropertyDetailsPayload.help_to_buy_scheme;
    const savedHelpToBuySettled = savedPropertyDetailsPayload.help_to_buy_settled;
    const savedHasOtherProperties = savedPropertyDetailsPayload.has_other_properties;

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)

    const setPayload = useEmbeddedStageStore((state) => state.setPropertyDetailsPayload)

    const [formData, setFormData] = useState<EmbeddedPropertyDetailsPayload>({
        estimated_value: savedEstimatedValue ?? 250000,
        mortgage_outstanding: savedMortgageOutstanding ?? 175000,
        mortgage_lender: savedMortgageLender ?? "Nationwide Building Society",
        purchase_date: savedPurchaseDate ?? "01/01/2022",
        has_other_owners: savedHasOtherOwners ?? YesNoValue.No,
        property_type: savedPropertyType ?? PropertyType.Detached,
        number_of_bedrooms: savedNumberOfBedrooms ?? 3,
        number_of_floors_in_building: savedNumberOfFloorsInBuilding ?? 2,
        council_purchase: savedCouncilPurchase ?? YesNoValue.No,
        previously_council: savedPreviouslyCouncil ?? YesNoValue.No,
        recently_council: savedRecentlyCouncil ?? YesNoValue.No,
        council_discount_amount: savedCouncilDiscountAmount ?? 0,
        help_to_buy_scheme: savedHelpToBuyScheme ?? YesNoValue.No,
        help_to_buy_settled: savedHelpToBuySettled ?? YesNoValue.No,
        has_other_properties: savedHasOtherProperties ?? YesNoValue.No
    })

    const [errors, setErrors] = useState({} as any);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const fields: Field[] = [
        {
            name: "estimated_value",
            title: "Estimated Value",
            type: InputType.Number,
            required: true
        },
        {
            name: "mortgage_outstanding",
            title: "Mortgage Outstanding",
            type: InputType.Number,
            required: true
        },
        {
            name: "purchase_date",
            title: "Purchase Date",
            required: true
        },
        {
            name: "has_other_owners",
            title: "Has Other Owners",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
        {
            name: "property_type",
            title: "Property Type",
            type: InputType.Enum,
            possibleValues: getPossibleValues(PropertyType)
        },
        {
            name: "number_of_bedrooms",
            title: "Number of Bedrooms",
            type: InputType.Number
        },
        {
            name: "number_of_floors_in_building",
            title: "Number of Floors",
            type: InputType.Number
        },
        {
            name: "council_purchase",
            title: "Council Purchase",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
        {
            name: "previously_council",
            title: "Previously Council",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
        {
            name: "recently_council",
            title: "Recently Council",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
        {
            name: "council_discount_amount",
            title: "Council Discount Amount",
            type: InputType.Number
        },
        {
            name: "help_to_buy_scheme",
            title: "Help To Buy Scheme",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
        {
            name: "help_to_buy_settled",
            title: "Help To Buy Loan Settled",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
        {
            name: "has_other_properties",
            title: "Have Other Properties",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
    ]

    const validate = (formData: EmbeddedPropertyDetailsPayload) => {
        const formErrors = {} as any

        return formErrors
    }

    const submitFormData = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setErrors(validate(formData))
        setIsSubmitted(true)
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitted) {
            setCurrentStage(savedStage + 1)
        }
        setPayload({...formData})
    }, [formData, isSubmitted, errors])

    const inputFields = createInputFields(fields, formData, errors, setFormData)

    return (
        <EmbeddedStageForm title="Property Details" canGoBack={true} inputFields={inputFields}
                           submitFormData={submitFormData}/>
    )
}
export default EmbeddedPropertyDetails
