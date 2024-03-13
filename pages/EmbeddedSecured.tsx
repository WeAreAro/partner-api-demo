'use client';

import {useEffect} from "react";
import Head from "next/head";
import Header from "@/app/components/Header";
import {
    EmbeddedPanelType,
    EmbeddedPrimaryAddressPayloadSetters,
    EmbeddedPrimaryAddressStages,
    EmbeddedSecuredFormStage,
    useEmbeddedStageStore
} from "@/app/state/embedded_stages";
import '../app/globals.css'
import EmbeddedAllOffersPayloadStage from "@/app/components/stages/embedded/EmbeddedAllOffersPayloadStage";
import EmbeddedAboutYouStage from "@/app/components/stages/embedded/EmbeddedAboutYouStage";
import EmbeddedMarketingConsentStage from "@/app/components/stages/embedded/EmbeddedMarketingConsentStage";
import EmbeddedCurrentEmploymentStage from "@/app/components/stages/embedded/EmbeddedCurrentEmploymentStage";
import EmbeddedExpenditureStage from "@/app/components/stages/embedded/EmbeddedExpenditureStage";
import EmbeddedOtherIncomeStage from "@/app/components/stages/embedded/EmbeddedOtherIncomeStage";
import EmbeddedPrimaryAddressStage from "@/app/components/stages/embedded/EmbeddedPrimaryAddressStage";
import EmbeddedPartnerDetailsStage from "@/app/components/stages/embedded/EmbeddedPartnerDetailsStage";
import EmbeddedPropertyDetails from "@/app/components/stages/embedded/EmbeddedPropertyDetails";
import EmbeddedLoanStage from "@/app/components/stages/embedded/EmbeddedLoanStage";
import EmbeddedOfferTilesStage from "@/app/components/stages/embedded/EmbeddedOfferTilesStage";
import EmbeddedProceedPayloadStage from "@/app/components/stages/embedded/EmbeddedProceedPayloadStage";

const EmbeddedSecured = () => {
    const formStage = useEmbeddedStageStore((state) => state.currentStage);

    const setPanelType = useEmbeddedStageStore((state) => state.setPanelType)

    useEffect(() => setPanelType(EmbeddedPanelType.SECURED))

    return (
        <><Head>
            <title>Apply for a Secured loan</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon"/>
        </Head>
            <Header showNav={false} headerBackgroundColor={"black"}/>
            {
                formStage === EmbeddedSecuredFormStage.PartnerDetailsStage && (
                    <EmbeddedPartnerDetailsStage/>
                )
            }
            {
                formStage === EmbeddedSecuredFormStage.LoanStage && (
                    <EmbeddedLoanStage/>
                )
            }
            {
                formStage === EmbeddedSecuredFormStage.PropertyDetailsStage && (
                    <EmbeddedPropertyDetails/>
                )
            }
            {
                formStage === EmbeddedSecuredFormStage.AboutYouStage && (
                    <EmbeddedAboutYouStage/>
                )
            }
            {
                formStage === EmbeddedSecuredFormStage.CurrentAddressStage && (
                    <EmbeddedPrimaryAddressStage title={"Current Address"}
                                                 addressPayloadName={EmbeddedPrimaryAddressStages.CURRENT_ADDRESS}
                                                 addressPayloadSetter={EmbeddedPrimaryAddressPayloadSetters.CURRENT_ADDRESS}/>
                )
            }
            {
                formStage === EmbeddedSecuredFormStage.FirstPreviousAddressStage && (
                    <EmbeddedPrimaryAddressStage
                        title={"Due to living at your current address for under three years, you must provide your last previous address."}
                        addressPayloadName={EmbeddedPrimaryAddressStages.FIRST_PREVIOUS_ADDRESS}
                        addressPayloadSetter={EmbeddedPrimaryAddressPayloadSetters.FIRST_PREVIOUS_ADDRESS}/>
                )
            }
            {
                formStage === EmbeddedSecuredFormStage.SecondPreviousAddressStage && (
                    <EmbeddedPrimaryAddressStage
                        title={"Due to living at your current and previous address for under three years, you must provide your second to last address."}
                        addressPayloadName={EmbeddedPrimaryAddressStages.SECOND_PREVIOUS_ADDRESS}
                        addressPayloadSetter={EmbeddedPrimaryAddressPayloadSetters.SECOND_PREVIOUS_ADDRESS}/>
                )
            }
            {
                formStage === EmbeddedSecuredFormStage.EmploymentStage && (
                    <EmbeddedCurrentEmploymentStage/>
                )
            }
            {
                formStage === EmbeddedSecuredFormStage.ExpenditureStage && (
                    <EmbeddedExpenditureStage/>
                )
            }
            {
                formStage === EmbeddedSecuredFormStage.OtherIncomeStage && (
                    <EmbeddedOtherIncomeStage/>
                )
            }
            {
                formStage === EmbeddedSecuredFormStage.MarketingConsentStage && (
                    <EmbeddedMarketingConsentStage/>
                )
            }
            {
                formStage === EmbeddedSecuredFormStage.PayloadStage && (
                    <EmbeddedAllOffersPayloadStage/>
                )
            }
            {
                formStage === EmbeddedSecuredFormStage.OfferTilesStage && (
                    <EmbeddedOfferTilesStage/>
                )
            }
            {
                formStage === EmbeddedSecuredFormStage.ProceedOfferStage && (
                    <EmbeddedProceedPayloadStage/>
                )
            }
        </>
    );
}

export default EmbeddedSecured;