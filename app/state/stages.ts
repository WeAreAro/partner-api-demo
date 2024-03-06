import {create,} from "zustand";
import {EmploymentIndustry} from "./enum/EmploymentIndustry";

export enum FormType {
    UNSECURED_LOAN,
    CARD
}

export type FormStageType = | UnsecuredLoanFormStage | CardFormStage;

export enum UnsecuredLoanFormStage {
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

export enum CardFormStage {
    CardStage = 1,
    AboutYouStage = 2,
    CurrentAddressStage = 3,
    FirstPreviousAddressStage = 4,
    EmploymentStage = 5,
    ExpenditureStage = 6,
    MarketingConsentStage = 7,
    PayloadStage = 8
}

export const TOTAL_UNSECURED_STAGES = Object.keys(UnsecuredLoanFormStage).length / 2;

export const TOTAL_CARD_STAGES = Object.keys(CardFormStage).length / 2;

export enum Title {
    "Mr" = "Mr",
    "Mrs" = "Mrs",
    "Ms" = "Ms",
    "Miss" = "Miss",
    "Dr" = "Dr",
    "Other" = "Other",
}

export enum ResidentialStatus {
    "Homeowner without a mortgage" = "H",
    "Homeowner with a mortgage" = "M",
    "Homeowner in a shared ownership scheme" = "S",
    "Homeowner who doesn't reside in the property they own" = "N",
    "Tenant who has to buy their own furniture" = "U",
    "Tenant who even has furniture provided for them" = "T",
    "Council tenant" = "C",
    "Still living with their parents or another relative" = "R",
}


export enum MaritalStatus {
    "Single" = "S",
    "Married" = "M",
    "Seperated" = "P",
    "Divorced" = "D",
    "Living with Partner - Civil Partnership" = "C",
    "Widowed" = "W",
    "Living Together" = "L",
}

export enum LoanPurpose {
    "Debt Consolidation" = "CON",
    "Home Improvement" = "BTL",
    "Home Furnishings" = "HMF",
    "Additional Property" = "HH",
    "Mortgage shortfall/Pay off Mortgage" = "MSP",
    "Car Loan" = "CA1",
    "Caravan or Motorhome" = "CAN",
    "Business Loan" = "BL1",
    "Holiday" = "CN1",
    "Medical Bill" = "MED",
    "Wedding" = "NTM",
    "Business Vehicle" = "BEV",
    "Buy out Ex Partner" = "PAR",
    "Timeshare" = "TIM",
    "Purchase Freehold" = "PFH",
    "Income Tax Bill" = "TAX",
    "Other" = "*",
}

export enum EmploymentStatus {
    "Self Employed" = "S",
    "Full time" = "E",
    "Part time" = "P",

    "Retired" = "R",
    "Homemaker" = "H",
    "Student" = "F",
    "Part time Self-employed" = "M",
    "Unemployed" = "U",
}

export enum YesNoValue {
    "Yes" = "Y",
    "No" = "N",
}

export enum OtherIncomeDescription {
    "Adoption Allowance" = "ADA",
    "Agency" = "AGE",
    "Attendance Allowance" = "ATT",
    "Bank Nursing" = "BAN",
    "Bonus" = "BON",
    "Bursary" = "BUR",
    "Car Allowance" = "CRA",
    "Carers Allowance" = "CAR",
    "Child Benefit" = "CHB",
    "Child Support Agency" = "CSA",
    "Child Tax Credit" = "CTC",
    "Personal Independent Payment (PIP) / DLA" = "DLA",
    "Dividends" = "DIV",
    "Employment and Support Allowance" = "ESA",
    "Foster Care Allowance" = "FOS",
    "Incapacity Benefit" = "INC",
    "Income Support" = "INO",
    "Industrial Injuries Benefit" = "IND",
    "Insurance Policies" = "INS",
    "Invalidity" = "INV",
    "Investment" = "IVT",
    "Job Seekers Allowance" = "JSA",
    "Lodgers" = "LOD",
    "Maintenance" = "MAI",
    "Maternity" = "MAT",
    "Mobility" = "MOB",
    "Money From Family" = "FAM",
    "Overtime" = "OVT",
    "Part-time Job" = "PTE",
    "Part-time Self-employment" = "PSE",
    "Pension Credit" = "PEN",
    "Private Pension" = "PIP",
    "Rental Income (Total)" = "REN",
    "Self Employed Salary" = "SES",
    "Severe Disability Living Allowance" = "SEV",
    "State Pension" = "STP",
    "Statutory Sick Pay" = "SSP",
    "War Pension" = "WAR",
    "Private Widows Pension" = "WD2",
    "State Widows Pension" = "WD1",
    "Working Tax Credit" = "WTC",
    "Other" = "OTH",
}

export enum OtherIncomePeriod {
    "Yearly" = "Y",
    "Monthly" = "M",
    "Weekly" = "W",
}

export interface AboutYouPayload {
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

export type QuotePayload = | LoanPayload | CardPayload;

export interface CardPayload {
    cash_advance: string,
    balance_transfer: string,
    balance_to_transfer: number;
}

export interface LoanPayload {
    loan_amount: number,
    loan_term: number,
    loan_purpose: LoanPurpose
}

export interface AddressPayload {
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


export interface EmploymentPayload {
    occupation?: string,
    employer_name?: string,
    employment_industry?: EmploymentIndustry,

    employment_status: EmploymentStatus,

    gross_income: number,
    emp_years: number,
    emp_months: number,

    other_household_income: number,
}

export interface ExpenditurePayload {
    monthly_mortgage_rent: number,
    monthly_mortgage_rent_share?: number,
}

export interface MarketingConsentPayload {
    email_opt_in: YesNoValue,
    text_opt_in: YesNoValue,
}


export interface OtherIncome {
    income: number;
    income_description: OtherIncomeDescription;
    period: OtherIncomePeriod;
    rank: number;
}

export interface OtherIncomePayload {
    income_1: number;
    description_1: OtherIncomeDescription;
    period_1: OtherIncomePeriod;

    income_2: number;
    description_2: OtherIncomeDescription;
    period_2: OtherIncomePeriod;
}

export enum AddressStages {
    CURRENT_ADDRESS = "currentAddressPayload",
    FIRST_PREVIOUS_ADDRESS = "firstPreviousAddressPayload",
    SECOND_PREVIOUS_ADDRESS = "secondPreviousAddressPayload"
}

export enum AddressPayloadSetters {
    CURRENT_ADDRESS = "setCurrentAddressPayload",
    FIRST_PREVIOUS_ADDRESS = "setFirstPreviousAddressPayload",
    SECOND_PREVIOUS_ADDRESS = "setSecondPreviousAddressPayload",
}

export interface StageState {
    formType: FormType

    currentStage: FormStageType
    previousStage: FormStageType

    quotePayload: QuotePayload
    aboutYouPayload: AboutYouPayload
    currentAddressPayload: AddressPayload
    firstPreviousAddressPayload: AddressPayload
    secondPreviousAddressPayload: AddressPayload
    currentEmploymentPayload: EmploymentPayload
    otherIncomePayload: OtherIncomePayload
    expenditurePayload: ExpenditurePayload
    marketingConsentPayload: MarketingConsentPayload

    setFormType: (formType: FormType) => void

    setCurrentStage: (currentStage: number) => void
    setPreviousStage: (previousStage: number) => void

    setAboutYouPayload: (payload: AboutYouPayload) => void
    setQuotePayload: (payload: QuotePayload) => void

    setCurrentAddressPayload: (payload: AddressPayload) => void
    setFirstPreviousAddressPayload: (payload: AddressPayload) => void
    setSecondPreviousAddressPayload: (payload: AddressPayload) => void

    setCurrentEmploymentPayload: (payload: EmploymentPayload) => void
    setOtherIncomePayload: (payload: OtherIncomePayload) => void

    setExpenditurePayload: (payload: ExpenditurePayload) => void
    setMarketingConsentPayload: (payload: MarketingConsentPayload) => void
}

export const useStageStore = create<StageState>()((set) => ({
    formType: FormType.UNSECURED_LOAN,

    currentStage: UnsecuredLoanFormStage.LoanStage,
    previousStage: UnsecuredLoanFormStage.LoanStage,

    quotePayload: {} as QuotePayload,
    aboutYouPayload: {} as AboutYouPayload,

    currentAddressPayload: {} as AddressPayload,
    firstPreviousAddressPayload: {} as AddressPayload,
    secondPreviousAddressPayload: {} as AddressPayload,

    currentEmploymentPayload: {} as EmploymentPayload,
    otherIncomePayload: {} as OtherIncomePayload,

    expenditurePayload: {} as ExpenditurePayload,
    marketingConsentPayload: {} as MarketingConsentPayload,

    setFormType: (formType) => set((state) => ({formType})),


    setCurrentStage: (currentStage) => set((state) => ({currentStage})),
    setPreviousStage: (previousStage) => set((state) => ({previousStage})),

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
