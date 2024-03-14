'use client';

import {EmploymentIndustry} from '@/app/state/redirect_stages';
import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {EmploymentStatus} from "@/app/state/enum/Common";
import {EmbeddedJointEmploymentPayload, useEmbeddedStageStore} from "@/app/state/embedded_stages";
import {EmbeddedStageForm} from "@/app/components/stages/embedded/EmbeddedStageForm";

const EmbeddedJointCurrentEmploymentStage = () => {

    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const savedOccupation = useEmbeddedStageStore((state) => state.jointCurrentEmploymentPayload?.occupation);
    const savedEmployerName = useEmbeddedStageStore((state) => state.jointCurrentEmploymentPayload?.employer_name);
    const savedEmploymentIndustry = useEmbeddedStageStore((state) => state.jointCurrentEmploymentPayload?.employment_industry);
    const savedGrossIncome = useEmbeddedStageStore((state) => state.jointCurrentEmploymentPayload?.gross_income);
    const savedEmploymentStatus = useEmbeddedStageStore((state) => state.jointCurrentEmploymentPayload?.employment_status);
    const savedEmploymentYears = useEmbeddedStageStore((state) => state.jointCurrentEmploymentPayload?.emp_years);
    const savedEmploymentMonths = useEmbeddedStageStore((state) => state.jointCurrentEmploymentPayload?.emp_months);

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)

    const setPayload = useEmbeddedStageStore((state) => state.setJointCurrentEmploymentPayload)

    const [formData, setFormData] = useState<EmbeddedJointEmploymentPayload>({
        occupation: savedOccupation ?? "Clinical Nurse",
        employer_name: savedEmployerName ?? "NHS",

        employment_industry: savedEmploymentIndustry ?? EmploymentIndustry['Health Care - NHS'],
        employment_status: savedEmploymentStatus ?? EmploymentStatus['Part time'],

        gross_income: savedGrossIncome ?? 13400,
        emp_years: savedEmploymentYears ?? 18,
        emp_months: savedEmploymentMonths ?? 1
    })

    const [errors, setErrors] = useState({} as any);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const allFields: Field[] = [
        {
            name: "occupation",
            title: "Occupation"
        },
        {
            name: "employer_name",
            title: "Employer Name"
        },
        {
            name: "employment_industry",
            title: "Employment Industry",
            type: InputType.Enum,
            possibleValues: getPossibleValues(EmploymentIndustry)
        },
        {
            name: "gross_income",
            title: "Gross Income",
            type: InputType.Number,
            required: true
        },
        {
            name: "employment_status",
            title: "Employment Status",
            type: InputType.Enum,
            possibleValues: getPossibleValues(EmploymentStatus),
            required: true
        },
        {
            name: "emp_years",
            title: "The years you have been employed in this role.",
            type: InputType.Number,
            required: true
        },
        {
            name: "emp_months",
            title: "The remainder months you have been employed in this role.",
            type: InputType.Number,
            required: true
        },
    ]

    const noIncomeFields: Field[] = [
        {
            name: "employment_status",
            title: "Employment Status",
            type: InputType.Enum,
            possibleValues: getPossibleValues(EmploymentStatus)
        },
    ]


    const validate = (formData: EmbeddedJointEmploymentPayload) => {
        const formErrors = {} as any

        if (shouldHaveAnIncome(formData?.employment_status)) {
            if (formData?.gross_income
                && (isNaN(formData.gross_income) || formData.gross_income < 0 || formData.gross_income > 1000000)) {
                formErrors.gross_income = "Please provide your yearly gross income. It cannot be negative."
            }
            if (formData?.emp_years && (isNaN(formData.emp_years))) {
                formErrors.emp_years = "Please provide a valid number of years."
            }
            if (formData?.emp_months && isNaN(formData.emp_months)) {
                formErrors.emp_years = "Please provide a valid number of months."
            }
            if (formData?.occupation && formData.occupation.length > 128) {
                formErrors.occupation = "Occupation cannot exceed 128 characters."
            }

        } else {
            formData.employer_name = undefined
            formData.employment_industry = undefined
            formData.occupation = undefined
            formData.gross_income = 0
            formData.emp_years = 0
            formData.emp_months = 0
        }

        console.log({formData})
        return formErrors
    }

    const shouldHaveAnIncome = (status: EmploymentStatus) => {
        switch (status) {
            case EmploymentStatus.Retired:
            case EmploymentStatus.Homemaker:
            case EmploymentStatus.Student:
            case EmploymentStatus['Part time Self-employed']:
            case EmploymentStatus.Unemployed:
                return false;

            default:
                return true;
        }
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

    const inputFields =
        createInputFields(shouldHaveAnIncome(formData.employment_status) ? allFields : noIncomeFields, formData, errors, setFormData)

    return (
        <EmbeddedStageForm title={"Joint Applicant - Employment Details"} canGoBack={true} inputFields={inputFields}
                           submitFormData={submitFormData}/>
    )
}
export default EmbeddedJointCurrentEmploymentStage
