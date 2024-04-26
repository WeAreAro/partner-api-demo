import {create} from "zustand";
import {
    EmploymentStatus,
    LoanPurpose,
    MaritalStatus,
    OtherIncomeDescription,
    OtherIncomePeriod,
    PropertyType,
    ResidentialStatus,
    Title,
    YesNoValue
} from "@/app/state/enum/Common";
import {EmploymentIndustry} from "@/app/state/enum/EmploymentIndustry";
import {Offer} from "@/app/state/offer_model";

export enum EligibilityPanelType {
    ALL,
    CREDITCARD,
    AUTOFINANCE,
    SECURED
}

export type EligibilityFormStageType =
    | EligibilityLoanFormStage
    | EligibilityCardFormStage
    | EligibilityAutoFinanceFormStage
    | EligibilitySecuredFormStage;

export interface EligibilityPartnerDetails {
    partner_code: string,
    partner_reference?: string,
    campaign_code?: string,
}


export enum EligibilityLoanFormStage {
    PartnerDetailsStage = 1,
    LoanStage = 2,
    AboutYouStage = 3,
    CurrentAddressStage = 4,
    EmploymentStage = 5,
    ExpenditureStage = 6,
    OtherIncomeStage = 7,
    MarketingConsentStage = 8,
    PayloadStage = 9,
    OfferTilesStage = 10,
    ProceedOfferStage = 11,
}

export enum EligibilityCardFormStage {
    PartnerDetailsStage = 1,
    CardStage = 2,
    AboutYouStage = 3,
    CurrentAddressStage = 4,
    EmploymentStage = 5,
    ExpenditureStage = 6,
    OtherIncomeStage = 7,
    MarketingConsentStage = 8,
    PayloadStage = 9,
    OfferTilesStage = 10,
    ProceedOfferStage = 11,
}

export enum EligibilityAutoFinanceFormStage {
    PartnerDetailsStage = 1,
    LoanStage = 2,
    VehicleDetailsStage = 3,
    AboutYouStage = 4,
    CurrentAddressStage = 5,
    EmploymentStage = 6,
    ExpenditureStage = 7,
    OtherIncomeStage = 8,
    MarketingConsentStage = 9,
    PayloadStage = 10,
    OfferTilesStage = 11,
    ProceedOfferStage = 12,
}

export const ELIGIBILITY_JOINT_APPLICANT_STAGES = 4;

export enum EligibilitySecuredFormStage {
    PartnerDetailsStage = 1,
    LoanStage = 2,
    PropertyDetailsStage = 3,
    AboutYouStage = 4,
    CurrentAddressStage = 5,
    EmploymentStage = 6,
    ExpenditureStage = 7,
    OtherIncomeStage = 8,
    JointAboutYouStage = 9,
    JointCurrentAddressStage = 10,
    JointEmploymentStage = 11,
    JointOtherIncomeStage = 12,
    MarketingConsentStage = 13,
    PayloadStage = 14,
    OfferTilesStage = 15,
    ProceedOfferStage = 16,
}

export const ELIGIBILITY_TOTAL_STAGES = (panelType: EligibilityPanelType) => {
    switch (panelType) {
        case EligibilityPanelType.ALL:
            return Object.keys(EligibilityLoanFormStage).length / 2;
        case EligibilityPanelType.CREDITCARD:
            return Object.keys(EligibilityCardFormStage).length / 2;
        case EligibilityPanelType.AUTOFINANCE:
            return Object.keys(EligibilityAutoFinanceFormStage).length / 2;
        case EligibilityPanelType.SECURED:
            return Object.keys(EligibilitySecuredFormStage).length / 2;
        default:
            return 99;
    }
}

export interface EligibilityLoanPayload {
    loan_amount: number,
    loan_term: number,
    loan_purpose: LoanPurpose
}

export interface EligibilityCardPayload {
    cash_advance: string,
    balance_transfer: string,
    balance_transfer_amount: number;
}

export interface EligibilityVehicleDetailsPayload {
    vehicle_found: string,
    expected_annual_mileage: number,
    vendor_type: string,
    purchase_price: number,
    deposit_amount: number,
    vehicle_registration: string,
    vehicle_current_mileage: number
}

export interface EligibilityPropertyDetailsPayload {
    estimated_value: number,
    mortgage_outstanding: number,
    mortgage_lender: string,
    purchase_date: string,
    has_other_owners: YesNoValue,
    property_type: PropertyType,
    number_of_bedrooms: number,
    number_of_floors_in_building: number,
    council_purchase: YesNoValue,
    previously_council?: YesNoValue,
    recently_council?: YesNoValue,
    council_discount_amount?: number,
    help_to_buy_scheme?: YesNoValue,
    help_to_buy_settled?: YesNoValue,
    has_other_properties: YesNoValue
}

export interface EligibilityAboutYouPayload {
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
    dependant_ages_comma_sep?: string,
    has_driving_licence: string
}

export interface EligibilityAboutYouPayloadWithDependentsAsList extends EligibilityAboutYouPayload {
    dependant_ages: number[]
}

export interface EligibilityJointAboutYouPayload {
    title: Title,
    first_name: string,
    surname: string,
    email: string,
    mobile_phone?: string,
    dob: string,
}

export interface EligibilityAddressPayload {
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

export enum EligibilityPrimaryAddressStages {
    CURRENT_ADDRESS = "currentAddressPayload",
}

export enum EligibilityPrimaryAddressPayloadSetters {
    CURRENT_ADDRESS = "setCurrentAddressPayload",
}

export enum EligibilityJointAddressStages {
    CURRENT_ADDRESS = "jointCurrentAddressPayload",
}

export enum EligibilityJointAddressPayloadSetters {
    CURRENT_ADDRESS = "setJointCurrentAddressPayload",
}

export interface EligibilityEmploymentPayload {
    occupation?: string,
    employer_name?: string,
    employment_industry?: EmploymentIndustry,

    employment_status: EmploymentStatus,

    gross_income: number,
    emp_years: number,
    emp_months: number,

    additional_household_income: number,
}

export interface EligibilityJointEmploymentPayload {
    occupation?: string,
    employer_name?: string,
    employment_industry?: EmploymentIndustry,

    employment_status: EmploymentStatus,

    gross_income: number,
    emp_years: number,
    emp_months: number,
}

export interface EligibilityExpenditurePayload {
    monthly_mortgage_rent: number,
    monthly_mortgage_rent_share?: number,
}

export interface EligibilityOtherIncomePayload {
    income_1: number;
    description_1: OtherIncomeDescription;
    period_1: OtherIncomePeriod;

    income_2: number;
    description_2: OtherIncomeDescription;
    period_2: OtherIncomePeriod;
}

export interface EligibilityJointOtherIncomePayload {
    income_1: number;
    description_1: OtherIncomeDescription;
    period_1: OtherIncomePeriod;

    income_2: number;
    description_2: OtherIncomeDescription;
    period_2: OtherIncomePeriod;
}

export interface EligibilityOtherIncome {
    income: number;
    income_description: OtherIncomeDescription;
}

export interface EligibilityJointOtherIncome {
    income: number;
    income_description: OtherIncomeDescription;
}

export interface EligibilityMarketingConsentPayload {
    email_opt_in: YesNoValue,
    text_opt_in: YesNoValue,
}

export interface EligibilityAllOffersResponse {
    response_json_as_object: string,
    mocked: boolean
}

export interface EligibilityOfferToProceed {
    offer: Offer,
    aro_reference: string
}

export interface EligibilityProceedResponse {
    response_json_as_object: string,
    mocked: boolean
}

export interface EligibilityStageState {
    panelType: EligibilityPanelType
    obfuscateOffers: boolean

    currentStage: EligibilityFormStageType

    // --------------------------------

    partnerDetailsPayload: EligibilityPartnerDetails

    loanPayload: EligibilityLoanPayload
    cardPayload: EligibilityCardPayload
    vehicleDetailsPayload: EligibilityVehicleDetailsPayload
    propertyDetailsPayload: EligibilityPropertyDetailsPayload

    aboutYouPayload: EligibilityAboutYouPayload
    currentAddressPayload: EligibilityAddressPayload
    currentEmploymentPayload: EligibilityEmploymentPayload
    otherIncomePayload: EligibilityOtherIncomePayload
    expenditurePayload: EligibilityExpenditurePayload
    marketingConsentPayload: EligibilityMarketingConsentPayload

    jointAboutYouPayload: EligibilityJointAboutYouPayload
    jointCurrentAddressPayload: EligibilityAddressPayload
    jointCurrentEmploymentPayload: EligibilityJointEmploymentPayload
    jointOtherIncomePayload: EligibilityJointOtherIncomePayload

    allOffersResponse: EligibilityAllOffersResponse
    offerToProceed: EligibilityOfferToProceed
    proceedResponse: EligibilityProceedResponse

    // --------------------------------

    setPanelType: (panelType: EligibilityPanelType) => void
    setObfuscateOffers: (obfuscateOffers: boolean) => void

    setCurrentStage: (currentStage: number) => void
    // setPreviousStage: (previousStage: number) => void

    setPartnerDetailsPayload: (payload: EligibilityPartnerDetails) => void

    setLoanPayload: (payload: EligibilityLoanPayload) => void
    setCardPayload: (payload: EligibilityCardPayload) => void
    setVehicleDetailsPayload: (payload: EligibilityVehicleDetailsPayload) => void
    setPropertyDetailsPayload: (payload: EligibilityPropertyDetailsPayload) => void

    setAboutYouPayload: (payload: EligibilityAboutYouPayload) => void
    setCurrentAddressPayload: (payload: EligibilityAddressPayload) => void
    setCurrentEmploymentPayload: (payload: EligibilityEmploymentPayload) => void
    setOtherIncomePayload: (payload: EligibilityOtherIncomePayload) => void
    setExpenditurePayload: (payload: EligibilityExpenditurePayload) => void
    setMarketingConsentPayload: (payload: EligibilityMarketingConsentPayload) => void

    setJointAboutYouPayload: (payload: EligibilityJointAboutYouPayload) => void
    setJointCurrentAddressPayload: (payload: EligibilityAddressPayload) => void
    setJointCurrentEmploymentPayload: (payload: EligibilityJointEmploymentPayload) => void
    setJointOtherIncomePayload: (payload: EligibilityJointOtherIncomePayload) => void

    setAllOffersResponse: (response: EligibilityAllOffersResponse) => void
    setOfferToProceed: (offerToProceed: EligibilityOfferToProceed) => void
    setProceedResponse: (response: EligibilityProceedResponse) => void
}

export const useEligibilityStageStore = create<EligibilityStageState>()((set) => ({
    panelType: EligibilityPanelType.ALL,
    obfuscateOffers: true,

    currentStage: EligibilityLoanFormStage.PartnerDetailsStage,

    // --------------------------------

    partnerDetailsPayload: {} as EligibilityPartnerDetails,

    loanPayload: {} as EligibilityLoanPayload,
    cardPayload: {} as EligibilityCardPayload,
    vehicleDetailsPayload: {} as EligibilityVehicleDetailsPayload,
    propertyDetailsPayload: {} as EligibilityPropertyDetailsPayload,

    aboutYouPayload: {} as EligibilityAboutYouPayload,
    currentAddressPayload: {} as EligibilityAddressPayload,
    currentEmploymentPayload: {} as EligibilityEmploymentPayload,
    otherIncomePayload: {} as EligibilityOtherIncomePayload,
    expenditurePayload: {} as EligibilityExpenditurePayload,
    marketingConsentPayload: {} as EligibilityMarketingConsentPayload,

    jointAboutYouPayload: {} as EligibilityJointAboutYouPayload,
    jointCurrentAddressPayload: {} as EligibilityAddressPayload,
    jointCurrentEmploymentPayload: {} as EligibilityJointEmploymentPayload,
    jointOtherIncomePayload: {} as EligibilityJointOtherIncomePayload,

    allOffersResponse: {} as EligibilityAllOffersResponse,
    offerToProceed: {} as EligibilityOfferToProceed,
    proceedResponse: {} as EligibilityProceedResponse,

    // --------------------------------

    setPanelType: (panelType) => set((state) => ({panelType})),
    setObfuscateOffers: (obfuscateOffers) => set((state) => ({obfuscateOffers})),

    setCurrentStage: (currentStage) => set((state) => ({currentStage})),
    // setPreviousStage: (previousStage) => set((state) => ({previousStage})),

    // --------------------------------

    setPartnerDetailsPayload: (partnerDetailsPayload) => set((state) => ({partnerDetailsPayload})),

    setLoanPayload: (loanPayload) => set((state) => ({loanPayload})),
    setCardPayload: (cardPayload) => set((state) => ({cardPayload})),
    setVehicleDetailsPayload: (vehicleDetailsPayload) => set((state) => ({vehicleDetailsPayload})),
    setPropertyDetailsPayload: (propertyDetailsPayload) => set((state) => ({propertyDetailsPayload})),

    setAboutYouPayload: (aboutYouPayload) => set((state) => ({aboutYouPayload})),
    setCurrentAddressPayload: (currentAddressPayload) => set((state) => ({currentAddressPayload})),
    setCurrentEmploymentPayload: (currentEmploymentPayload) => set((state) => ({currentEmploymentPayload})),
    setOtherIncomePayload: (otherIncomePayload) => set((state) => ({otherIncomePayload})),
    setExpenditurePayload: (expenditurePayload) => set((state) => ({expenditurePayload})),
    setMarketingConsentPayload: (marketingConsentPayload) => set((state) => ({marketingConsentPayload})),

    setJointAboutYouPayload: (jointAboutYouPayload) => set((state) => ({jointAboutYouPayload})),
    setJointCurrentAddressPayload: (jointCurrentAddressPayload) => set((state) => ({jointCurrentAddressPayload})),
    setJointCurrentEmploymentPayload: (jointCurrentEmploymentPayload) => set((state) => ({jointCurrentEmploymentPayload})),
    setJointOtherIncomePayload: (jointOtherIncomePayload) => set((state) => ({jointOtherIncomePayload})),

    setAllOffersResponse: (allOffersResponse) => set((state) => ({allOffersResponse})),
    setOfferToProceed: (offerToProceed) => set((state) => ({offerToProceed})),
    setProceedResponse: (proceedResponse) => set((state) => ({proceedResponse})),
}))
