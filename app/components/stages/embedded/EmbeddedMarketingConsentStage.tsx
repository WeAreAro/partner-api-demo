'use client';


import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {YesNoValue} from "@/app/state/enum/Common";
import {EmbeddedStageForm} from "@/app/components/stages/embedded/EmbeddedStageForm";
import {
    EMBEDDED_JOINT_APPLICANT_STAGES,
    EmbeddedMarketingConsentPayload,
    useEmbeddedStageStore
} from "@/app/state/embedded_stages";
import {requiresJointApplicant} from "@/app/utils/StageStepUtils";
import {useGeneralStageStore} from "@/app/state/general_stages";

const EmbeddedMarketingConsentStage = () => {

    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const savedEmailOptIn = useEmbeddedStageStore((state) => state.marketingConsentPayload?.email_opt_in);
    const savedTextOptIn = useEmbeddedStageStore((state) => state.marketingConsentPayload?.text_opt_in);

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)
    const setPayload = useEmbeddedStageStore((state) => state.setMarketingConsentPayload)

    const aboutYouPayload = useEmbeddedStageStore((state) => state.aboutYouPayload);

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<EmbeddedMarketingConsentPayload>({
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

    const validate = (formData: EmbeddedMarketingConsentPayload) => {
        const formErrors = {} as any

        if (!enableValidation) {
            return formErrors;
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
        <EmbeddedStageForm title={"Marketing Consent"}
                           canGoBack={true}
                           goBackCount={!requiresJointApplicant(aboutYouPayload) ? EMBEDDED_JOINT_APPLICANT_STAGES + 1 : 1}
                           inputFields={inputFields}
                           submitFormData={submitFormData}/>
    )
}
export default EmbeddedMarketingConsentStage
