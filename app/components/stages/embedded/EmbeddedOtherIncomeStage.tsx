'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {OtherIncomeDescription, OtherIncomePeriod} from "@/app/state/enum/Common";
import {EmbeddedOtherIncomePayload, useEmbeddedStageStore} from "@/app/state/embedded_stages";
import {EmbeddedStageForm} from "@/app/components/stages/embedded/EmbeddedStageForm";

const EmbeddedOtherIncomeStage = () => {

    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const savedIncomeOne = useEmbeddedStageStore((state) => state.otherIncomePayload?.income_1);
    const savedIncomeDescriptionOne = useEmbeddedStageStore((state) => state.otherIncomePayload?.description_1);

    const savedIncomeTwo = useEmbeddedStageStore((state) => state.otherIncomePayload?.income_2);
    const savedIncomeDescriptionTwo = useEmbeddedStageStore((state) => state.otherIncomePayload?.description_2);

    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)
    const setPayload = useEmbeddedStageStore((state) => state.setOtherIncomePayload)

    const [formData, setFormData] = useState<EmbeddedOtherIncomePayload>({
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

    const validate = (formData: EmbeddedOtherIncomePayload) => {
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
        setPayload({...formData})
    }, [formData, isSubmitted, errors])

    const inputFields =
        createInputFields(allFields, formData, errors, setFormData)

    return (
        <EmbeddedStageForm title={"Other Monthly Incomes"} canGoBack={true} inputFields={inputFields}
                           submitFormData={submitFormData}/>
    )
}
export default EmbeddedOtherIncomeStage