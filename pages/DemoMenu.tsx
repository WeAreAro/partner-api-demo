'use client';

import Head from "next/head";

import '../app/globals.css'
import Header from "@/app/components/Header";
import DemoMenuChoice from "@/app/components/DemoMenuChoice";
import {BsCashCoin, BsCreditCard, BsHouseFill} from "react-icons/bs";
import React from "react";
import {FaCarSide} from "react-icons/fa6";

const DemoMenu = () => {
    return (
        <><Head>
            <title>Aro API Demo</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon"/>
        </Head>
            <Header showNav={false} headerTitle={"Aro API Demo"}/>
            <div className="api-menu-title">Redirect API Examples</div>
            <div className="api-menu-container">
                <div className="api-menu-item">
                    <DemoMenuChoice title={"Unsecured Loan Offers"}
                                    location={"/UnsecuredForm"}
                                    backgroundColor={"#DFFEFF"}>
                        <BsCashCoin style={{fontSize: 50}}/>
                    </DemoMenuChoice>
                </div>
                <div className="api-menu-item">
                    <DemoMenuChoice title={"Credit Card Offers"}
                                    location={"/CardForm"}
                                    backgroundColor={"#DFFEFF"}>
                        <BsCreditCard style={{fontSize: 50}}/>
                    </DemoMenuChoice>
                </div>
            </div>
            <div className="api-menu-title">Eligibility API Examples</div>
            <div className="api-menu-container">
                <div className="api-menu-item">
                    <DemoMenuChoice title={"All Offers"}
                                    location={"/EligibilityAll"}
                                    backgroundColor={"#F1DAFF"}>
                        <BsCashCoin style={{fontSize: 50}}/>
                    </DemoMenuChoice>
                </div>
                <div className="api-menu-item">
                    <DemoMenuChoice title={"Credit Card Offers"}
                                    location={"/EligibilityCard"}
                                    backgroundColor={"#F1DAFF"}>
                        <BsCreditCard style={{fontSize: 50}}/>
                    </DemoMenuChoice>
                </div>
                <div className="api-menu-item">
                    <DemoMenuChoice title={"Auto Finance Offers"}
                                    location={"/EligibilityAutoFinance"}
                                    backgroundColor={"#F1DAFF"}>
                        <FaCarSide style={{fontSize: 50}}/>
                    </DemoMenuChoice>
                </div>
                <div className="api-menu-item">
                    <DemoMenuChoice title={"Secured Offers"}
                                    location={"/EligibilitySecured"}
                                    backgroundColor={"#F1DAFF"}>
                        <BsHouseFill style={{fontSize: 50}}/>
                    </DemoMenuChoice>
                </div>
            </div>
            <br/>
        </>
    );
};

export default DemoMenu;