'use client';

import {RedirectOtherIncomePayload, useRedirectStageStore} from '@/app/state/redirect_stages';
import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {StageForm} from './StageForm';
import {OtherIncomeDescription, OtherIncomePeriod} from "@/app/state/enum/Common";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {checkRequiredFields} from "@/app/utils/ValidationUtils";

const OtherIncomeStage = () => {

    const savedStage = useRedirectStageStore((state) => state.currentStage);

    const savedIncomeOne = useRedirectStageStore((state) => state.otherIncomePayload?.income_1);
    const savedIncomeDescriptionOne = useRedirectStageStore((state) => state.otherIncomePayload?.description_1);

    const savedIncomeTwo = useRedirectStageStore((state) => state.otherIncomePayload?.income_2);
    const savedIncomeDescriptionTwo = useRedirectStageStore((state) => state.otherIncomePayload?.description_2);

    const setCurrentStage = useRedirectStageStore((state) => state.setCurrentStage)
    const setPayload = useRedirectStageStore((state) => state.setOtherIncomePayload)

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<RedirectOtherIncomePayload>({
        income_1: savedIncomeOne ?? 800,
        description_1: savedIncomeDescriptionOne ?? OtherIncomeDescription['Adoption Allowance'],
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

    const validate = (formData: RedirectOtherIncomePayload) => {
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
        <StageForm title={"Other Monthly Incomes"} canGoBack={true} inputFields={inputFields}
                   submitFormData={submitFormData}/>
    )
}
export default OtherIncomeStage
