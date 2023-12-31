'use client';

import { OtherIncomeDescription, OtherIncomePayload, OtherIncomePeriod, useStageStore } from '@/app/state/stages';
import React, { useEffect, useState } from 'react';
import { InputType, createInputFields, getPossibleValues } from '../InputField';
import { StageForm } from '../StageForm';

const OtherIncomeStage = () => {

    const savedStage = useStageStore((state) => state.currentStage);

    const savedIncomeOne = useStageStore((state) => state.otherIncomePayload?.income_1);
    const savedIncomeDescriptionOne = useStageStore((state) => state.otherIncomePayload?.description_1);
    const savedIncomePeriodOne = useStageStore((state) => state.otherIncomePayload?.period_1);

    const savedIncomeTwo = useStageStore((state) => state.otherIncomePayload?.income_2);
    const savedIncomeDescriptionTwo = useStageStore((state) => state.otherIncomePayload?.description_2);
    const savedIncomePeriodTwo = useStageStore((state) => state.otherIncomePayload?.period_2);

    const setCurrentStage = useStageStore((state) => state.setCurrentStage)
    const setPayload = useStageStore((state) => state.setOtherIncomePayload)

    const [formData, setFormData] = useState<OtherIncomePayload>({
        income_1: savedIncomeOne ?? 800,
        description_1: savedIncomeDescriptionOne ?? OtherIncomeDescription['Adoption Allowance'],
        period_1: savedIncomePeriodOne ?? OtherIncomePeriod.Monthly,

        income_2: savedIncomeTwo,
        description_2: savedIncomeDescriptionTwo,
        period_2: savedIncomePeriodTwo,
    })

    const [errors, setErrors] = useState({} as any);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const allFields = [
        {
            name: "income_1",
            title: "Other Income 1 Amount",
            type: InputType.Number
        },
        {
            name: "description_1",
            title: "Other Income 1 Description",
            type: InputType.Enum,
            possibleValues: getPossibleValues(OtherIncomeDescription)
        },
        {
            name: "period_1",
            title: "Other Income 1 Period",
            type: InputType.Enum,
            possibleValues: getPossibleValues(OtherIncomePeriod)
        },
        {
            name: "income_2",
            title: "Other Income 2 Amount",
            type: InputType.Number
        },
        {
            name: "description_2",
            title: "Other Income 2 Description",
            type: InputType.Enum,
            possibleValues: getPossibleValues(OtherIncomeDescription)
        },
        {
            name: "period_2",
            title: "Other Income 2 Period",
            type: InputType.Enum,
            possibleValues: getPossibleValues(OtherIncomePeriod)
        },
    ]

    const validate = (formData: OtherIncomePayload) => {
        const formErrors = {} as any

        // Don't care if it's left blank.

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
        setPayload({ ...formData })
    }, [formData, isSubmitted, errors])

    const inputFields =
        createInputFields(allFields, formData, errors, setFormData)

    return (
        <StageForm title={"Other Income Details"} canGoBack={true} inputFields={inputFields} submitFormData={submitFormData} />
    )
}
export default OtherIncomeStage
