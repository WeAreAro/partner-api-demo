'use client';

import Head from "next/head";
import { AddressStages, useStageStore, AddressPayloadSetters, FormType, CardFormStage } from "@/app/state/stages";
import AddressStage from "@/app/components/stages/AddressStage";
import CurrentEmploymentStage from "@/app/components/stages/CurrentEmploymentStage";
import ExpenditureStage from "@/app/components/stages/ExpenditureStage";
import BankDetailsStage from "@/app/components/stages/BankDetailsStage";
import MarketingConsentStage from "@/app/components/stages/MarketingConsentStage";
import PayloadStage from "@/app/components/stages/PayloadStage";

import '../app/globals.css'
import Header from "@/app/components/Header";
import { useEffect } from "react";
import AboutYouStage from "@/app/components/stages/AboutYouStage";
import CardStage from "@/app/components/stages/CardStage";

const CardForm = () => {
    const formStage = useStageStore((state) => state.currentStage) as CardFormStage;

    const setFormType = useStageStore((state) => state.setFormType)

    useEffect(() => setFormType(FormType.CARD), [])

    return (
        <><Head>
            <title>Apply for Credit Card</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
        </Head>
            <Header showNav={false} />
            {
                formStage === CardFormStage.CardStage && (
                    <CardStage />
                )
            }
            {
                formStage === CardFormStage.AboutYouStage && (
                    <AboutYouStage />
                )
            }
            {
                formStage === CardFormStage.CurrentAddressStage && (
                    <AddressStage title={"Current Address"} addressPayloadName={AddressStages.CURRENT_ADDRESS}
                        addressPayloadSetter={AddressPayloadSetters.CURRENT_ADDRESS} />
                )
            }
            {
                formStage === CardFormStage.FirstPreviousAddressStage && (
                    <AddressStage title={"Due to living at your current address for under three years, you must provide your last previous address."} addressPayloadName={AddressStages.FIRST_PREVIOUS_ADDRESS}
                        addressPayloadSetter={AddressPayloadSetters.FIRST_PREVIOUS_ADDRESS} />
                )
            }
            {
                formStage === CardFormStage.EmploymentStage && (
                    <CurrentEmploymentStage />
                )
            }
            {
                formStage === CardFormStage.ExpenditureStage && (
                    <ExpenditureStage />
                )
            }
            {
                formStage === CardFormStage.BankDetailsStage && (
                    <BankDetailsStage />
                )
            }
            {
                formStage === CardFormStage.MarketingConsentStage && (
                    <MarketingConsentStage />
                )
            }
            {
                formStage === CardFormStage.PayloadStage && (
                    <PayloadStage />
                )
            }
        </>
    );
};

export default CardForm;