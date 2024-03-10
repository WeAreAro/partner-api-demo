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
import EmbeddedPayloadStage from "@/app/components/stages/embedded/EmbeddedPayloadStage";
import EmbeddedAboutYouStage from "@/app/components/stages/embedded/EmbeddedAboutYouStage";
import EmbeddedMarketingConsentStage from "@/app/components/stages/embedded/EmbeddedMarketingConsentStage";
import EmbeddedCurrentEmploymentStage from "@/app/components/stages/embedded/EmbeddedCurrentEmploymentStage";
import EmbeddedExpenditureStage from "@/app/components/stages/embedded/EmbeddedExpenditureStage";
import EmbeddedOtherIncomeStage from "@/app/components/stages/embedded/EmbeddedOtherIncomeStage";
import EmbeddedPrimaryAddressStage from "@/app/components/stages/embedded/EmbeddedPrimaryAddressStage";

const EmbeddedAll = () => {
    const formStage = useEmbeddedStageStore((state) => state.currentStage);

    const setPanelType = useEmbeddedStageStore((state) => state.setPanelType)

    useEffect(() => setPanelType(EmbeddedPanelType.ALL))

    return (
        <><Head>
            <title>Apply for loan</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon"/>
        </Head>
            <Header showNav={false} headerBackgroundColor={"black"}/>
            <span style={{display: "none"}}>{formStage}</span>
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
                formStage === EmbeddedLoanFormStage.FirstPreviousAddressStage && (
                    <EmbeddedPrimaryAddressStage
                        title={"Due to living at your current address for under three years, you must provide your last previous address."}
                        addressPayloadName={EmbeddedPrimaryAddressStages.FIRST_PREVIOUS_ADDRESS}
                        addressPayloadSetter={EmbeddedPrimaryAddressPayloadSetters.FIRST_PREVIOUS_ADDRESS}/>
                )
            }
            {
                formStage === EmbeddedLoanFormStage.SecondPreviousAddressStage && (
                    <EmbeddedPrimaryAddressStage
                        title={"Due to living at your current and previous address for under three years, you must provide your second to last address."}
                        addressPayloadName={EmbeddedPrimaryAddressStages.SECOND_PREVIOUS_ADDRESS}
                        addressPayloadSetter={EmbeddedPrimaryAddressPayloadSetters.SECOND_PREVIOUS_ADDRESS}/>
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
                    <EmbeddedPayloadStage/>
                )
            }

        </>
    );
}

export default EmbeddedAll;