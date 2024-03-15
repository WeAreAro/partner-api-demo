'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {EligibilityPartnerDetails, useEligibilityStageStore} from "@/app/state/eligibility_stages";
import {EligibilityStageForm} from "@/app/components/stages/eligibility/EligibilityStageForm";
import {YesNoValue} from "@/app/state/enum/Common";
import {useGeneralStageStore} from "@/app/state/general_stages";

const EligibilityPartnerDetailsStage = () => {

    const savedStage = useEligibilityStageStore((state) => state.currentStage);

    const savedPartnerDetails = useEligibilityStageStore((state) => state.partnerDetailsPayload) as EligibilityPartnerDetails;

    const savedPartnerCode = savedPartnerDetails?.partner_code;
    const savedPartnerReference = savedPartnerDetails?.partner_reference;
    const savedCampaignCode = savedPartnerDetails?.campaign_code;
    const savedAgreeTerms = savedPartnerDetails?.agree_terms;

    const setCurrentStage = useEligibilityStageStore((state) => state.setCurrentStage)

    const setPayload = useEligibilityStageStore((state) => state.setPartnerDetailsPayload)

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<EligibilityPartnerDetails>({
        partner_code: savedPartnerCode ?? "FFW-TEST",
        partner_reference: savedPartnerReference ?? "REFERENCE-1",
        campaign_code: savedCampaignCode ?? "CAMPAIGN-1",
        agree_terms: savedAgreeTerms ?? YesNoValue.Yes
    })

    const [errors, setErrors] = useState({} as any);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const fields: Field[] = [
        {
            name: "partner_code",
            title: "Partner Code",
            required: true
        },
        {
            name: "partner_reference",
            title: "Partner Reference",
        },
        {
            name: "campaign_code",
            title: "Partner Campaign Code",
        },
        {
            name: "agree_terms",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue),
            required: true
        }
    ]

    const validate = (formData: EligibilityPartnerDetails) => {
        const formErrors = {} as any

        if (!enableValidation) {
            return formErrors;
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
        <EligibilityStageForm title="Partner details" canGoBack={false} inputFields={inputFields}
                              submitFormData={submitFormData}/>
    )
}
export default EligibilityPartnerDetailsStage
