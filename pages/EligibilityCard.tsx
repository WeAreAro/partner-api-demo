'use client';

import {useEffect} from "react";
import Head from "next/head";
import Header from "@/app/components/Header";
import {
    EligibilityCardFormStage,
    EligibilityPanelType,
    EligibilityPrimaryAddressPayloadSetters,
    EligibilityPrimaryAddressStages,
    useEligibilityStageStore
} from "@/app/state/eligibility_stages";
import '../app/globals.css'
import EligibilityAllOffersPayloadStage from "@/app/components/stages/eligibility/EligibilityAllOffersPayloadStage";
import EligibilityAboutYouStage from "@/app/components/stages/eligibility/EligibilityAboutYouStage";
import EligibilityCardStage from "@/app/components/stages/eligibility/EligibilityCardStage";
import EligibilityMarketingConsentStage from "@/app/components/stages/eligibility/EligibilityMarketingConsentStage";
import EligibilityCurrentEmploymentStage from "@/app/components/stages/eligibility/EligibilityCurrentEmploymentStage";
import EligibilityExpenditureStage from "@/app/components/stages/eligibility/EligibilityExpenditureStage";
import EligibilityOtherIncomeStage from "@/app/components/stages/eligibility/EligibilityOtherIncomeStage";
import EligibilityPrimaryAddressStage from "@/app/components/stages/eligibility/EligibilityPrimaryAddressStage";
import EligibilityPartnerDetailsStage from "@/app/components/stages/eligibility/EligibilityPartnerDetailsStage";
import EligibilityOfferTilesStage from "@/app/components/stages/eligibility/EligibilityOfferTilesStage";
import EligibilityProceedPayloadStage from "@/app/components/stages/eligibility/EligibilityProceedPayloadStage";

const EligibilityCard = () => {
    const formStage = useEligibilityStageStore((state) => state.currentStage);

    const setPanelType = useEligibilityStageStore((state) => state.setPanelType)

    useEffect(() => setPanelType(EligibilityPanelType.CREDITCARD))

    return (
        <><Head>
            <title>Apply for a Credit Card</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon"/>
        </Head>
            <Header showNav={false} headerBackgroundColor={"#3C0B5D"}
                    headerTitle={"Eligibility API - Credit Card Offers"}/>
            {
                formStage === EligibilityCardFormStage.PartnerDetailsStage && (
                    <EligibilityPartnerDetailsStage/>
                )
            }
            {
                formStage === EligibilityCardFormStage.CardStage && (
                    <EligibilityCardStage/>
                )
            }
            {
                formStage === EligibilityCardFormStage.AboutYouStage && (
                    <EligibilityAboutYouStage/>
                )
            }
            {
                formStage === EligibilityCardFormStage.CurrentAddressStage && (
                    <EligibilityPrimaryAddressStage title={"Current Address"}
                                                    addressPayloadName={EligibilityPrimaryAddressStages.CURRENT_ADDRESS}
                                                    addressPayloadSetter={EligibilityPrimaryAddressPayloadSetters.CURRENT_ADDRESS}/>
                )
            }
            {
                formStage === EligibilityCardFormStage.EmploymentStage && (
                    <EligibilityCurrentEmploymentStage/>
                )
            }
            {
                formStage === EligibilityCardFormStage.ExpenditureStage && (
                    <EligibilityExpenditureStage/>
                )
            }
            {
                formStage === EligibilityCardFormStage.OtherIncomeStage && (
                    <EligibilityOtherIncomeStage/>
                )
            }
            {
                formStage === EligibilityCardFormStage.MarketingConsentStage && (
                    <EligibilityMarketingConsentStage/>
                )
            }
            {
                formStage === EligibilityCardFormStage.PayloadStage && (
                    <EligibilityAllOffersPayloadStage/>
                )
            }
            {
                formStage === EligibilityCardFormStage.OfferTilesStage && (
                    <EligibilityOfferTilesStage/>
                )
            }
            {
                formStage === EligibilityCardFormStage.ProceedOfferStage && (
                    <EligibilityProceedPayloadStage/>
                )
            }
        </>
    );
}

export default EligibilityCard;