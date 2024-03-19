'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {YesNoValue} from "@/app/state/enum/Common";
import {EligibilityStageForm} from "@/app/components/stages/eligibility/EligibilityStageForm";
import {EligibilityCardPayload, useEligibilityStageStore} from "@/app/state/eligibility_stages";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {checkRequiredFields} from "@/app/utils/ValidationUtils";

const EligibilityCardStage = () => {

    const savedStage = useEligibilityStageStore((state) => state.currentStage);

    const savedCardQuote = useEligibilityStageStore((state) => state.cardPayload) as EligibilityCardPayload;

    const savedCashAdvance = savedCardQuote?.cash_advance;
    const savedBalanceTransfer = savedCardQuote?.balance_transfer;
    const savedBalanceTransferAmount = savedCardQuote?.balance_transfer_amount;

    const setCurrentStage = useEligibilityStageStore((state) => state.setCurrentStage)

    const setPayload = useEligibilityStageStore((state) => state.setCardPayload)

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<EligibilityCardPayload>({
        cash_advance: savedCashAdvance ?? YesNoValue.Yes,
        balance_transfer: savedBalanceTransfer ?? YesNoValue.Yes,
        balance_transfer_amount: savedBalanceTransferAmount ?? 4000
    })

    const [errors, setErrors] = useState({} as any);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const fields: Field[] = [
        {
            name: "cash_advance",
            title: "Do you need a cash advance?",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue),
            required: true
        },
        {
            name: "balance_transfer",
            title: "Do you want a balance transfer?",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue),
            required: true
        },
        {
            name: "balance_transfer_amount",
            title: "What is the balance to transfer?",
            type: InputType.Number,
            required: true
        },
    ]

    const validate = (formData: EligibilityCardPayload) => {
        let formErrors = {} as any

        if (!enableValidation) {
            return formErrors;
        }

        const missingRequiredFields = checkRequiredFields(formData, fields);
        if (Object.keys(missingRequiredFields).length > 0) {
            formErrors = {...formErrors, ...missingRequiredFields}
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
        <EligibilityStageForm title="Credit Card details" canGoBack={true} inputFields={inputFields}
                              submitFormData={submitFormData}/>
    )
}
export default EligibilityCardStage
