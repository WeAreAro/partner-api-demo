'use client';

import {RedirectAboutYouPayload, useRedirectStageStore} from '@/app/state/redirect_stages';
import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {StageForm} from './StageForm';
import {MaritalStatus, ResidentialStatus, Title} from "@/app/state/enum/Common";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {checkRequiredFields} from "@/app/utils/ValidationUtils";

const AboutYouStage = () => {

    const savedStage = useRedirectStageStore((state) => state.currentStage);

    const savedTitle = useRedirectStageStore((state) => state.aboutYouPayload.title);
    const savedForename = useRedirectStageStore((state) => state.aboutYouPayload?.forename);
    const savedSurname = useRedirectStageStore((state) => state.aboutYouPayload?.surname);
    const savedEmail = useRedirectStageStore((state) => state.aboutYouPayload?.email);
    const savedHomePhone = useRedirectStageStore((state) => state.aboutYouPayload?.home_phone);
    const savedMobilePhone = useRedirectStageStore((state) => state.aboutYouPayload?.mobile_phone);
    const savedResidentialStatus = useRedirectStageStore((state) => state.aboutYouPayload?.residential_status);
    const savedDob = useRedirectStageStore((state) => state.aboutYouPayload?.dob);
    const savedMaritalStatus = useRedirectStageStore((state) => state.aboutYouPayload?.marital_status);
    const savedNumberOfDependents = useRedirectStageStore((state) => state.aboutYouPayload?.number_of_dependents);
    const savedDependentAges = useRedirectStageStore((state) => state.aboutYouPayload?.dependent_ages);

    const setCurrentStage = useRedirectStageStore((state) => state.setCurrentStage)
    const setAboutYouPayload = useRedirectStageStore((state) => state.setAboutYouPayload)

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<RedirectAboutYouPayload>({
        title: savedTitle ?? Title.Mr,
        forename: savedForename ?? "John",
        surname: savedSurname ?? "Doe",
        email: savedEmail ?? "johndoe@example.com",
        home_phone: savedHomePhone ?? "01914207700",
        mobile_phone: savedMobilePhone ?? "07123456789",
        marital_status: savedMaritalStatus ?? MaritalStatus.Married,
        residential_status: savedResidentialStatus ?? ResidentialStatus['Homeowner with a mortgage'],
        dob: savedDob ?? "04/04/1972",
        number_of_dependents: savedNumberOfDependents ?? 3,
        dependent_ages: savedDependentAges ?? "8,10,14",
    })

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
            name: "forename",
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
            name: "home_phone",
            title: "Home Phone Number",
            type: InputType.Phone
        },
        {
            name: "mobile_phone",
            title: "Mobile Phone Number",
            type: InputType.Phone
        },
        {
            name: "residential_status",
            title: "Residential Status",
            type: InputType.Enum,
            possibleValues: getPossibleValues(ResidentialStatus),
            required: true
        },
        {
            name: "dob",
            title: "Date of Birth",
            required: true
        },
        {
            name: "marital_status",
            title: "Marital Status",
            type: InputType.Enum,
            possibleValues: getPossibleValues(MaritalStatus),
            required: true
        },
        {
            name: "number_of_dependents",
            title: "Number of dependents",
            type: InputType.Number
        },
        {
            name: "dependent_ages",
            title: "The ages of the dependents"
        }
    ]

    const validate = (formData: RedirectAboutYouPayload) => {
        let formErrors = {} as any

        if (!enableValidation) {
            return formErrors;
        }

        const missingRequiredFields = checkRequiredFields(formData, fields);
        if (Object.keys(missingRequiredFields).length > 0) {
            formErrors = {...formErrors, ...missingRequiredFields}
        }

        if (!formData.forename) {
            formErrors.forename = "First name is required."
        }

        if (formData?.forename && (formData.forename.length > 150)) {
            formErrors.forename = "First name cannot exceed 150 characters."
        }

        if (formData?.forename && (formData.forename.length < 2)) {
            formErrors.forename = "First name cannot be less than 2 characters."
        }

        if (!formData.surname) {
            formErrors.surname = "Last name is required."
        }
        const emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!formData.email || !emailRegex.test(formData.email)) {
            formErrors.email = "A valid email is required."
        }

        if (!formData.mobile_phone && !formData.home_phone) {
            formErrors.mobile_phone = "Please provide either a valid mobile phone or home phone number."
            formErrors.home_phone = "Please provide either a valid mobile phone or home phone number."
        }

        const dobRegex = new RegExp(/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g);
        if (!formData.dob || !dobRegex.test(formData.dob)) {
            formErrors.dob = "Date of birth is required in the format: dd/MM/yyyy"
        }
        if (formData?.number_of_dependents > 0 && !formData.dependent_ages) {
            formErrors.dependent_ages = "Please provide the ages for your dependent and seperate them by a comma."
        }
        if (!formData.number_of_dependents && formData.dependent_ages) {
            formErrors.number_of_dependents = "Please do not provide dependent ages if you do not have any."
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
        setAboutYouPayload({...formData})
    }, [formData, isSubmitted, errors])

    const inputFields = createInputFields(fields, formData, errors, setFormData)

    return (
        <StageForm title="Personal Details" canGoBack={true} inputFields={inputFields} submitFormData={submitFormData}/>
    )
}
export default AboutYouStage
