'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, InputType} from '../../InputField';
import {EligibilityExpenditurePayload, useEligibilityStageStore} from "@/app/state/eligibility_stages";
import {EligibilityStageForm} from "@/app/components/stages/eligibility/EligibilityStageForm";
import {useGeneralStageStore} from "@/app/state/general_stages";

const EligibilityExpenditureStage = () => {

    const savedStage = useEligibilityStageStore((state) => state.currentStage);

    const savedMonthlyRent = useEligibilityStageStore((state) => state.expenditurePayload?.monthly_mortgage_rent);
    const savedMonthlyMortgageRentShare = useEligibilityStageStore((state) => state.expenditurePayload?.monthly_mortgage_rent_share);

    const setCurrentStage = useEligibilityStageStore((state) => state.setCurrentStage)
    const setPayload = useEligibilityStageStore((state) => state.setExpenditurePayload)

    const [formData, setFormData] = useState<EligibilityExpenditurePayload>({
        monthly_mortgage_rent: savedMonthlyRent ?? 850,
        monthly_mortgage_rent_share: savedMonthlyMortgageRentShare,
    })

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

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

    const validate = (formData: EligibilityExpenditurePayload) => {
        const formErrors = {} as any

        if (!enableValidation) {
            return formErrors;
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
        <EligibilityStageForm title={"Expenditure Details"} canGoBack={true} inputFields={inputFields}
                              submitFormData={submitFormData}/>
    )
}
export default EligibilityExpenditureStage
