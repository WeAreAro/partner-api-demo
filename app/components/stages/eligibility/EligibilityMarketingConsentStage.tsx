'use client';


import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {YesNoValue} from "@/app/state/enum/Common";
import {EligibilityStageForm} from "@/app/components/stages/eligibility/EligibilityStageForm";
import {
    ELIGIBILITY_JOINT_APPLICANT_STAGES,
    EligibilityMarketingConsentPayload,
    useEligibilityStageStore
} from "@/app/state/eligibility_stages";
import {requiresJointApplicant} from "@/app/utils/StageStepUtils";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {checkRequiredFields} from "@/app/utils/ValidationUtils";

const EligibilityMarketingConsentStage = () => {

    const savedStage = useEligibilityStageStore((state) => state.currentStage);

    const savedEmailOptIn = useEligibilityStageStore((state) => state.marketingConsentPayload?.email_opt_in);
    const savedTextOptIn = useEligibilityStageStore((state) => state.marketingConsentPayload?.text_opt_in);

    const setCurrentStage = useEligibilityStageStore((state) => state.setCurrentStage)
    const setPayload = useEligibilityStageStore((state) => state.setMarketingConsentPayload)

    const aboutYouPayload = useEligibilityStageStore((state) => state.aboutYouPayload);

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<EligibilityMarketingConsentPayload>({
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

    const validate = (formData: EligibilityMarketingConsentPayload) => {
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
        <EligibilityStageForm title={"Marketing Consent"}
                              canGoBack={true}
                              goBackCount={!requiresJointApplicant(aboutYouPayload) ? ELIGIBILITY_JOINT_APPLICANT_STAGES + 1 : 1}
                              inputFields={inputFields}
                              submitFormData={submitFormData}/>
    )
}
export default EligibilityMarketingConsentStage
