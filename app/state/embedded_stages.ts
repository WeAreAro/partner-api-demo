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

export interface EmbeddedPartnerDetails {
    partner_code: string,
    partner_reference?: string,
    campaign_code?: string
}


export enum EmbeddedLoanFormStage {
    PartnerDetailsStage = 1,
    LoanStage = 2,
    AboutYouStage = 3,
    CurrentAddressStage = 4,
    FirstPreviousAddressStage = 5,
    SecondPreviousAddressStage = 6,
    EmploymentStage = 7,
    ExpenditureStage = 8,
    OtherIncomeStage = 9,
    MarketingConsentStage = 10,
    PayloadStage = 11
}

export enum EmbeddedCardFormStage {
    PartnerDetailsStage = 1,
    CardStage = 2,
    AboutYouStage = 3,
    CurrentAddressStage = 4,
    FirstPreviousAddressStage = 5,
    SecondPreviousAddressStage = 6,
    EmploymentStage = 7,
    ExpenditureStage = 8,
    OtherIncomeStage = 9,
    MarketingConsentStage = 10,
    PayloadStage = 11
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

    partnerDetailsPayload: EmbeddedPartnerDetails

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

    setPartnerDetailsPayload: (payload: EmbeddedPartnerDetails) => void

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

    currentStage: EmbeddedLoanFormStage.PartnerDetailsStage,
    previousStage: EmbeddedLoanFormStage.PartnerDetailsStage,

    // --------------------------------

    partnerDetailsPayload: {} as EmbeddedPartnerDetails,

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

    setPartnerDetailsPayload: (partnerDetailsPayload) => set((state) => ({partnerDetailsPayload})),

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
