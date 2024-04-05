'use client';

import {EmploymentIndustry} from '@/app/state/redirect_stages';
import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {EmploymentStatus} from "@/app/state/enum/Common";
import {EligibilityJointEmploymentPayload, useEligibilityStageStore} from "@/app/state/eligibility_stages";
import {EligibilityStageForm} from "@/app/components/stages/eligibility/EligibilityStageForm";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {checkRequiredFields} from "@/app/utils/ValidationUtils";

const EligibilityJointCurrentEmploymentStage = () => {

    const savedStage = useEligibilityStageStore((state) => state.currentStage);

    const savedOccupation = useEligibilityStageStore((state) => state.jointCurrentEmploymentPayload?.occupation);
    const savedEmployerName = useEligibilityStageStore((state) => state.jointCurrentEmploymentPayload?.employer_name);
    const savedEmploymentIndustry = useEligibilityStageStore((state) => state.jointCurrentEmploymentPayload?.employment_industry);
    const savedGrossIncome = useEligibilityStageStore((state) => state.jointCurrentEmploymentPayload?.gross_income);
    const savedEmploymentStatus = useEligibilityStageStore((state) => state.jointCurrentEmploymentPayload?.employment_status);
    const savedEmploymentYears = useEligibilityStageStore((state) => state.jointCurrentEmploymentPayload?.emp_years);
    const savedEmploymentMonths = useEligibilityStageStore((state) => state.jointCurrentEmploymentPayload?.emp_months);

    const setCurrentStage = useEligibilityStageStore((state) => state.setCurrentStage)

    const setPayload = useEligibilityStageStore((state) => state.setJointCurrentEmploymentPayload)

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<EligibilityJointEmploymentPayload>({
        occupation: savedOccupation ?? "Clinical Nurse",
        employer_name: savedEmployerName ?? "NHS",

        employment_industry: savedEmploymentIndustry ?? EmploymentIndustry['Health Care - NHS'],
        employment_status: savedEmploymentStatus ?? EmploymentStatus['Unemployed'],

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


    const validate = (formData: EligibilityJointEmploymentPayload) => {
        let formErrors = {} as any

        if (!enableValidation) {
            return formErrors;
        }

        const missingRequiredFields = checkRequiredFields(formData, allFields);
        if (Object.keys(missingRequiredFields).length > 0) {
            formErrors = {...formErrors, ...missingRequiredFields}
        }

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

        return formErrors
    }

    const shouldHaveAnIncome = (status: EmploymentStatus) => {
        switch (status) {
            case EmploymentStatus.Retired:
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
        <EligibilityStageForm title={"Joint Applicant - Employment Details"} canGoBack={true} inputFields={inputFields}
                              submitFormData={submitFormData}/>
    )
}
export default EligibilityJointCurrentEmploymentStage
