import {create,} from "zustand";
import {EmploymentIndustry} from "./enum/EmploymentIndustry";
import {
    EmploymentStatus,
    LoanPurpose,
    MaritalStatus,
    OtherIncomeDescription,
    OtherIncomePeriod,
    ResidentialStatus,
    Title,
    YesNoValue
} from "@/app/state/enum/Common";

export enum RedirectFormType {
    UNSECURED_LOAN,
    CARD
}

export type RedirectFormStageType = | RedirectUnsecuredLoanFormStage | RedirectCardFormStage;

export enum RedirectUnsecuredLoanFormStage {
    LoanStage = 1,
    AboutYouStage = 2,
    CurrentAddressStage = 3,
    FirstPreviousAddressStage = 4,
    SecondPreviousAddressStage = 5,
    EmploymentStage = 6,
    ExpenditureStage = 7,
    OtherIncomeStage = 8,
    MarketingConsentStage = 9,
    PayloadStage = 10,
}

export enum RedirectCardFormStage {
    CardStage = 1,
    AboutYouStage = 2,
    CurrentAddressStage = 3,
    FirstPreviousAddressStage = 4,
    EmploymentStage = 5,
    ExpenditureStage = 6,
    MarketingConsentStage = 7,
    PayloadStage = 8
}

export const REDIRECT_TOTAL_UNSECURED_STAGES = Object.keys(RedirectUnsecuredLoanFormStage).length / 2;

export const REDIRECT_TOTAL_CARD_STAGES = Object.keys(RedirectCardFormStage).length / 2;

export interface RedirectAboutYouPayload {
    title: Title,
    forename: string,
    surname: string,
    email: string,
    home_phone?: string,
    mobile_phone?: string,
    residential_status: ResidentialStatus,
    marital_status: MaritalStatus,
    dob: string,
    number_of_dependents: number,
    dependent_ages?: string
}

export type RedirectQuotePayload = | RedirectLoanPayload | RedirectCardPayload;

export interface RedirectCardPayload {
    cash_advance: string,
    balance_transfer: string,
    balance_to_transfer: number;
}

export interface RedirectLoanPayload {
    loan_amount: number,
    loan_term: number,
    loan_purpose: LoanPurpose
}

export interface RedirectAddressPayload {
    flat?: string,
    house_number?: string,
    house_name?: string,
    street: string,
    posttown?: string,
    locality?: string,
    country?: string,
    postcode: string,

    years_lived: number,
    months_lived: number
}


export interface RedirectEmploymentPayload {
    occupation?: string,
    employer_name?: string,
    employment_industry?: EmploymentIndustry,

    employment_status: EmploymentStatus,

    gross_income: number,
    emp_years: number,
    emp_months: number,

    other_household_income: number,
}

export interface RedirectExpenditurePayload {
    monthly_mortgage_rent: number,
    monthly_mortgage_rent_share?: number,
}

export interface RedirectMarketingConsentPayload {
    email_opt_in: YesNoValue,
    text_opt_in: YesNoValue,
}


export interface RedirectOtherIncome {
    income: number;
    income_description: OtherIncomeDescription;
    period: OtherIncomePeriod;
}

export interface RedirectOtherIncomePayload {
    income_1: number;
    description_1: OtherIncomeDescription;
    period_1: OtherIncomePeriod;

    income_2: number;
    description_2: OtherIncomeDescription;
    period_2: OtherIncomePeriod;
}

export enum RedirectAddressStages {
    CURRENT_ADDRESS = "currentAddressPayload",
    FIRST_PREVIOUS_ADDRESS = "firstPreviousAddressPayload",
    SECOND_PREVIOUS_ADDRESS = "secondPreviousAddressPayload"
}

export enum RedirectAddressPayloadSetters {
    CURRENT_ADDRESS = "setCurrentAddressPayload",
    FIRST_PREVIOUS_ADDRESS = "setFirstPreviousAddressPayload",
    SECOND_PREVIOUS_ADDRESS = "setSecondPreviousAddressPayload",
}

export interface RedirectStageState {
    formType: RedirectFormType

    currentStage: RedirectFormStageType
    previousStage: RedirectFormStageType

    quotePayload: RedirectQuotePayload
    aboutYouPayload: RedirectAboutYouPayload
    currentAddressPayload: RedirectAddressPayload
    firstPreviousAddressPayload: RedirectAddressPayload
    secondPreviousAddressPayload: RedirectAddressPayload
    currentEmploymentPayload: RedirectEmploymentPayload
    otherIncomePayload: RedirectOtherIncomePayload
    expenditurePayload: RedirectExpenditurePayload
    marketingConsentPayload: RedirectMarketingConsentPayload

    // --------------------------------

    setFormType: (formType: RedirectFormType) => void

    setCurrentStage: (currentStage: number) => void
    setPreviousStage: (previousStage: number) => void

    setAboutYouPayload: (payload: RedirectAboutYouPayload) => void
    setQuotePayload: (payload: RedirectQuotePayload) => void

    setCurrentAddressPayload: (payload: RedirectAddressPayload) => void
    setFirstPreviousAddressPayload: (payload: RedirectAddressPayload) => void
    setSecondPreviousAddressPayload: (payload: RedirectAddressPayload) => void

    setCurrentEmploymentPayload: (payload: RedirectEmploymentPayload) => void
    setOtherIncomePayload: (payload: RedirectOtherIncomePayload) => void

    setExpenditurePayload: (payload: RedirectExpenditurePayload) => void
    setMarketingConsentPayload: (payload: RedirectMarketingConsentPayload) => void

}

export const useRedirectStageStore = create<RedirectStageState>()((set) => ({
    formType: RedirectFormType.UNSECURED_LOAN,

    currentStage: RedirectUnsecuredLoanFormStage.LoanStage,
    previousStage: RedirectUnsecuredLoanFormStage.LoanStage,

    // ------------------------------------------------

    quotePayload: {} as RedirectQuotePayload,
    aboutYouPayload: {} as RedirectAboutYouPayload,

    currentAddressPayload: {} as RedirectAddressPayload,
    firstPreviousAddressPayload: {} as RedirectAddressPayload,
    secondPreviousAddressPayload: {} as RedirectAddressPayload,

    currentEmploymentPayload: {} as RedirectEmploymentPayload,
    otherIncomePayload: {} as RedirectOtherIncomePayload,

    expenditurePayload: {} as RedirectExpenditurePayload,
    marketingConsentPayload: {} as RedirectMarketingConsentPayload,

    // ------------------------------------------------

    setFormType: (formType) => set((state) => ({formType})),

    setCurrentStage: (currentStage) => set((state) => ({currentStage})),
    setPreviousStage: (previousStage) => set((state) => ({previousStage})),

    // ------------------------------------------------

    setAboutYouPayload: (aboutYouPayload) => set((state) => ({aboutYouPayload})),
    setQuotePayload: (quotePayload) => set((state) => ({quotePayload})),

    setCurrentAddressPayload: (currentAddressPayload) => set((state) => ({currentAddressPayload})),
    setFirstPreviousAddressPayload: (firstPreviousAddressPayload) => set((state) => ({firstPreviousAddressPayload})),
    setSecondPreviousAddressPayload: (secondPreviousAddressPayload) => set((state) => ({secondPreviousAddressPayload})),

    setOtherIncomePayload: (otherIncomePayload) => set((state) => ({otherIncomePayload})),

    setCurrentEmploymentPayload: (currentEmploymentPayload) => set((state) => ({currentEmploymentPayload})),
    setExpenditurePayload: (expenditurePayload) => set((state) => ({expenditurePayload})),
    setMarketingConsentPayload: (marketingConsentPayload) => set((state) => ({marketingConsentPayload})),
}))

export {EmploymentIndustry};

