'use client';

import { useStageStore, MarketingConsentPayload, YesNoValue } from '@/app/state/stages';
import React, { useEffect, useState } from 'react';
import { InputType, createInputFields, getPossibleValues } from '../InputField';
import { StageForm } from '../StageForm';

const MarketingConsentStage = () => {

    const savedStage = useStageStore((state) => state.currentStage);

    const savedOptOut = useStageStore((state) => state.marketingConsentPayload?.opt_out);
    const savedEmailOptIn = useStageStore((state) => state.marketingConsentPayload?.email_opt_in);
    const savedTextOptIn = useStageStore((state) => state.marketingConsentPayload?.text_opt_in);
    const savedPostOptIn = useStageStore((state) => state.marketingConsentPayload?.post_opt_in);

    const setCurrentStage = useStageStore((state) => state.setCurrentStage)
    const setPayload = useStageStore((state) => state.setMarketingConsentPayload)

    const [formData, setFormData] = useState<MarketingConsentPayload>({
        opt_out: savedOptOut ?? YesNoValue.No,
        email_opt_in: savedEmailOptIn ?? YesNoValue.No,
        text_opt_in: savedTextOptIn ?? YesNoValue.No,
        post_opt_in: savedPostOptIn ?? YesNoValue.No,
    })

    const fields = [
        {
            name: "opt_out",
            title: "Opt out of all marketing",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
        {
            name: "email_opt_in",
            title: "Opt out of email marketing",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
        {
            name: "text_opt_in",
            title: "Opt out of SMS marketing",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
        {
            name: "post_opt_in",
            title: "Opt out of postal marketing",
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
        setPayload({ ...formData })
    }, [formData, isSubmitted, errors])


    const inputFields = createInputFields(fields, formData, errors, setFormData)

    return (
        <StageForm title={"Marketing Consent"} canGoBack={true} inputFields={inputFields} submitFormData={submitFormData} />
    )
}
export default MarketingConsentStage
