'use client';

import {useEffect} from "react";
import Head from "next/head";
import Header from "@/app/components/Header";
import {
    EmbeddedLoanFormStage,
    EmbeddedPanelType,
    EmbeddedPrimaryAddressPayloadSetters,
    EmbeddedPrimaryAddressStages,
    useEmbeddedStageStore
} from "@/app/state/embedded_stages";
import '../app/globals.css'
import EmbeddedLoanStage from "@/app/components/stages/embedded/EmbeddedLoanStage";
import EmbeddedAllOffersPayloadStage from "@/app/components/stages/embedded/EmbeddedAllOffersPayloadStage";
import EmbeddedAboutYouStage from "@/app/components/stages/embedded/EmbeddedAboutYouStage";
import EmbeddedMarketingConsentStage from "@/app/components/stages/embedded/EmbeddedMarketingConsentStage";
import EmbeddedCurrentEmploymentStage from "@/app/components/stages/embedded/EmbeddedCurrentEmploymentStage";
import EmbeddedExpenditureStage from "@/app/components/stages/embedded/EmbeddedExpenditureStage";
import EmbeddedOtherIncomeStage from "@/app/components/stages/embedded/EmbeddedOtherIncomeStage";
import EmbeddedPrimaryAddressStage from "@/app/components/stages/embedded/EmbeddedPrimaryAddressStage";
import EmbeddedPartnerDetailsStage from "@/app/components/stages/embedded/EmbeddedPartnerDetailsStage";
import EmbeddedOfferTilesStage from "@/app/components/stages/embedded/EmbeddedOfferTilesStage";
import EmbeddedProceedPayloadStage from "@/app/components/stages/embedded/EmbeddedProceedPayloadStage";

const EmbeddedAll = () => {
    const formStage = useEmbeddedStageStore((state) => state.currentStage);

    const setPanelType = useEmbeddedStageStore((state) => state.setPanelType)

    useEffect(() => setPanelType(EmbeddedPanelType.ALL))

    return (
        <><Head>
            <title>Apply for a Loan</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon"/>
        </Head>
            <Header showNav={false} headerBackgroundColor={"#3C0B5D"} headerTitle={"Eligibility API - All Offers"}/>
            <span style={{display: "none"}}>{formStage}</span>
            {
                formStage === EmbeddedLoanFormStage.PartnerDetailsStage && (
                    <EmbeddedPartnerDetailsStage/>
                )
            }
            {
                formStage === EmbeddedLoanFormStage.LoanStage && (
                    <EmbeddedLoanStage/>
                )
            }
            {
                formStage === EmbeddedLoanFormStage.AboutYouStage && (
                    <EmbeddedAboutYouStage/>
                )
            }
            {
                formStage === EmbeddedLoanFormStage.CurrentAddressStage && (
                    <EmbeddedPrimaryAddressStage title={"Current Address"}
                                                 addressPayloadName={EmbeddedPrimaryAddressStages.CURRENT_ADDRESS}
                                                 addressPayloadSetter={EmbeddedPrimaryAddressPayloadSetters.CURRENT_ADDRESS}/>
                )
            }
            {
                formStage === EmbeddedLoanFormStage.EmploymentStage && (
                    <EmbeddedCurrentEmploymentStage/>
                )
            }
            {
                formStage === EmbeddedLoanFormStage.ExpenditureStage && (
                    <EmbeddedExpenditureStage/>
                )
            }
            {
                formStage === EmbeddedLoanFormStage.OtherIncomeStage && (
                    <EmbeddedOtherIncomeStage/>
                )
            }
            {
                formStage === EmbeddedLoanFormStage.MarketingConsentStage && (
                    <EmbeddedMarketingConsentStage/>
                )
            }
            {
                formStage === EmbeddedLoanFormStage.PayloadStage && (
                    <EmbeddedAllOffersPayloadStage/>
                )
            }
            {
                formStage === EmbeddedLoanFormStage.OfferTilesStage && (
                    <EmbeddedOfferTilesStage/>
                )
            }
            {
                formStage === EmbeddedLoanFormStage.ProceedOfferStage && (
                    <EmbeddedProceedPayloadStage/>
                )
            }
        </>
    );
}

export default EmbeddedAll;