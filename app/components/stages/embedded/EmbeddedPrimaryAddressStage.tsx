'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, InputType} from '../../InputField';
import {
    EmbeddedAddressPayload,
    EmbeddedCardFormStage,
    EmbeddedLoanFormStage,
    EmbeddedPanelType,
    EmbeddedSecuredFormStage,
    EmbeddedStageState,
    useEmbeddedStageStore
} from "@/app/state/embedded_stages";
import {EmbeddedStageForm} from "@/app/components/stages/embedded/EmbeddedStageForm";

interface Props {
    title: string,
    addressPayloadName: keyof EmbeddedStageState,
    addressPayloadSetter: keyof EmbeddedStageState,
}

const EmbeddedPrimaryAddressStage = ({title, addressPayloadName, addressPayloadSetter}: Props) => {

    const savedStage = useEmbeddedStageStore((state) => state.currentStage);
    const savedPanelType = useEmbeddedStageStore((state) => state.panelType)

    const savedFlat = useEmbeddedStageStore((state) => (state[addressPayloadName] as EmbeddedAddressPayload)?.flat);
    const savedHouseNumber = useEmbeddedStageStore((state) => (state[addressPayloadName] as EmbeddedAddressPayload)?.house_number);
    const savedHouseName = useEmbeddedStageStore((state) => (state[addressPayloadName] as EmbeddedAddressPayload)?.house_name);
    const savedStreet = useEmbeddedStageStore((state) => (state[addressPayloadName] as EmbeddedAddressPayload)?.street);
    const savedPostTown = useEmbeddedStageStore((state) => (state[addressPayloadName] as EmbeddedAddressPayload)?.posttown);
    const savedLocality = useEmbeddedStageStore((state) => (state[addressPayloadName] as EmbeddedAddressPayload)?.locality);
    const savedCountry = useEmbeddedStageStore((state) => (state[addressPayloadName] as EmbeddedAddressPayload)?.country);
    const savedPostcode = useEmbeddedStageStore((state) => (state[addressPayloadName] as EmbeddedAddressPayload)?.postcode);

    const savedYearsLived = useEmbeddedStageStore((state) => (state[addressPayloadName] as EmbeddedAddressPayload)?.years_lived);
    const savedMonthsLived = useEmbeddedStageStore((state) => (state[addressPayloadName] as EmbeddedAddressPayload)?.months_lived);

    const savedYearsLivedAtFirstPreviousAddress = useEmbeddedStageStore((state) => state.firstPreviousAddressPayload?.years_lived) ?? 0;
    const savedMonthsLivedAtFirstPreviousAddress = useEmbeddedStageStore((state) => state.firstPreviousAddressPayload?.months_lived) ?? 0;

    const savedYearsLivedAtSecondPreviousAddress = useEmbeddedStageStore((state) => state.secondPreviousAddressPayload?.years_lived) ?? 0;
    const savedMonthsLivedAtSecondPreviousAddress = useEmbeddedStageStore((state) => state.secondPreviousAddressPayload?.months_lived) ?? 0;

    const firstPreviousAddressTotalMonths = (savedYearsLivedAtFirstPreviousAddress * 12) + savedMonthsLivedAtFirstPreviousAddress
    const secondPreviousAddressTotalMonths = (savedYearsLivedAtSecondPreviousAddress * 12) + savedMonthsLivedAtSecondPreviousAddress

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)
    const setPreviousStage = useEmbeddedStageStore((state) => state.setPreviousStage)

    const setPayload = useEmbeddedStageStore((state) => state[addressPayloadSetter] as Function)

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState({} as any);

    const [formData, setFormData] = useState<EmbeddedAddressPayload>({
        flat: savedFlat,
        house_number: savedHouseNumber ?? "400",
        house_name: savedHouseName,
        street: savedStreet ?? "Old Durham Rd",
        posttown: savedPostTown ?? "Gateshead",
        locality: savedLocality ?? "Tyne & Wear",
        country: savedCountry || "UK",
        postcode: savedPostcode ?? "NE9 5DQ",
        years_lived: savedYearsLived ?? 4,
        months_lived: savedMonthsLived ?? 5,
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


    const validate = (formData: EmbeddedAddressPayload) => {
        const formErrors = {} as any

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


    const shouldShowAnotherAddressStage = () => {
        const currentTotalMonths = (formData.years_lived * 12) + formData.months_lived

        return ((currentTotalMonths + firstPreviousAddressTotalMonths) < 36)
    }


    const submitFormData = (e: { preventDefault: () => void; }) => {

        e.preventDefault()
        setErrors(validate(formData))
        setIsSubmitted(true)
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitted) {

            // We should also show the stage if it's already been filled in, in case they want to go backwards and then forwards.
            setPreviousStage(savedStage);

            console.log("Saved stage: ", savedStage);

            let currentIdx = 0;
            let fpaIdx = 0;
            let spaIdx = 0;

            // Determine the indexes that we care about
            if (savedPanelType === EmbeddedPanelType.ALL) {
                currentIdx = EmbeddedLoanFormStage.CurrentAddressStage;
                fpaIdx = EmbeddedLoanFormStage.FirstPreviousAddressStage;
                spaIdx = EmbeddedLoanFormStage.SecondPreviousAddressStage;
            } else if (savedPanelType === EmbeddedPanelType.CREDITCARD) {
                currentIdx = EmbeddedCardFormStage.CurrentAddressStage;
                fpaIdx = EmbeddedCardFormStage.FirstPreviousAddressStage;
                spaIdx = EmbeddedCardFormStage.SecondPreviousAddressStage;
            } else if (savedPanelType === EmbeddedPanelType.SECURED) {
                currentIdx = EmbeddedSecuredFormStage.CurrentAddressStage;
                fpaIdx = EmbeddedSecuredFormStage.FirstPreviousAddressStage;
                spaIdx = EmbeddedSecuredFormStage.SecondPreviousAddressStage;
            }

            console.log("Address - saved stage: ", savedStage, "current : ", currentIdx, "fpa: ", fpaIdx, "spa: ", spaIdx);

            switch (savedStage) {
                case currentIdx:
                    if (firstPreviousAddressTotalMonths > 0 || shouldShowAnotherAddressStage()) {
                        setCurrentStage(fpaIdx)
                    } else {
                        setCurrentStage(spaIdx + 1)
                    }
                    break;
                case fpaIdx:
                    if (secondPreviousAddressTotalMonths > 0 || shouldShowAnotherAddressStage()) {
                        setCurrentStage(spaIdx)
                    } else {
                        setCurrentStage(spaIdx + 1)
                    }
                    break;
                default:
                    setCurrentStage(spaIdx + 1)
                    break;
            }
        }

        setPayload({...formData})
    }, [formData, isSubmitted, errors])

    const inputFields = createInputFields(fields, formData, errors, setFormData)

    return (
        <EmbeddedStageForm title={title ?? "Your current address"} canGoBack={true} inputFields={inputFields}
                           submitFormData={submitFormData}/>
    )
}
export default EmbeddedPrimaryAddressStage
