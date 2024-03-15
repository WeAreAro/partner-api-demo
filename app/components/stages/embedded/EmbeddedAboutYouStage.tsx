'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {MaritalStatus, ResidentialStatus, Title, UkDrivingLicenceType} from "@/app/state/enum/Common";
import {EmbeddedAboutYouPayload, useEmbeddedStageStore} from "@/app/state/embedded_stages";
import {EmbeddedStageForm} from "@/app/components/stages/embedded/EmbeddedStageForm";
import {useGeneralStageStore} from "@/app/state/general_stages";

const EmbeddedAboutYouStage = () => {

    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const savedTitle = useEmbeddedStageStore((state) => state.aboutYouPayload.title);
    const savedFirstName = useEmbeddedStageStore((state) => state.aboutYouPayload?.first_name);
    const savedSurname = useEmbeddedStageStore((state) => state.aboutYouPayload?.surname);
    const savedEmail = useEmbeddedStageStore((state) => state.aboutYouPayload?.email);
    const savedHomePhone = useEmbeddedStageStore((state) => state.aboutYouPayload?.home_phone);
    const savedMobilePhone = useEmbeddedStageStore((state) => state.aboutYouPayload?.mobile_phone);
    const savedResidentialStatus = useEmbeddedStageStore((state) => state.aboutYouPayload?.residential_status);
    const savedDob = useEmbeddedStageStore((state) => state.aboutYouPayload?.dob);
    const savedMaritalStatus = useEmbeddedStageStore((state) => state.aboutYouPayload?.marital_status);
    const savedNumberOfDependants = useEmbeddedStageStore((state) => state.aboutYouPayload?.number_of_dependants);
    const savedDependantAges = useEmbeddedStageStore((state) => state.aboutYouPayload?.dependant_ages_comma_sep);
    const savedHasDrivingLicence = useEmbeddedStageStore((state) => state.aboutYouPayload?.has_driving_licence)

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)
    const setAboutYouPayload = useEmbeddedStageStore((state) => state.setAboutYouPayload)

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<EmbeddedAboutYouPayload>({
        title: savedTitle ?? Title.Mr,
        first_name: savedFirstName ?? "John",
        surname: savedSurname ?? "Doe",
        email: savedEmail ?? "johndoe@example.com",
        home_phone: savedHomePhone ?? "01489564777",
        mobile_phone: savedMobilePhone ?? "07598235555",
        marital_status: savedMaritalStatus ?? MaritalStatus.Married,
        residential_status: savedResidentialStatus ?? ResidentialStatus['Homeowner with a mortgage'],
        dob: savedDob ?? "04/04/1972",
        number_of_dependants: savedNumberOfDependants ?? 3,
        dependant_ages_comma_sep: savedDependantAges ?? "8,10,14",
        has_driving_licence: savedHasDrivingLicence ?? UkDrivingLicenceType["Full UK licence"]
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
            name: "number_of_dependants",
            title: "Number of dependants",
            type: InputType.Number
        },
        {
            name: "dependant_ages_comma_sep",
            title: "The ages of the dependants"
        },
        {
            name: "has_driving_licence",
            title: "Do you have a driving licence",
            type: InputType.Enum,
            possibleValues: getPossibleValues(UkDrivingLicenceType)
        },
    ]

    const validate = (formData: EmbeddedAboutYouPayload) => {
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

        if (!formData.mobile_phone && !formData.home_phone) {
            formErrors.mobile_phone = "Please provide either a valid mobile phone or home phone number."
            formErrors.home_phone = "Please provide either a valid mobile phone or home phone number."
        }

        const dobRegex = new RegExp(/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g);
        if (!formData.dob || !dobRegex.test(formData.dob)) {
            formErrors.dob = "Date of birth is required in the format: dd/MM/yyyy"
        }
        if (formData?.number_of_dependants > 0 && !formData.dependant_ages_comma_sep) {
            formErrors.dependant_ages_comma_sep = "Please provide the ages for your dependant and seperate them by a comma."
        }
        if (!formData.number_of_dependants && formData.dependant_ages_comma_sep) {
            formErrors.number_of_dependants = "Please do not provide dependant ages if you do not have any."
        }

        console.log(formErrors);

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
        <EmbeddedStageForm title="Personal Details" canGoBack={true} inputFields={inputFields}
                           submitFormData={submitFormData}/>
    )
}
export default EmbeddedAboutYouStage
