'use client';

import {EmploymentIndustry} from '@/app/state/redirect_stages';
import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {EmploymentStatus} from "@/app/state/enum/Common";
import {EmbeddedEmploymentPayload, useEmbeddedStageStore} from "@/app/state/embedded_stages";
import {EmbeddedStageForm} from "@/app/components/stages/embedded/EmbeddedStageForm";

const EmbeddedCurrentEmploymentStage = () => {

    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const savedOccupation = useEmbeddedStageStore((state) => state.currentEmploymentPayload?.occupation);
    const savedEmployerName = useEmbeddedStageStore((state) => state.currentEmploymentPayload?.employer_name);
    const savedEmploymentIndustry = useEmbeddedStageStore((state) => state.currentEmploymentPayload?.employment_industry);
    const savedGrossIncome = useEmbeddedStageStore((state) => state.currentEmploymentPayload?.gross_income);
    const savedEmploymentStatus = useEmbeddedStageStore((state) => state.currentEmploymentPayload?.employment_status);
    const savedEmploymentYears = useEmbeddedStageStore((state) => state.currentEmploymentPayload?.emp_years);
    const savedEmploymentMonths = useEmbeddedStageStore((state) => state.currentEmploymentPayload?.emp_months);
    const savedAdditionalHouseholdIncome = useEmbeddedStageStore((state) => state.currentEmploymentPayload?.additional_household_income);

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)

    const setPayload = useEmbeddedStageStore((state) => state.setCurrentEmploymentPayload)

    const [formData, setFormData] = useState<EmbeddedEmploymentPayload>({
        occupation: savedOccupation ?? "Software Engineer",
        employer_name: savedEmployerName ?? "Aro",

        employment_industry: savedEmploymentIndustry ?? EmploymentIndustry['Computers - Software'],
        employment_status: savedEmploymentStatus ?? EmploymentStatus['Full time'],

        gross_income: savedGrossIncome ?? 26000,
        emp_years: savedEmploymentYears ?? 2,
        emp_months: savedEmploymentMonths ?? 4,

        additional_household_income: savedAdditionalHouseholdIncome ?? 12000
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
            name: "additional_household_income",
            title: "Additional Household Income",
            type: InputType.Number
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


    const validate = (formData: EmbeddedEmploymentPayload) => {
        const formErrors = {} as any

        if (shouldHaveAnIncome(formData?.employment_status)) {
            if (formData?.gross_income
                && (isNaN(formData.gross_income) || formData.gross_income < 0 || formData.gross_income > 1000000)) {
                formErrors.gross_income = "Please provide your yearly gross income. It cannot be negative."
            }
            if (formData?.additional_household_income
                && (formData.additional_household_income < 0 || formData.additional_household_income > 1000000)) {
                formErrors.additional_household_income = "Please provide a valid household income. It cannot be negative."
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
            formData.additional_household_income = 0
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
        <EmbeddedStageForm title={"Current Employment Details"} canGoBack={true} inputFields={inputFields}
                           submitFormData={submitFormData}/>
    )
}
export default EmbeddedCurrentEmploymentStage
