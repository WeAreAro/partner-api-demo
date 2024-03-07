'use client';

import {CardPayload, useStageStore, YesNoValue} from '@/app/state/stages';
import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../InputField';
import {StageForm} from '../StageForm';

const CardStage = () => {

    const savedStage = useStageStore((state) => state.currentStage);

    const savedCardQuote = useStageStore((state) => state.quotePayload) as CardPayload;

    const savedCashAdvance = savedCardQuote?.cash_advance;
    const savedBalanceTransfer = savedCardQuote?.balance_transfer;
    const savedBalanceToTransfer = savedCardQuote?.balance_to_transfer;

    const setCurrentStage = useStageStore((state) => state.setCurrentStage)

    const setPayload = useStageStore((state) => state.setQuotePayload)

    const [formData, setFormData] = useState<CardPayload>({
        cash_advance: savedCashAdvance ?? YesNoValue.Yes,
        balance_transfer: savedBalanceTransfer ?? YesNoValue.Yes,
        balance_to_transfer: savedBalanceToTransfer ?? 4000
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
            name: "balance_to_transfer",
            title: "What is the balance to transfer?",
            type: InputType.Number,
            required: true
        },
    ]

    const validate = (formData: CardPayload) => {
        const formErrors = {} as any
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
        <StageForm title="Quote details" canGoBack={false} inputFields={inputFields} submitFormData={submitFormData}/>
    )
}
export default CardStage
