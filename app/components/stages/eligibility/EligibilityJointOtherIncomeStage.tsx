'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {OtherIncomeDescription, OtherIncomePeriod} from "@/app/state/enum/Common";
import {EligibilityJointOtherIncomePayload, useEligibilityStageStore} from "@/app/state/eligibility_stages";
import {EligibilityStageForm} from "@/app/components/stages/eligibility/EligibilityStageForm";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {checkRequiredFields} from "@/app/utils/ValidationUtils";

const EligibilityJointOtherIncomeStage = () => {

    const savedStage = useEligibilityStageStore((state) => state.currentStage);

    const savedIncomeOne = useEligibilityStageStore((state) => state.jointOtherIncomePayload?.income_1);
    const savedIncomeDescriptionOne = useEligibilityStageStore((state) => state.jointOtherIncomePayload?.description_1);

    const savedIncomeTwo = useEligibilityStageStore((state) => state.jointOtherIncomePayload?.income_2);
    const savedIncomeDescriptionTwo = useEligibilityStageStore((state) => state.jointOtherIncomePayload?.description_2);

    const setCurrentStage = useEligibilityStageStore((state) => state.setCurrentStage)
    const setPayload = useEligibilityStageStore((state) => state.setJointOtherIncomePayload)

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<EligibilityJointOtherIncomePayload>({
        income_1: savedIncomeOne ?? 300,
        description_1: savedIncomeDescriptionOne ?? OtherIncomeDescription['Overtime'],
        period_1: OtherIncomePeriod.Monthly,

        income_2: savedIncomeTwo,
        description_2: savedIncomeDescriptionTwo,
        period_2: OtherIncomePeriod.Monthly,
    })

    const [errors, setErrors] = useState({} as any);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const allFields: Field[] = [
        {
            name: "income_1",
            title: "Other Income 1 Amount",
            type: InputType.Number,
        },
        {
            name: "description_1",
            title: "Other Income 1 Description",
            type: InputType.Enum,
            possibleValues: getPossibleValues(OtherIncomeDescription),
        },
        {
            name: "income_2",
            title: "Other Income 2 Amount",
            type: InputType.Number,
        },
        {
            name: "description_2",
            title: "Other Income 2 Description",
            type: InputType.Enum,
            possibleValues: getPossibleValues(OtherIncomeDescription),
        },
    ]

    const validate = (formData: EligibilityJointOtherIncomePayload) => {
        let formErrors = {} as any

        if (!enableValidation) {
            return formErrors;
        }

        const missingRequiredFields = checkRequiredFields(formData, allFields);
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

    const inputFields =
        createInputFields(allFields, formData, errors, setFormData)

    return (
        <EligibilityStageForm title={"Joint Application - Other Monthly Incomes"} canGoBack={true}
                              inputFields={inputFields}
                              submitFormData={submitFormData}/>
    )
}
export default EligibilityJointOtherIncomeStage
