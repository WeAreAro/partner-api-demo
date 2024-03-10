'use client';

import Head from "next/head";
import {
    RedirectAddressPayloadSetters,
    RedirectAddressStages,
    RedirectCardFormStage,
    RedirectFormType,
    useRedirectStageStore
} from "@/app/state/redirect_stages";
import AddressStage from "@/app/components/stages/redirect/AddressStage";
import CurrentEmploymentStage from "@/app/components/stages/redirect/CurrentEmploymentStage";
import ExpenditureStage from "@/app/components/stages/redirect/ExpenditureStage";
import MarketingConsentStage from "@/app/components/stages/redirect/MarketingConsentStage";
import PayloadStage from "@/app/components/stages/redirect/PayloadStage";

import '../app/globals.css'
import Header from "@/app/components/Header";
import {useEffect} from "react";
import AboutYouStage from "@/app/components/stages/redirect/AboutYouStage";
import CardStage from "@/app/components/stages/redirect/CardStage";

const CardForm = () => {
    const formStage = useRedirectStageStore((state) => state.currentStage) as RedirectCardFormStage;

    const setFormType = useRedirectStageStore((state) => state.setFormType)

    useEffect(() => setFormType(RedirectFormType.CARD), [])

    return (
        <><Head>
            <title>Apply for Credit Card</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon"/>
        </Head>
            <Header showNav={false}/>
            {
                formStage === RedirectCardFormStage.CardStage && (
                    <CardStage/>
                )
            }
            {
                formStage === RedirectCardFormStage.AboutYouStage && (
                    <AboutYouStage/>
                )
            }
            {
                formStage === RedirectCardFormStage.CurrentAddressStage && (
                    <AddressStage title={"Current Address"} addressPayloadName={RedirectAddressStages.CURRENT_ADDRESS}
                                  addressPayloadSetter={RedirectAddressPayloadSetters.CURRENT_ADDRESS}/>
                )
            }
            {
                formStage === RedirectCardFormStage.FirstPreviousAddressStage && (
                    <AddressStage
                        title={"Due to living at your current address for under three years, you must provide your last previous address."}
                        addressPayloadName={RedirectAddressStages.FIRST_PREVIOUS_ADDRESS}
                        addressPayloadSetter={RedirectAddressPayloadSetters.FIRST_PREVIOUS_ADDRESS}/>
                )
            }
            {
                formStage === RedirectCardFormStage.EmploymentStage && (
                    <CurrentEmploymentStage/>
                )
            }
            {
                formStage === RedirectCardFormStage.ExpenditureStage && (
                    <ExpenditureStage/>
                )
            }
            {
                formStage === RedirectCardFormStage.MarketingConsentStage && (
                    <MarketingConsentStage/>
                )
            }
            {
                formStage === RedirectCardFormStage.PayloadStage && (
                    <PayloadStage/>
                )
            }
        </>
    );
};

export default CardForm;