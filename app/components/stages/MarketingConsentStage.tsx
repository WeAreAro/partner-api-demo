'use client';

import {MarketingConsentPayload, useStageStore, YesNoValue} from '@/app/state/stages';
import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../InputField';
import {StageForm} from '../StageForm';

const MarketingConsentStage = () => {

    const savedStage = useStageStore((state) => state.currentStage);

    const savedEmailOptIn = useStageStore((state) => state.marketingConsentPayload?.email_opt_in);
    const savedTextOptIn = useStageStore((state) => state.marketingConsentPayload?.text_opt_in);

    const setCurrentStage = useStageStore((state) => state.setCurrentStage)
    const setPayload = useStageStore((state) => state.setMarketingConsentPayload)

    const [formData, setFormData] = useState<MarketingConsentPayload>({
        email_opt_in: savedEmailOptIn ?? YesNoValue.Yes,
        text_opt_in: savedTextOptIn ?? YesNoValue.Yes
    })

    const fields: Field[] = [
        {
            name: "email_opt_in",
            title: "Opt into email marketing",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
        {
            name: "text_opt_in",
            title: "Opt into SMS marketing",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
    ]

    const [errors, setErrors] = useState({} as any);

    const validate = (formData: MarketingConsentPayload) => {
        const formErrors = {} as any

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
        <StageForm title={"Marketing Consent"} canGoBack={true} inputFields={inputFields}
                   submitFormData={submitFormData}/>
    )
}
export default MarketingConsentStage
