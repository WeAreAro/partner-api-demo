import {create} from "zustand";
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
import {EmploymentIndustry} from "@/app/state/enum/EmploymentIndustry";

export enum EmbeddedPanelType {
    ALL,
    CREDITCARD,
    AUTOFINANCE,
    SECURED
}

export type EmbeddedFormStageType = | EmbeddedLoanFormStage | EmbeddedCardFormStage;

export enum EmbeddedLoanFormStage {
    LoanStage = 1,
    AboutYouStage = 2,
    CurrentAddressStage = 3,
    FirstPreviousAddressStage = 4,
    SecondPreviousAddressStage = 5,
    EmploymentStage = 6,
    ExpenditureStage = 7,
    OtherIncomeStage = 8,
    MarketingConsentStage = 9,
    PayloadStage = 10
}

export enum EmbeddedCardFormStage {
    CardStage = 1,
    AboutYouStage = 2,
    CurrentAddressStage = 3,
    FirstPreviousAddressStage = 4,
    SecondPreviousAddressStage = 5,
    EmploymentStage = 6,
    ExpenditureStage = 7,
    OtherIncomeStage = 8,
    MarketingConsentStage = 9,
    PayloadStage = 10
}

export const EMBEDDED_TOTAL_STAGES = (panelType: EmbeddedPanelType) => {
    switch (panelType) {
        case EmbeddedPanelType.ALL:
            return Object.keys(EmbeddedLoanFormStage).length / 2;
        case EmbeddedPanelType.CREDITCARD:
            return Object.keys(EmbeddedCardFormStage).length / 2;
        default:
            return 99;
    }
}

export interface EmbeddedLoanPayload {
    loan_amount: number,
    loan_term: number,
    loan_purpose: LoanPurpose
}

export interface EmbeddedCardPayload {
    cash_advance: string,
    balance_transfer: string,
    balance_transfer_amount: number;
}

export interface EmbeddedAboutYouPayload {
    title: Title,
    first_name: string,
    surname: string,
    email: string,
    home_phone?: string,
    mobile_phone?: string,
    residential_status: ResidentialStatus,
    marital_status: MaritalStatus,
    dob: string,
    number_of_dependants: number,
    dependant_ages_comma_sep?: string
}

export interface EmbeddedAboutYouPayloadWithDependentsAsList extends EmbeddedAboutYouPayload {
    dependant_ages: number[]
}

export interface EmbeddedAddressPayload {
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

export enum EmbeddedPrimaryAddressStages {
    CURRENT_ADDRESS = "currentAddressPayload",
    FIRST_PREVIOUS_ADDRESS = "firstPreviousAddressPayload",
    SECOND_PREVIOUS_ADDRESS = "secondPreviousAddressPayload"
}

export enum EmbeddedPrimaryAddressPayloadSetters {
    CURRENT_ADDRESS = "setCurrentAddressPayload",
    FIRST_PREVIOUS_ADDRESS = "setFirstPreviousAddressPayload",
    SECOND_PREVIOUS_ADDRESS = "setSecondPreviousAddressPayload",
}

export interface EmbeddedEmploymentPayload {
    occupation?: string,
    employer_name?: string,
    employment_industry?: EmploymentIndustry,

    employment_status: EmploymentStatus,

    gross_income: number,
    emp_years: number,
    emp_months: number,

    additional_household_income: number,
}

export interface EmbeddedExpenditurePayload {
    monthly_mortgage_rent: number,
    monthly_mortgage_rent_share?: number,
}

export interface EmbeddedOtherIncomePayload {
    income_1: number;
    description_1: OtherIncomeDescription;
    period_1: OtherIncomePeriod;

    income_2: number;
    description_2: OtherIncomeDescription;
    period_2: OtherIncomePeriod;
}

export interface EmbeddedOtherIncome {
    income: number;
    income_description: OtherIncomeDescription;
}

export interface EmbeddedMarketingConsentPayload {
    email_opt_in: YesNoValue,
    text_opt_in: YesNoValue,
}

export interface EmbeddedStageState {
    panelType: EmbeddedPanelType

    currentStage: EmbeddedFormStageType
    previousStage: EmbeddedFormStageType

    // --------------------------------

    loanPayload: EmbeddedLoanPayload
    cardPayload: EmbeddedCardPayload

    aboutYouPayload: EmbeddedAboutYouPayload
    currentAddressPayload: EmbeddedAddressPayload
    firstPreviousAddressPayload: EmbeddedAddressPayload
    secondPreviousAddressPayload: EmbeddedAddressPayload
    currentEmploymentPayload: EmbeddedEmploymentPayload
    otherIncomePayload: EmbeddedOtherIncomePayload
    expenditurePayload: EmbeddedExpenditurePayload
    marketingConsentPayload: EmbeddedMarketingConsentPayload

    // --------------------------------

    setPanelType: (panelType: EmbeddedPanelType) => void

    setCurrentStage: (currentStage: number) => void
    setPreviousStage: (previousStage: number) => void

    /* payloads */
    setLoanPayload: (payload: EmbeddedLoanPayload) => void
    setCardPayload: (payload: EmbeddedCardPayload) => void

    setAboutYouPayload: (payload: EmbeddedAboutYouPayload) => void
    setCurrentAddressPayload: (payload: EmbeddedAddressPayload) => void
    setFirstPreviousAddressPayload: (payload: EmbeddedAddressPayload) => void
    setSecondPreviousAddressPayload: (payload: EmbeddedAddressPayload) => void
    setCurrentEmploymentPayload: (payload: EmbeddedEmploymentPayload) => void
    setOtherIncomePayload: (payload: EmbeddedOtherIncomePayload) => void
    setExpenditurePayload: (payload: EmbeddedExpenditurePayload) => void
    setMarketingConsentPayload: (payload: EmbeddedMarketingConsentPayload) => void
}

export const useEmbeddedStageStore = create<EmbeddedStageState>()((set) => ({
    panelType: EmbeddedPanelType.ALL,

    currentStage: EmbeddedLoanFormStage.LoanStage,
    previousStage: EmbeddedLoanFormStage.LoanStage,

    // --------------------------------

    loanPayload: {} as EmbeddedLoanPayload,
    cardPayload: {} as EmbeddedCardPayload,

    aboutYouPayload: {} as EmbeddedAboutYouPayload,
    currentAddressPayload: {} as EmbeddedAddressPayload,
    firstPreviousAddressPayload: {} as EmbeddedAddressPayload,
    secondPreviousAddressPayload: {} as EmbeddedAddressPayload,
    currentEmploymentPayload: {} as EmbeddedEmploymentPayload,
    otherIncomePayload: {} as EmbeddedOtherIncomePayload,
    expenditurePayload: {} as EmbeddedExpenditurePayload,
    marketingConsentPayload: {} as EmbeddedMarketingConsentPayload,

    // --------------------------------

    setPanelType: (panelType) => set((state) => ({panelType})),

    setCurrentStage: (currentStage) => set((state) => ({currentStage})),
    setPreviousStage: (previousStage) => set((state) => ({previousStage})),

    // --------------------------------

    setLoanPayload: (loanPayload) => set((state) => ({loanPayload})),
    setCardPayload: (cardPayload) => set((state) => ({cardPayload})),

    setAboutYouPayload: (aboutYouPayload) => set((state) => ({aboutYouPayload})),
    setCurrentAddressPayload: (currentAddressPayload) => set((state) => ({currentAddressPayload})),
    setFirstPreviousAddressPayload: (firstPreviousAddressPayload) => set((state) => ({firstPreviousAddressPayload})),
    setSecondPreviousAddressPayload: (secondPreviousAddressPayload) => set((state) => ({secondPreviousAddressPayload})),
    setCurrentEmploymentPayload: (currentEmploymentPayload) => set((state) => ({currentEmploymentPayload})),
    setOtherIncomePayload: (otherIncomePayload) => set((state) => ({otherIncomePayload})),
    setExpenditurePayload: (expenditurePayload) => set((state) => ({expenditurePayload})),
    setMarketingConsentPayload: (marketingConsentPayload) => set((state) => ({marketingConsentPayload})),

}))
