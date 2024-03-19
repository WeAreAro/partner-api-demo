'use client';

import {RedirectExpenditurePayload, useRedirectStageStore} from '@/app/state/redirect_stages';
import React, {useEffect, useState} from 'react';
import {createInputFields, Field, InputType} from '../../InputField';
import {StageForm} from './StageForm';
import {useGeneralStageStore} from "@/app/state/general_stages";
import {checkRequiredFields} from "@/app/utils/ValidationUtils";

const ExpenditureStage = () => {

    const savedStage = useRedirectStageStore((state) => state.currentStage);

    const savedMonthlyRent = useRedirectStageStore((state) => state.expenditurePayload?.monthly_mortgage_rent);
    const savedMonthlyMortgageRentShare = useRedirectStageStore((state) => state.expenditurePayload?.monthly_mortgage_rent_share);

    const setCurrentStage = useRedirectStageStore((state) => state.setCurrentStage)
    const setPayload = useRedirectStageStore((state) => state.setExpenditurePayload)

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<RedirectExpenditurePayload>({
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

    const validate = (formData: RedirectExpenditurePayload) => {
        let formErrors = {} as any

        if (!enableValidation) {
            return formErrors;
        }

        const missingRequiredFields = checkRequiredFields(formData, fields);
        if (Object.keys(missingRequiredFields).length > 0) {
            formErrors = {...formErrors, ...missingRequiredFields}
        }

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
        <StageForm title={"Expenditure Details"} canGoBack={true} inputFields={inputFields}
                   submitFormData={submitFormData}/>
    )
}
export default ExpenditureStage
