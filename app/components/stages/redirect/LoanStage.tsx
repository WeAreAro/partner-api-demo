'use client';

import {RedirectLoanPayload, useRedirectStageStore} from '@/app/state/redirect_stages';
import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {StageForm} from './StageForm';
import {LoanPurpose} from "@/app/state/enum/Common";
import {useGeneralStageStore} from "@/app/state/general_stages";

const LoanStage = () => {

    const savedStage = useRedirectStageStore((state) => state.currentStage);

    const savedLoanPayload = useRedirectStageStore((state) => state.quotePayload) as RedirectLoanPayload;

    const savedLoanAmount = savedLoanPayload.loan_amount;
    const savedLoanTerm = savedLoanPayload.loan_term;
    const savedLoanPurpose = savedLoanPayload.loan_purpose;

    const setCurrentStage = useRedirectStageStore((state) => state.setCurrentStage)

    const setPayload = useRedirectStageStore((state) => state.setQuotePayload)

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<RedirectLoanPayload>({
        loan_amount: savedLoanAmount ?? 10000,
        loan_term: savedLoanTerm ?? 24,
        loan_purpose: savedLoanPurpose ?? LoanPurpose['Debt Consolidation']
    })

    const [errors, setErrors] = useState({} as any);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const fields: Field[] = [
        {
            name: "loan_amount",
            title: "Loan Amount",
            type: InputType.Number,
            required: true
        },
        {
            name: "loan_term",
            title: "Loan Term (months)",
            type: InputType.Number,
            required: true
        },
        {
            name: "loan_purpose",
            title: "Loan Purpose",
            type: InputType.Enum,
            possibleValues: getPossibleValues(LoanPurpose),
            required: true
        },
    ]

    const validate = (formData: RedirectLoanPayload) => {
        const formErrors = {} as any

        if (!enableValidation) {
            return formErrors;
        }

        if (isNaN(formData.loan_amount)) {
            formErrors.loan_amount = "Please provide a loan amount denoted in GBP. E.g 10000."
        }

        if (formData?.loan_amount < 500 || formData?.loan_amount > 100000) {
            formErrors.loan_amount = "Please provide a loan amount between 500 - 100000"
        }

        if (isNaN(formData.loan_term)) {
            formErrors.loan_term = "Please provide a loan term denoted in months. E.g 36."
        }

        if (formData?.loan_term < 12 || formData?.loan_term > 360) {
            formErrors.loan_term = "Please provide a loan term amount between 12 - 360 months."
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
        <StageForm title="Loan Details" canGoBack={true} inputFields={inputFields} submitFormData={submitFormData}/>
    )
}
export default LoanStage
