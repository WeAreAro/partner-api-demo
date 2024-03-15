'use client';

import {useEffect} from "react";
import Head from "next/head";
import Header from "@/app/components/Header";
import {
    EligibilityJointAddressPayloadSetters,
    EligibilityJointAddressStages,
    EligibilityPanelType,
    EligibilityPrimaryAddressPayloadSetters,
    EligibilityPrimaryAddressStages,
    EligibilitySecuredFormStage,
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
import EligibilityPropertyDetails from "@/app/components/stages/eligibility/EligibilityPropertyDetails";
import EligibilityLoanStage from "@/app/components/stages/eligibility/EligibilityLoanStage";
import EligibilityOfferTilesStage from "@/app/components/stages/eligibility/EligibilityOfferTilesStage";
import EligibilityProceedPayloadStage from "@/app/components/stages/eligibility/EligibilityProceedPayloadStage";
import EligibilityJointAboutYouStage from "@/app/components/stages/eligibility/EligibilityJointAboutYouStage";
import EligibilityJointCurrentEmploymentStage
    from "@/app/components/stages/eligibility/EligibilityJointCurrentEmploymentStage";
import EligibilityJointOtherIncomeStage from "@/app/components/stages/eligibility/EligibilityJointOtherIncomeStage";
import EligibilityJointAddressStage from "@/app/components/stages/eligibility/EligibilityJointAddressStage";

const EligibilitySecured = () => {
    const formStage = useEligibilityStageStore((state) => state.currentStage);

    const setPanelType = useEligibilityStageStore((state) => state.setPanelType)

    useEffect(() => setPanelType(EligibilityPanelType.SECURED))

    return (
        <><Head>
            <title>Apply for a Secured loan</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon"/>
        </Head>
            <Header showNav={false} headerBackgroundColor={"#3C0B5D"} headerTitle={"Eligibility API - Secured Offers"}/>
            {
                formStage === EligibilitySecuredFormStage.PartnerDetailsStage && (
                    <EligibilityPartnerDetailsStage/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.LoanStage && (
                    <EligibilityLoanStage/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.PropertyDetailsStage && (
                    <EligibilityPropertyDetails/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.AboutYouStage && (
                    <EligibilityAboutYouStage/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.CurrentAddressStage && (
                    <EligibilityPrimaryAddressStage title={"Current Address"}
                                                    addressPayloadName={EligibilityPrimaryAddressStages.CURRENT_ADDRESS}
                                                    addressPayloadSetter={EligibilityPrimaryAddressPayloadSetters.CURRENT_ADDRESS}/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.EmploymentStage && (
                    <EligibilityCurrentEmploymentStage/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.ExpenditureStage && (
                    <EligibilityExpenditureStage/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.OtherIncomeStage && (
                    <EligibilityOtherIncomeStage/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.JointAboutYouStage && (
                    <EligibilityJointAboutYouStage/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.JointCurrentAddressStage && (
                    <EligibilityJointAddressStage title={"Joint Applicant - Current Address"}
                                                  addressPayloadName={EligibilityJointAddressStages.CURRENT_ADDRESS}
                                                  addressPayloadSetter={EligibilityJointAddressPayloadSetters.CURRENT_ADDRESS}/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.JointEmploymentStage && (
                    <EligibilityJointCurrentEmploymentStage/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.JointOtherIncomeStage && (
                    <EligibilityJointOtherIncomeStage/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.MarketingConsentStage && (
                    <EligibilityMarketingConsentStage/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.PayloadStage && (
                    <EligibilityAllOffersPayloadStage/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.OfferTilesStage && (
                    <EligibilityOfferTilesStage/>
                )
            }
            {
                formStage === EligibilitySecuredFormStage.ProceedOfferStage && (
                    <EligibilityProceedPayloadStage/>
                )
            }
        </>
    );
}

export default EligibilitySecured;