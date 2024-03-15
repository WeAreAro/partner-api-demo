'use client';

import {useEffect} from "react";
import Head from "next/head";
import Header from "@/app/components/Header";
import {
    EligibilityLoanFormStage,
    EligibilityPanelType,
    EligibilityPrimaryAddressPayloadSetters,
    EligibilityPrimaryAddressStages,
    useEligibilityStageStore
} from "@/app/state/eligibility_stages";
import '../app/globals.css'
import EligibilityLoanStage from "@/app/components/stages/eligibility/EligibilityLoanStage";
import EligibilityAllOffersPayloadStage from "@/app/components/stages/eligibility/EligibilityAllOffersPayloadStage";
import EligibilityAboutYouStage from "@/app/components/stages/eligibility/EligibilityAboutYouStage";
import EligibilityMarketingConsentStage from "@/app/components/stages/eligibility/EligibilityMarketingConsentStage";
import EligibilityCurrentEmploymentStage from "@/app/components/stages/eligibility/EligibilityCurrentEmploymentStage";
import EligibilityExpenditureStage from "@/app/components/stages/eligibility/EligibilityExpenditureStage";
import EligibilityOtherIncomeStage from "@/app/components/stages/eligibility/EligibilityOtherIncomeStage";
import EligibilityPrimaryAddressStage from "@/app/components/stages/eligibility/EligibilityPrimaryAddressStage";
import EligibilityPartnerDetailsStage from "@/app/components/stages/eligibility/EligibilityPartnerDetailsStage";
import EligibilityOfferTilesStage from "@/app/components/stages/eligibility/EligibilityOfferTilesStage";
import EligibilityProceedPayloadStage from "@/app/components/stages/eligibility/EligibilityProceedPayloadStage";

const EligibilityAll = () => {
    const formStage = useEligibilityStageStore((state) => state.currentStage);

    const setPanelType = useEligibilityStageStore((state) => state.setPanelType)

    useEffect(() => setPanelType(EligibilityPanelType.ALL))

    return (
        <><Head>
            <title>Apply for a Loan</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon"/>
        </Head>
            <Header showNav={false} headerBackgroundColor={"#3C0B5D"} headerTitle={"Eligibility API - All Offers"}/>
            <span style={{display: "none"}}>{formStage}</span>
            {
                formStage === EligibilityLoanFormStage.PartnerDetailsStage && (
                    <EligibilityPartnerDetailsStage/>
                )
            }
            {
                formStage === EligibilityLoanFormStage.LoanStage && (
                    <EligibilityLoanStage/>
                )
            }
            {
                formStage === EligibilityLoanFormStage.AboutYouStage && (
                    <EligibilityAboutYouStage/>
                )
            }
            {
                formStage === EligibilityLoanFormStage.CurrentAddressStage && (
                    <EligibilityPrimaryAddressStage title={"Current Address"}
                                                    addressPayloadName={EligibilityPrimaryAddressStages.CURRENT_ADDRESS}
                                                    addressPayloadSetter={EligibilityPrimaryAddressPayloadSetters.CURRENT_ADDRESS}/>
                )
            }
            {
                formStage === EligibilityLoanFormStage.EmploymentStage && (
                    <EligibilityCurrentEmploymentStage/>
                )
            }
            {
                formStage === EligibilityLoanFormStage.ExpenditureStage && (
                    <EligibilityExpenditureStage/>
                )
            }
            {
                formStage === EligibilityLoanFormStage.OtherIncomeStage && (
                    <EligibilityOtherIncomeStage/>
                )
            }
            {
                formStage === EligibilityLoanFormStage.MarketingConsentStage && (
                    <EligibilityMarketingConsentStage/>
                )
            }
            {
                formStage === EligibilityLoanFormStage.PayloadStage && (
                    <EligibilityAllOffersPayloadStage/>
                )
            }
            {
                formStage === EligibilityLoanFormStage.OfferTilesStage && (
                    <EligibilityOfferTilesStage/>
                )
            }
            {
                formStage === EligibilityLoanFormStage.ProceedOfferStage && (
                    <EligibilityProceedPayloadStage/>
                )
            }
        </>
    );
}

export default EligibilityAll;