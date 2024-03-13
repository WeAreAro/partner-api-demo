'use client';

import {useEffect} from "react";
import Head from "next/head";
import Header from "@/app/components/Header";
import {
    EmbeddedAutoFinanceFormStage,
    EmbeddedPanelType,
    EmbeddedPrimaryAddressPayloadSetters,
    EmbeddedPrimaryAddressStages,
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
import EmbeddedOfferTilesStage from "@/app/components/stages/embedded/EmbeddedOfferTilesStage";
import EmbeddedVehicleDetailsStage from "@/app/components/stages/embedded/EmbeddedVehicleDetailsStage";
import EmbeddedLoanStage from "@/app/components/stages/embedded/EmbeddedLoanStage";

const EmbeddedAutoFinance = () => {
    const formStage = useEmbeddedStageStore((state) => state.currentStage);

    const setPanelType = useEmbeddedStageStore((state) => state.setPanelType)

    useEffect(() => setPanelType(EmbeddedPanelType.AUTOFINANCE))

    return (
        <><Head>
            <title>Apply for Auto Finance</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon"/>
        </Head>
            <Header showNav={false} headerBackgroundColor={"black"}/>
            {
                formStage === EmbeddedAutoFinanceFormStage.PartnerDetailsStage && (
                    <EmbeddedPartnerDetailsStage/>
                )
            }
            {
                formStage === EmbeddedAutoFinanceFormStage.LoanStage && (
                    <EmbeddedLoanStage/>
                )
            }
            {
                formStage === EmbeddedAutoFinanceFormStage.VehicleDetailsStage && (
                    <EmbeddedVehicleDetailsStage/>
                )
            }
            {
                formStage === EmbeddedAutoFinanceFormStage.AboutYouStage && (
                    <EmbeddedAboutYouStage/>
                )
            }
            {
                formStage === EmbeddedAutoFinanceFormStage.CurrentAddressStage && (
                    <EmbeddedPrimaryAddressStage title={"Current Address"}
                                                 addressPayloadName={EmbeddedPrimaryAddressStages.CURRENT_ADDRESS}
                                                 addressPayloadSetter={EmbeddedPrimaryAddressPayloadSetters.CURRENT_ADDRESS}/>
                )
            }
            {
                formStage === EmbeddedAutoFinanceFormStage.FirstPreviousAddressStage && (
                    <EmbeddedPrimaryAddressStage
                        title={"Due to living at your current address for under three years, you must provide your last previous address."}
                        addressPayloadName={EmbeddedPrimaryAddressStages.FIRST_PREVIOUS_ADDRESS}
                        addressPayloadSetter={EmbeddedPrimaryAddressPayloadSetters.FIRST_PREVIOUS_ADDRESS}/>
                )
            }
            {
                formStage === EmbeddedAutoFinanceFormStage.SecondPreviousAddressStage && (
                    <EmbeddedPrimaryAddressStage
                        title={"Due to living at your current and previous address for under three years, you must provide your second to last address."}
                        addressPayloadName={EmbeddedPrimaryAddressStages.SECOND_PREVIOUS_ADDRESS}
                        addressPayloadSetter={EmbeddedPrimaryAddressPayloadSetters.SECOND_PREVIOUS_ADDRESS}/>
                )
            }
            {
                formStage === EmbeddedAutoFinanceFormStage.EmploymentStage && (
                    <EmbeddedCurrentEmploymentStage/>
                )
            }
            {
                formStage === EmbeddedAutoFinanceFormStage.ExpenditureStage && (
                    <EmbeddedExpenditureStage/>
                )
            }
            {
                formStage === EmbeddedAutoFinanceFormStage.OtherIncomeStage && (
                    <EmbeddedOtherIncomeStage/>
                )
            }
            {
                formStage === EmbeddedAutoFinanceFormStage.MarketingConsentStage && (
                    <EmbeddedMarketingConsentStage/>
                )
            }
            {
                formStage === EmbeddedAutoFinanceFormStage.PayloadStage && (
                    <EmbeddedAllOffersPayloadStage/>
                )
            }
            {
                formStage === EmbeddedAutoFinanceFormStage.OfferTilesStage && (
                    <EmbeddedOfferTilesStage/>
                )
            }
        </>
    );
}

export default EmbeddedAutoFinance;