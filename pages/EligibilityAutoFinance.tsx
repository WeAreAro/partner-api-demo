'use client';

import {useEffect} from "react";
import Head from "next/head";
import Header from "@/app/components/Header";
import {
    EligibilityAutoFinanceFormStage,
    EligibilityPanelType,
    EligibilityPrimaryAddressPayloadSetters,
    EligibilityPrimaryAddressStages,
    useEligibilityStageStore
} from "@/app/state/eligibility_stages";
import '../app/globals.css'
import EligibilityAllOffersPayloadStage from "@/app/components/stages/eligibility/EligibilityAllOffersPayloadStage";
import EligibilityAboutYouStage from "@/app/components/stages/eligibility/EligibilityAboutYouStage";
import EligibilityMarketingConsentStage from "@/app/components/stages/eligibility/EligibilityMarketingConsentStage";
import EligibilityCurrentEmploymentStage from "@/app/components/stages/eligibility/EligibilityCurrentEmploymentStage";
import EligibilityExpenditureStage from "@/app/components/stages/eligibility/EligibilityExpenditureStage";
import EligibilityOtherIncomeStage from "@/app/components/stages/eligibility/EligibilityOtherIncomeStage";
import EligibilityPrimaryAddressStage from "@/app/components/stages/eligibility/EligibilityPrimaryAddressStage";
import EligibilityPartnerDetailsStage from "@/app/components/stages/eligibility/EligibilityPartnerDetailsStage";
import EligibilityOfferTilesStage from "@/app/components/stages/eligibility/EligibilityOfferTilesStage";
import EligibilityVehicleDetailsStage from "@/app/components/stages/eligibility/EligibilityVehicleDetailsStage";
import EligibilityLoanStage from "@/app/components/stages/eligibility/EligibilityLoanStage";
import EligibilityProceedPayloadStage from "@/app/components/stages/eligibility/EligibilityProceedPayloadStage";

const EligibilityAutoFinance = () => {
    const formStage = useEligibilityStageStore((state) => state.currentStage);

    const setPanelType = useEligibilityStageStore((state) => state.setPanelType)

    useEffect(() => setPanelType(EligibilityPanelType.AUTOFINANCE))

    return (
        <><Head>
            <title>Apply for Auto Finance</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon"/>
        </Head>
            <Header showNav={false} headerBackgroundColor={"#3C0B5D"}
                    headerTitle={"Eligibility API - Auto Finance Offers"}/>
            {
                formStage === EligibilityAutoFinanceFormStage.PartnerDetailsStage && (
                    <EligibilityPartnerDetailsStage/>
                )
            }
            {
                formStage === EligibilityAutoFinanceFormStage.LoanStage && (
                    <EligibilityLoanStage/>
                )
            }
            {
                formStage === EligibilityAutoFinanceFormStage.VehicleDetailsStage && (
                    <EligibilityVehicleDetailsStage/>
                )
            }
            {
                formStage === EligibilityAutoFinanceFormStage.AboutYouStage && (
                    <EligibilityAboutYouStage/>
                )
            }
            {
                formStage === EligibilityAutoFinanceFormStage.CurrentAddressStage && (
                    <EligibilityPrimaryAddressStage title={"Current Address"}
                                                    addressPayloadName={EligibilityPrimaryAddressStages.CURRENT_ADDRESS}
                                                    addressPayloadSetter={EligibilityPrimaryAddressPayloadSetters.CURRENT_ADDRESS}/>
                )
            }
            {
                formStage === EligibilityAutoFinanceFormStage.EmploymentStage && (
                    <EligibilityCurrentEmploymentStage/>
                )
            }
            {
                formStage === EligibilityAutoFinanceFormStage.ExpenditureStage && (
                    <EligibilityExpenditureStage/>
                )
            }
            {
                formStage === EligibilityAutoFinanceFormStage.OtherIncomeStage && (
                    <EligibilityOtherIncomeStage/>
                )
            }
            {
                formStage === EligibilityAutoFinanceFormStage.MarketingConsentStage && (
                    <EligibilityMarketingConsentStage/>
                )
            }
            {
                formStage === EligibilityAutoFinanceFormStage.PayloadStage && (
                    <EligibilityAllOffersPayloadStage/>
                )
            }
            {
                formStage === EligibilityAutoFinanceFormStage.OfferTilesStage && (
                    <EligibilityOfferTilesStage/>
                )
            }
            {
                formStage === EligibilityAutoFinanceFormStage.ProceedOfferStage && (
                    <EligibilityProceedPayloadStage/>
                )
            }
        </>
    );
}

export default EligibilityAutoFinance;