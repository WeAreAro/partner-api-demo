'use client';

import { BankDetailsPayload, useStageStore } from '@/app/state/stages';
import React, { useEffect, useState } from 'react';
import { InputType, createInputFields} from '../InputField';
import { StageForm } from '../StageForm';

const BankDetailsStage = () => {

    const savedStage = useStageStore((state) => state.currentStage);

    const savedYearsAtBank = useStageStore((state) => state.bankDetailsPayload?.years_at_bank);
    const savedMonthsAtBank = useStageStore((state) => state.bankDetailsPayload?.months_at_bank);

    const setCurrentStage = useStageStore((state) => state.setCurrentStage)
    const setPayload = useStageStore((state) => state.setBankDetailsPayload)

    const [formData, setFormData] = useState<BankDetailsPayload>({
        years_at_bank: savedYearsAtBank ?? 12,
        months_at_bank: savedMonthsAtBank ?? 2,
    })

    const [errors, setErrors] = useState({} as any);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const fields = [
        {
            name: "years_at_bank",
            title: "Years with your current bank",
            type: InputType.Number
        },
        {
            name: "months_at_bank",
            title: "Remainder months with your current bank",
            type: InputType.Number
        },
    ]


    const validate = (formData: BankDetailsPayload) => {
        const formErrors = {} as any

        if (isNaN(formData.years_at_bank)) {
            formErrors.years_at_bank = "Please provide a valid number."
        }

        if (isNaN(formData.months_at_bank)) {
            formErrors.months_at_bank = "Please provide a valid number."
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
        setPayload({ ...formData })
    }, [formData, isSubmitted, errors])

    const inputFields = createInputFields(fields, formData, errors, setFormData)

    return (
        <StageForm title={"Bank Details"} canGoBack={true} inputFields={inputFields} submitFormData={submitFormData} />
    )
}
export default BankDetailsStage
