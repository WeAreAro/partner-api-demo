'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, InputType} from '../../InputField';
import {EmbeddedExpenditurePayload, useEmbeddedStageStore} from "@/app/state/embedded_stages";
import {EmbeddedStageForm} from "@/app/components/stages/embedded/EmbeddedStageForm";

const EmbeddedExpenditureStage = () => {

    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const savedMonthlyRent = useEmbeddedStageStore((state) => state.expenditurePayload?.monthly_mortgage_rent);
    const savedMonthlyMortgageRentShare = useEmbeddedStageStore((state) => state.expenditurePayload?.monthly_mortgage_rent_share);

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)
    const setPayload = useEmbeddedStageStore((state) => state.setExpenditurePayload)

    const [formData, setFormData] = useState<EmbeddedExpenditurePayload>({
        monthly_mortgage_rent: savedMonthlyRent ?? 850,
        monthly_mortgage_rent_share: savedMonthlyMortgageRentShare,
    })

    const fields: Field[] = [
        {
            name: "monthly_mortgage_rent",
            title: "Your monthly mortgage or rent payment.",
            type: InputType.Number,
            required: true
        },
        {
            name: "monthly_mortgage_rent_share",
            title: "Your share of a shared mortgage/rent payment.",
            type: InputType.Number
        },
    ]

    const [errors, setErrors] = useState({} as any);

    const validate = (formData: EmbeddedExpenditurePayload) => {
        const formErrors = {} as any

        if (isNaN(formData.monthly_mortgage_rent) || formData?.monthly_mortgage_rent > 1000000) {
            formErrors.monthly_mortgage_rent = "Please provide a valid number of £."
        }

        return formErrors
    }

    const [isSubmitted, setIsSubmitted] = useState(false)

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
        <EmbeddedStageForm title={"Expenditure Details"} canGoBack={true} inputFields={inputFields}
                           submitFormData={submitFormData}/>
    )
}
export default EmbeddedExpenditureStage