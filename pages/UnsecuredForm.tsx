'use client';

import Head from "next/head";
import {
    RedirectAddressPayloadSetters,
    RedirectAddressStages,
    RedirectFormType,
    RedirectUnsecuredLoanFormStage,
    useRedirectStageStore
} from "@/app/state/redirect_stages";
import AddressStage from "@/app/components/stages/redirect/AddressStage";
import CurrentEmploymentStage from "@/app/components/stages/redirect/CurrentEmploymentStage";
import ExpenditureStage from "@/app/components/stages/redirect/ExpenditureStage";
import MarketingConsentStage from "@/app/components/stages/redirect/MarketingConsentStage";
import PayloadStage from "@/app/components/stages/redirect/PayloadStage";

import '../app/globals.css'
import Header from "@/app/components/Header";
import OtherIncomeStage from "@/app/components/stages/redirect/OtherIncomeStage";
import LoanStage from "@/app/components/stages/redirect/LoanStage";
import {useEffect} from "react";
import AboutYouStage from "@/app/components/stages/redirect/AboutYouStage";
import PartnerDetailsStage from "@/app/components/stages/redirect/PartnerDetailsStage";

const UnsecuredForm = () => {
    const formStage = useRedirectStageStore((state) => state.currentStage);

    const setFormType = useRedirectStageStore((state) => state.setFormType)

    useEffect(() => setFormType(RedirectFormType.UNSECURED_LOAN), [])

    return (
        <><Head>
            <title>Apply for an Unsecured Loan</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon"/>
        </Head>
            <Header showNav={false} headerTitle={"Redirect API - Unsecured Loan"}/>
            {
                formStage === RedirectUnsecuredLoanFormStage.PartnerDetailsStage && (
                    <PartnerDetailsStage/>
                )
            }
            {
                formStage === RedirectUnsecuredLoanFormStage.LoanStage && (
                    <LoanStage/>
                )
            }
            {
                formStage === RedirectUnsecuredLoanFormStage.AboutYouStage && (
                    <AboutYouStage/>
                )
            }
            {
                formStage === RedirectUnsecuredLoanFormStage.CurrentAddressStage && (
                    <AddressStage title={"Current Address"} addressPayloadName={RedirectAddressStages.CURRENT_ADDRESS}
                                  addressPayloadSetter={RedirectAddressPayloadSetters.CURRENT_ADDRESS}/>
                )
            }
            {
                formStage === RedirectUnsecuredLoanFormStage.EmploymentStage && (
                    <CurrentEmploymentStage/>
                )
            }
            {
                formStage === RedirectUnsecuredLoanFormStage.ExpenditureStage && (
                    <ExpenditureStage/>
                )
            }
            {
                formStage === RedirectUnsecuredLoanFormStage.OtherIncomeStage && (
                    <OtherIncomeStage/>
                )
            }
            {
                formStage === RedirectUnsecuredLoanFormStage.MarketingConsentStage && (
                    <MarketingConsentStage/>
                )
            }
            {
                formStage === RedirectUnsecuredLoanFormStage.PayloadStage && (
                    <PayloadStage/>
                )
            }
        </>
    );
};

export default UnsecuredForm;