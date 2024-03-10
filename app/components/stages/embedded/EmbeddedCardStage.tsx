'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {YesNoValue} from "@/app/state/enum/Common";
import {EmbeddedStageForm} from "@/app/components/stages/embedded/EmbeddedStageForm";
import {EmbeddedCardPayload, useEmbeddedStageStore} from "@/app/state/embedded_stages";

const EmbeddedCardStage = () => {

    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const savedCardQuote = useEmbeddedStageStore((state) => state.cardPayload) as EmbeddedCardPayload;

    const savedCashAdvance = savedCardQuote?.cash_advance;
    const savedBalanceTransfer = savedCardQuote?.balance_transfer;
    const savedBalanceTransferAmount = savedCardQuote?.balance_transfer_amount;

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)

    const setPayload = useEmbeddedStageStore((state) => state.setCardPayload)

    const [formData, setFormData] = useState<EmbeddedCardPayload>({
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

    const validate = (formData: EmbeddedCardPayload) => {
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
        <EmbeddedStageForm title="Credit Card details" canGoBack={false} inputFields={inputFields}
                           submitFormData={submitFormData}/>
    )
}
export default EmbeddedCardStage
