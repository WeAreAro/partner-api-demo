'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {Title} from "@/app/state/enum/Common";
import {EligibilityJointAboutYouPayload, useEligibilityStageStore} from "@/app/state/eligibility_stages";
import {EligibilityStageForm} from "@/app/components/stages/eligibility/EligibilityStageForm";
import {useGeneralStageStore} from "@/app/state/general_stages";

const EligibilityJointAboutYouStage = () => {

    const savedStage = useEligibilityStageStore((state) => state.currentStage);

    const savedTitle = useEligibilityStageStore((state) => state.jointAboutYouPayload.title);
    const savedFirstName = useEligibilityStageStore((state) => state.jointAboutYouPayload?.first_name);
    const savedSurname = useEligibilityStageStore((state) => state.jointAboutYouPayload?.surname);
    const savedEmail = useEligibilityStageStore((state) => state.jointAboutYouPayload?.email);
    const savedMobilePhone = useEligibilityStageStore((state) => state.jointAboutYouPayload?.mobile_phone);
    const savedDob = useEligibilityStageStore((state) => state.jointAboutYouPayload?.dob);

    const setCurrentStage = useEligibilityStageStore((state) => state.setCurrentStage)
    const setJointAboutYouPayload = useEligibilityStageStore((state) => state.setJointAboutYouPayload)

    const [formData, setFormData] = useState<EligibilityJointAboutYouPayload>({
        title: savedTitle ?? Title.Mrs,
        first_name: savedFirstName ?? "Janet",
        surname: savedSurname ?? "Doe",
        email: savedEmail ?? "janetdoe@example.com",
        mobile_phone: savedMobilePhone ?? "07598235666",
        dob: savedDob ?? "04/09/1980",
    })

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [errors, setErrors] = useState({} as any);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const fields: Field[] = [
        {
            name: "title",
            title: "Title",
            type: InputType.Enum,
            possibleValues: getPossibleValues(Title),
            required: true
        },
        {
            name: "first_name",
            title: "First name",
            required: true
        },
        {
            name: "surname",
            title: "Surname",
            required: true
        },
        {
            name: "email",
            title: "Email Address",
            required: true
        },
        {
            name: "mobile_phone",
            title: "Mobile Phone Number",
            type: InputType.Phone
        },
        {
            name: "dob",
            title: "Date of Birth",
            required: true
        },
    ]

    const validate = (formData: EligibilityJointAboutYouPayload) => {
        const formErrors = {} as any

        if (!enableValidation) {
            return formErrors;
        }

        if (!formData.first_name) {
            formErrors.first_name = "First name is required."
        }

        if (formData?.first_name && (formData.first_name.length > 150)) {
            formErrors.first_name = "First name cannot exceed 150 characters."
        }

        if (formData?.first_name && (formData.first_name.length < 2)) {
            formErrors.first_name = "First name cannot be less than 2 characters."
        }

        if (!formData.surname) {
            formErrors.surname = "Last name is required."
        }
        const emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!formData.email || !emailRegex.test(formData.email)) {
            formErrors.email = "A valid email is required."
        }

        const dobRegex = new RegExp(/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g);
        if (!formData.dob || !dobRegex.test(formData.dob)) {
            formErrors.dob = "Date of birth is required in the format: dd/MM/yyyy"
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
        setJointAboutYouPayload({...formData})
    }, [formData, isSubmitted, errors])

    const inputFields = createInputFields(fields, formData, errors, setFormData)

    return (
        <EligibilityStageForm title="Joint Applicant - Details" canGoBack={true} inputFields={inputFields}
                              submitFormData={submitFormData}/>
    )
}
export default EligibilityJointAboutYouStage
