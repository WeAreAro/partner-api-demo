'use client';

import {RedirectPartnerDetails, useRedirectStageStore} from '@/app/state/redirect_stages';
import React, {useEffect, useState} from 'react';
import {createInputFields, Field} from '../../InputField';
import {StageForm} from './StageForm';
import {useGeneralStageStore} from "@/app/state/general_stages";
import {checkRequiredFields} from "@/app/utils/ValidationUtils";

const PartnerDetailsStage = () => {

    const savedStage = useRedirectStageStore((state) => state.currentStage);

    const savedPartnerDetails = useRedirectStageStore((state) => state.partnerDetailsPayload) as RedirectPartnerDetails;

    const savedPartnerCode = savedPartnerDetails?.partner_code;
    const savedPartnerReference = savedPartnerDetails?.partner_reference;
    const savedCampaignCode = savedPartnerDetails?.campaign_code;

    const setCurrentStage = useRedirectStageStore((state) => state.setCurrentStage)

    const setPayload = useRedirectStageStore((state) => state.setPartnerDetailsPayload)

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<RedirectPartnerDetails>({
        partner_code: savedPartnerCode ?? "FFW-TEST",
        partner_reference: savedPartnerReference ?? "REFERENCE-1",
        campaign_code: savedCampaignCode ?? "CAMPAIGN-1"
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
        }
    ]

    const validate = (formData: RedirectPartnerDetails) => {
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
        <StageForm title="Partner details" canGoBack={false} inputFields={inputFields} submitFormData={submitFormData}/>
    )
}
export default PartnerDetailsStage
