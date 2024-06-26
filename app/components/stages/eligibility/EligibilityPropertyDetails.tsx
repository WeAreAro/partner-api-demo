'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {EligibilityPropertyDetailsPayload, useEligibilityStageStore} from "@/app/state/eligibility_stages";
import {PropertyType, YesNoValue} from "@/app/state/enum/Common";
import {EligibilityStageForm} from "@/app/components/stages/eligibility/EligibilityStageForm";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {checkRequiredFields} from "@/app/utils/ValidationUtils";

const EligibilityPropertyDetails = () => {

    const savedStage = useEligibilityStageStore((state) => state.currentStage);

    const savedPropertyDetailsPayload = useEligibilityStageStore((state) => state.propertyDetailsPayload) as EligibilityPropertyDetailsPayload;

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

    const setCurrentStage = useEligibilityStageStore((state) => state.setCurrentStage)

    const setPayload = useEligibilityStageStore((state) => state.setPropertyDetailsPayload)

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<EligibilityPropertyDetailsPayload>({
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

    const validate = (formData: EligibilityPropertyDetailsPayload) => {
        let formErrors = {} as any

        if (!enableValidation) {
            return formErrors;
        }

        const missingRequiredFields = checkRequiredFields(formData, fields);
        if (Object.keys(missingRequiredFields).length > 0) {
            formErrors = {...formErrors, ...missingRequiredFields}
        }

        if (isNaN(formData.estimated_value) || formData?.estimated_value < 0) {
            formErrors.estimated_value = "Please provide an estimated value in GBP. E.g 100000."
        }

        if (isNaN(formData.mortgage_outstanding) || formData?.mortgage_outstanding < 0) {
            formErrors.mortgage_outstanding = "Please provide an outstanding mortgage value in GBP. E.g 100000."
        }

        if (isNaN(formData.council_discount_amount) || formData?.council_discount_amount < 0) {
            formErrors.mortgage_outstanding = "Please provide a council discount amount value in GBP. E.g 10000."
        }

        const dobRegex = new RegExp(/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g);
        if (!formData.purchase_date || !dobRegex.test(formData.purchase_date)) {
            formErrors.purchase_date = "Purchase Date is required in the format: dd/MM/yyyy"
        }

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
        <EligibilityStageForm title="Property Details" canGoBack={true} inputFields={inputFields}
                              submitFormData={submitFormData}/>
    )
}
export default EligibilityPropertyDetails
