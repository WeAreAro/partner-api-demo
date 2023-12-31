'use client';

import { ExpenditurePayload, useStageStore } from '@/app/state/stages';
import React, { useEffect, useState } from 'react';
import { InputType, createInputFields } from '../InputField';
import { StageForm } from '../StageForm';

const ExpenditureStage = () => {

    const savedStage = useStageStore((state) => state.currentStage);

    const savedMonthlyRent = useStageStore((state) => state.expenditurePayload?.monthly_mortgage_rent);
    const savedMonthlyMortgageRentShare = useStageStore((state) => state.expenditurePayload?.monthly_mortgage_rent_share);

    const setCurrentStage = useStageStore((state) => state.setCurrentStage)
    const setPayload = useStageStore((state) => state.setExpenditurePayload)

    const [formData, setFormData] = useState<ExpenditurePayload>({
        monthly_mortgage_rent: savedMonthlyRent ?? 850,
        monthly_mortgage_rent_share: savedMonthlyMortgageRentShare,
    })

    const fields = [
        {
            name: "monthly_mortgage_rent",
            title: "Your monthly mortgage or rent payment.",
            type: InputType.Number
        },
        {
            name: "monthly_mortgage_rent_share",
            title: "Your share of a shared mortgage/rent payment.",
            type: InputType.Number
        },
    ]

    const [errors, setErrors] = useState({} as any);

    const validate = (formData: ExpenditurePayload) => {
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
        setPayload({ ...formData })
    }, [formData, isSubmitted, errors])

    const inputFields = createInputFields(fields, formData, errors, setFormData)

    return (
        <StageForm title={"Expenditure Details"} canGoBack={true} inputFields={inputFields} submitFormData={submitFormData} />
    )
}
export default ExpenditureStage
