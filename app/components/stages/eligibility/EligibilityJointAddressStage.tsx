'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, InputType} from '../../InputField';
import {
    EligibilityAddressPayload,
    EligibilityStageState,
    useEligibilityStageStore
} from "@/app/state/eligibility_stages";
import {EligibilityStageForm} from "@/app/components/stages/eligibility/EligibilityStageForm";
import {useGeneralStageStore} from "@/app/state/general_stages";

interface Props {
    title: string,
    addressPayloadName: keyof EligibilityStageState,
    addressPayloadSetter: keyof EligibilityStageState,
}

const EligibilityJointAddressStage = ({title, addressPayloadName, addressPayloadSetter}: Props) => {

    const savedStage = useEligibilityStageStore((state) => state.currentStage);
    const savedPanelType = useEligibilityStageStore((state) => state.panelType)

    const savedFlat = useEligibilityStageStore((state) => (state[addressPayloadName] as EligibilityAddressPayload)?.flat);
    const savedHouseNumber = useEligibilityStageStore((state) => (state[addressPayloadName] as EligibilityAddressPayload)?.house_number);
    const savedHouseName = useEligibilityStageStore((state) => (state[addressPayloadName] as EligibilityAddressPayload)?.house_name);
    const savedStreet = useEligibilityStageStore((state) => (state[addressPayloadName] as EligibilityAddressPayload)?.street);
    const savedPostTown = useEligibilityStageStore((state) => (state[addressPayloadName] as EligibilityAddressPayload)?.posttown);
    const savedLocality = useEligibilityStageStore((state) => (state[addressPayloadName] as EligibilityAddressPayload)?.locality);
    const savedCountry = useEligibilityStageStore((state) => (state[addressPayloadName] as EligibilityAddressPayload)?.country);
    const savedPostcode = useEligibilityStageStore((state) => (state[addressPayloadName] as EligibilityAddressPayload)?.postcode);

    const savedYearsLived = useEligibilityStageStore((state) => (state[addressPayloadName] as EligibilityAddressPayload)?.years_lived);
    const savedMonthsLived = useEligibilityStageStore((state) => (state[addressPayloadName] as EligibilityAddressPayload)?.months_lived);

    const setCurrentStage = useEligibilityStageStore((state) => state.setCurrentStage)

    const setPayload = useEligibilityStageStore((state) => state[addressPayloadSetter] as Function)

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState({} as any);

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<EligibilityAddressPayload>({
        flat: savedFlat,
        house_number: savedHouseNumber ?? "400",
        house_name: savedHouseName,
        street: savedStreet ?? "Old Durham Rd",
        posttown: savedPostTown ?? "Gateshead",
        locality: savedLocality ?? "Tyne & Wear",
        country: savedCountry || "UK",
        postcode: savedPostcode ?? "NE9 5DQ",
        years_lived: savedYearsLived ?? 3,
        months_lived: savedMonthsLived ?? 11,
    })

    const fields: Field[] = [
        {
            name: "flat",
            title: "Flat Name/Number"
        },
        {
            name: "house_number",
            title: "House Number"
        },
        {
            name: "house_name",
            title: "House Name"
        },
        {
            name: "street",
            title: "Street name",
            required: true
        },
        {
            name: "posttown",
            title: "Town/City",
            required: true
        },
        {
            name: "locality",
            title: "Locality"
        },
        {
            name: "country",
            title: "Country",
            required: true
        },
        {
            name: "postcode",
            title: "Post code",
            required: true
        },

        {
            name: "years_lived",
            title: "Years lived at this address",
            type: InputType.Number,
            required: true
        },
        {
            name: "months_lived",
            title: "Months lived at this address",
            type: InputType.Number,
            required: true
        },
    ]


    const validate = (formData: EligibilityAddressPayload) => {
        const formErrors = {} as any

        if (!enableValidation) {
            return formErrors;
        }

        if (!formData.street) {
            formErrors.street = "Please provide your street name."
        }

        if (!formData.country) {
            formErrors.country = "Please provide the country your address is located within."
        }

        if (!formData?.postcode || formData?.postcode?.length > 8) {
            formErrors.postcode = "Please provide a valid postcode."
        }

        if (isNaN(formData?.years_lived) || formData?.years_lived > 60) {
            formErrors.years_lived = "Please provide the number of years you have lived at this address. It cannot exceed 60 years."
        }

        if (isNaN(formData?.months_lived)) {
            formErrors.months_lived = "Please provide the number of months you have lived at this address."
        }

        if (!formData.flat && !formData.house_number && !formData.house_name) {
            formErrors.house_name = "Please provide either a flat number/name, a house number or a house name."
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
            setCurrentStage(savedStage + 1);
        }

        setPayload({...formData})
    }, [formData, isSubmitted, errors])

    const inputFields = createInputFields(fields, formData, errors, setFormData)

    return (
        <EligibilityStageForm title={title ?? "Your current address"} canGoBack={true} inputFields={inputFields}
                              submitFormData={submitFormData}/>
    )
}
export default EligibilityJointAddressStage
