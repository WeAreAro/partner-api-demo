'use client';

import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {VendorType, YesNoValue} from "@/app/state/enum/Common";
import {EligibilityStageForm} from "@/app/components/stages/eligibility/EligibilityStageForm";
import {EligibilityVehicleDetailsPayload, useEligibilityStageStore} from "@/app/state/eligibility_stages";
import {useGeneralStageStore} from "@/app/state/general_stages";

const EligibilityVehicleDetailsStage = () => {

    const savedStage = useEligibilityStageStore((state) => state.currentStage);

    const savedAutoFinancePayload = useEligibilityStageStore((state) => state.vehicleDetailsPayload) as EligibilityVehicleDetailsPayload;

    const savedVehicleFound = savedAutoFinancePayload?.vehicle_found;
    const savedExpectedAnnualMileage = savedAutoFinancePayload?.expected_annual_mileage;
    const savedVendorType = savedAutoFinancePayload?.vendor_type;
    const savedPurchasePrice = savedAutoFinancePayload?.purchase_price;
    const savedDepositAmount = savedAutoFinancePayload?.deposit_amount;
    const savedVehicleRegistration = savedAutoFinancePayload?.vehicle_registration;
    const savedVehicleCurrentMileage = savedAutoFinancePayload?.vehicle_current_mileage;

    const setCurrentStage = useEligibilityStageStore((state) => state.setCurrentStage)

    const setPayload = useEligibilityStageStore((state) => state.setVehicleDetailsPayload)

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);

    const [formData, setFormData] = useState<EligibilityVehicleDetailsPayload>({
        vehicle_found: savedVehicleFound ?? YesNoValue.Yes,
        expected_annual_mileage: savedExpectedAnnualMileage ?? 8000,
        vendor_type: savedVendorType ?? VendorType.Dealer,
        purchase_price: savedPurchasePrice ?? 12000,
        deposit_amount: savedDepositAmount ?? 2500,
        vehicle_registration: savedVehicleRegistration ?? "H0T C4R",
        vehicle_current_mileage: savedVehicleCurrentMileage ?? 32574
    })

    const [errors, setErrors] = useState({} as any);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const fields: Field[] = [
        {
            name: "vehicle_found",
            title: "Have you found a vehicle?",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue),
            required: true
        },
        {
            name: "expected_annual_mileage",
            title: "Expected Annual Mileage",
            type: InputType.Number,
        },
        {
            name: "vendor_type",
            title: "Vendor Type",
            type: InputType.Enum,
            possibleValues: getPossibleValues(VendorType),
        },
        {
            name: "purchase_price",
            title: "Purchase Price",
            type: InputType.Number,
        },
        {
            name: "deposit_amount",
            title: "Deposit Amount",
            type: InputType.Number,
        },
        {
            name: "vehicle_registration",
            title: "Vehicle Registration",
            type: InputType.String,
        },
        {
            name: "vehicle_current_mileage",
            title: "Current Mileage",
            type: InputType.Number,
        },
    ]

    const validate = (formData: EligibilityVehicleDetailsPayload) => {
        const formErrors = {} as any

        if (!enableValidation) {
            return formErrors;
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

    const inputFields = createInputFields(fields, formData, errors, setFormData)

    return (
        <EligibilityStageForm title="Vehicle Details" canGoBack={true} inputFields={inputFields}
                              submitFormData={submitFormData}/>
    )
}
export default EligibilityVehicleDetailsStage
