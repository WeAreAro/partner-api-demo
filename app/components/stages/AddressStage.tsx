'use client';

import {
    AddressPayload,
    CardFormStage,
    FormType,
    StageState,
    UnsecuredLoanFormStage,
    useStageStore
} from '@/app/state/stages';
import React, {useEffect, useState} from 'react';
import {createInputFields, InputType} from '../InputField';
import {StageForm} from '../StageForm';

interface Props {
    title: string,
    addressPayloadName: keyof StageState,
    addressPayloadSetter: keyof StageState,
}

const AddressStage = ({title, addressPayloadName, addressPayloadSetter}: Props) => {

    const savedFormType = useStageStore((state) => state.formType)

    const savedStage = useStageStore((state) => state.currentStage);

    const savedFlat = useStageStore((state) => (state[addressPayloadName] as AddressPayload)?.flat);
    const savedHouseNumber = useStageStore((state) => (state[addressPayloadName] as AddressPayload)?.house_number);
    const savedHouseName = useStageStore((state) => (state[addressPayloadName] as AddressPayload)?.house_name);
    const savedStreet = useStageStore((state) => (state[addressPayloadName] as AddressPayload)?.street);
    const savedPostTown = useStageStore((state) => (state[addressPayloadName] as AddressPayload)?.posttown);
    const savedLocality = useStageStore((state) => (state[addressPayloadName] as AddressPayload)?.locality);
    const savedCountry = useStageStore((state) => (state[addressPayloadName] as AddressPayload)?.country);
    const savedPostcode = useStageStore((state) => (state[addressPayloadName] as AddressPayload)?.postcode);

    const savedYearsLived = useStageStore((state) => (state[addressPayloadName] as AddressPayload)?.years_lived);
    const savedMonthsLived = useStageStore((state) => (state[addressPayloadName] as AddressPayload)?.months_lived);

    const savedYearsLivedAtFirstPreviousAddress = useStageStore((state) => state.firstPreviousAddressPayload?.years_lived) ?? 0;
    const savedMonthsLivedAtFirstPreviousAddress = useStageStore((state) => state.firstPreviousAddressPayload?.months_lived) ?? 0;

    const savedYearsLivedAtSecondPreviousAddress = useStageStore((state) => state.secondPreviousAddressPayload?.years_lived) ?? 0;
    const savedMonthsLivedAtSecondPreviousAddress = useStageStore((state) => state.secondPreviousAddressPayload?.months_lived) ?? 0;


    const firstPreviousAddressTotalMonths = (savedYearsLivedAtFirstPreviousAddress * 12) + savedMonthsLivedAtFirstPreviousAddress
    const secondPreviousAddressTotalMonths = (savedYearsLivedAtSecondPreviousAddress * 12) + savedMonthsLivedAtSecondPreviousAddress

    const setCurrentStage = useStageStore((state) => state.setCurrentStage)
    const setPreviousStage = useStageStore((state) => state.setPreviousStage)

    const setPayload = useStageStore((state) => state[addressPayloadSetter] as Function)

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState({} as any);

    const [formData, setFormData] = useState<AddressPayload>({
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

    const fields = [
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
            title: "Street name"
        },
        {
            name: "posttown",
            title: "Town/City",
        },
        {
            name: "locality",
            title: "Locality"
        },
        {
            name: "country",
            title: "Country"
        },
        {
            name: "postcode",
            title: "Post code"
        },

        {
            name: "years_lived",
            title: "Years lived at this address",
            type: InputType.Number
        },
        {
            name: "months_lived",
            title: "Months lived at this address",
            type: InputType.Number
        },
    ]


    const validate = (formData: AddressPayload) => {
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
            setPreviousStage(savedStage)

            if (savedFormType === FormType.UNSECURED_LOAN) {
                switch (savedStage) {
                    case UnsecuredLoanFormStage.CurrentAddressStage:
                        if (firstPreviousAddressTotalMonths > 0 || shouldShowAnotherAddressStage()) {
                            setCurrentStage(UnsecuredLoanFormStage.FirstPreviousAddressStage)
                        } else {
                            setCurrentStage(UnsecuredLoanFormStage.SecondPreviousAddressStage + 1)
                        }
                        break;
                    case UnsecuredLoanFormStage.FirstPreviousAddressStage:
                        if (secondPreviousAddressTotalMonths > 0 || shouldShowAnotherAddressStage()) {
                            setCurrentStage(UnsecuredLoanFormStage.SecondPreviousAddressStage)
                        } else {
                            setCurrentStage(UnsecuredLoanFormStage.SecondPreviousAddressStage + 1)
                        }
                        break;
                    default:
                        setCurrentStage(UnsecuredLoanFormStage.SecondPreviousAddressStage + 1)
                        break;
                }
            } else if (savedFormType === FormType.CARD) {
                if (firstPreviousAddressTotalMonths > 0 || shouldShowAnotherAddressStage()) {
                    setCurrentStage(CardFormStage.FirstPreviousAddressStage)
                } else {
                    setCurrentStage(CardFormStage.FirstPreviousAddressStage + 1)
                }
            }
        }

        setPayload({...formData})
    }, [formData, isSubmitted, errors])

    const inputFields = createInputFields(fields, formData, errors, setFormData)

    return (
        <StageForm title={title ?? "Your current address"} canGoBack={true} inputFields={inputFields}
                   submitFormData={submitFormData}/>
    )
}
export default AddressStage
