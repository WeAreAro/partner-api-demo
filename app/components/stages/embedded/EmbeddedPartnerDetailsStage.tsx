'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field} from '../../InputField';
import {EmbeddedPartnerDetails, useEmbeddedStageStore} from "@/app/state/embedded_stages";
import {EmbeddedStageForm} from "@/app/components/stages/embedded/EmbeddedStageForm";

const EmbeddedPartnerDetailsStage = () => {

    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const savedPartnerDetails = useEmbeddedStageStore((state) => state.partnerDetailsPayload) as EmbeddedPartnerDetails;

    const savedPartnerCode = savedPartnerDetails?.partner_code;
    const savedPartnerReference = savedPartnerDetails?.partner_reference;
    const savedCampaignCode = savedPartnerDetails?.campaign_code;

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)

    const setPayload = useEmbeddedStageStore((state) => state.setPartnerDetailsPayload)

    const [formData, setFormData] = useState<EmbeddedPartnerDetails>({
        partner_code: savedPartnerCode ?? "FFW-TEST",
        partner_reference: savedPartnerReference ?? undefined,
        campaign_code: savedCampaignCode ?? undefined
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
    ]

    const validate = (formData: EmbeddedPartnerDetails) => {
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
        <EmbeddedStageForm title="Partner details" canGoBack={false} inputFields={inputFields}
                           submitFormData={submitFormData}/>
    )
}
export default EmbeddedPartnerDetailsStage
