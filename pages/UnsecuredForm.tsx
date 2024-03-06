'use client';

import Head from "next/head";
import {
    AddressPayloadSetters,
    AddressStages,
    FormType,
    UnsecuredLoanFormStage,
    useStageStore
} from "@/app/state/stages";
import AddressStage from "@/app/components/stages/AddressStage";
import CurrentEmploymentStage from "@/app/components/stages/CurrentEmploymentStage";
import ExpenditureStage from "@/app/components/stages/ExpenditureStage";
import MarketingConsentStage from "@/app/components/stages/MarketingConsentStage";
import PayloadStage from "@/app/components/stages/PayloadStage";

import '../app/globals.css'
import Header from "@/app/components/Header";
import OtherIncomeStage from "@/app/components/stages/OtherIncomeStage";
import LoanStage from "@/app/components/stages/LoanStage";
import {useEffect} from "react";
import AboutYouStage from "@/app/components/stages/AboutYouStage";

const UnsecuredForm = () => {
    const formStage = useStageStore((state) => state.currentStage);

    const setFormType = useStageStore((state) => state.setFormType)

    useEffect(() => setFormType(FormType.UNSECURED_LOAN), [])

    return (
        <><Head>
            <title>Apply for unsecured loan</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon"/>
        </Head>
            <Header showNav={false}/>
            {
                formStage === UnsecuredLoanFormStage.LoanStage && (
                    <LoanStage/>
                )
            }
            {
                formStage === UnsecuredLoanFormStage.AboutYouStage && (
                    <AboutYouStage/>
                )
            }
            {
                formStage === UnsecuredLoanFormStage.CurrentAddressStage && (
                    <AddressStage title={"Current Address"} addressPayloadName={AddressStages.CURRENT_ADDRESS}
                                  addressPayloadSetter={AddressPayloadSetters.CURRENT_ADDRESS}/>
                )
            }
            {
                formStage === UnsecuredLoanFormStage.FirstPreviousAddressStage && (
                    <AddressStage
                        title={"Due to living at your current address for under three years, you must provide your last previous address."}
                        addressPayloadName={AddressStages.FIRST_PREVIOUS_ADDRESS}
                        addressPayloadSetter={AddressPayloadSetters.FIRST_PREVIOUS_ADDRESS}/>
                )
            }
            {
                formStage === UnsecuredLoanFormStage.SecondPreviousAddressStage && (
                    <AddressStage
                        title={"Due to living at your current and previous address for under three years, you must provide your second to last address."}
                        addressPayloadName={AddressStages.SECOND_PREVIOUS_ADDRESS}
                        addressPayloadSetter={AddressPayloadSetters.SECOND_PREVIOUS_ADDRESS}/>
                )

            }
            {
                formStage === UnsecuredLoanFormStage.EmploymentStage && (
                    <CurrentEmploymentStage/>
                )
            }
            {
                formStage === UnsecuredLoanFormStage.ExpenditureStage && (
                    <ExpenditureStage/>
                )
            }
            {
                formStage === UnsecuredLoanFormStage.OtherIncomeStage && (
                    <OtherIncomeStage/>
                )
            }
            {
                formStage === UnsecuredLoanFormStage.MarketingConsentStage && (
                    <MarketingConsentStage/>
                )
            }
            {
                formStage === UnsecuredLoanFormStage.PayloadStage && (
                    <PayloadStage/>
                )
            }
        </>
    );
};

export default UnsecuredForm;