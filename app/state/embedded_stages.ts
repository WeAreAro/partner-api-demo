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

export enum EmbeddedPanelType {
    ALL,
    CREDITCARD,
    AUTOFINANCE,
    SECURED
}

export type EmbeddedFormStageType =
    | EmbeddedLoanFormStage
    | EmbeddedCardFormStage
    | EmbeddedAutoFinanceFormStage
    | EmbeddedSecuredFormStage;

export interface EmbeddedPartnerDetails {
    partner_code: string,
    partner_reference?: string,
    campaign_code?: string,
    agree_terms: string
}


export enum EmbeddedLoanFormStage {
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

export enum EmbeddedCardFormStage {
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

export enum EmbeddedAutoFinanceFormStage {
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

export const EMBEDDED_JOINT_APPLICANT_STAGES = 4;

export enum EmbeddedSecuredFormStage {
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

export const EMBEDDED_TOTAL_STAGES = (panelType: EmbeddedPanelType) => {
    switch (panelType) {
        case EmbeddedPanelType.ALL:
            return Object.keys(EmbeddedLoanFormStage).length / 2;
        case EmbeddedPanelType.CREDITCARD:
            return Object.keys(EmbeddedCardFormStage).length / 2;
        case EmbeddedPanelType.AUTOFINANCE:
            return Object.keys(EmbeddedAutoFinanceFormStage).length / 2;
        case EmbeddedPanelType.SECURED:
            return Object.keys(EmbeddedSecuredFormStage).length / 2;
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

export interface EmbeddedVehicleDetailsPayload {
    vehicle_found: string,
    expected_annual_mileage: number,
    vendor_type: string,
    purchase_price: number,
    deposit_amount: number,
    vehicle_registration: string,
    vehicle_current_mileage: number
}

export interface EmbeddedPropertyDetailsPayload {
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
    dependant_ages_comma_sep?: string,
    has_driving_licence: string
}

export interface EmbeddedAboutYouPayloadWithDependentsAsList extends EmbeddedAboutYouPayload {
    dependant_ages: number[]
}

export interface EmbeddedJointAboutYouPayload {
    title: Title,
    first_name: string,
    surname: string,
    email: string,
    mobile_phone?: string,
    dob: string,
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
}

export enum EmbeddedPrimaryAddressPayloadSetters {
    CURRENT_ADDRESS = "setCurrentAddressPayload",
}

export enum EmbeddedJointAddressStages {
    CURRENT_ADDRESS = "jointCurrentAddressPayload",
}

export enum EmbeddedJointAddressPayloadSetters {
    CURRENT_ADDRESS = "setJointCurrentAddressPayload",
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

export interface EmbeddedJointEmploymentPayload {
    occupation?: string,
    employer_name?: string,
    employment_industry?: EmploymentIndustry,

    employment_status: EmploymentStatus,

    gross_income: number,
    emp_years: number,
    emp_months: number,
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

export interface EmbeddedJointOtherIncomePayload {
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

export interface EmbeddedJointOtherIncome {
    income: number;
    income_description: OtherIncomeDescription;
}

export interface EmbeddedMarketingConsentPayload {
    email_opt_in: YesNoValue,
    text_opt_in: YesNoValue,
}

export interface EmbeddedAllOffersResponse {
    response_json_as_object: string,
    mocked: boolean
}

export interface EmbeddedOfferToProceed {
    offer: Offer,
    aro_reference: string
}

export interface EmbeddedProceedResponse {
    response_json_as_object: string,
    mocked: boolean
}

export interface EmbeddedStageState {
    panelType: EmbeddedPanelType

    currentStage: EmbeddedFormStageType
    // previousStage: EmbeddedFormStageType

    // --------------------------------

    partnerDetailsPayload: EmbeddedPartnerDetails

    loanPayload: EmbeddedLoanPayload
    cardPayload: EmbeddedCardPayload
    vehicleDetailsPayload: EmbeddedVehicleDetailsPayload
    propertyDetailsPayload: EmbeddedPropertyDetailsPayload

    aboutYouPayload: EmbeddedAboutYouPayload
    currentAddressPayload: EmbeddedAddressPayload
    currentEmploymentPayload: EmbeddedEmploymentPayload
    otherIncomePayload: EmbeddedOtherIncomePayload
    expenditurePayload: EmbeddedExpenditurePayload
    marketingConsentPayload: EmbeddedMarketingConsentPayload

    jointAboutYouPayload: EmbeddedJointAboutYouPayload
    jointCurrentAddressPayload: EmbeddedAddressPayload
    jointCurrentEmploymentPayload: EmbeddedJointEmploymentPayload
    jointOtherIncomePayload: EmbeddedJointOtherIncomePayload

    allOffersResponse: EmbeddedAllOffersResponse
    offerToProceed: EmbeddedOfferToProceed
    proceedResponse: EmbeddedProceedResponse

    // --------------------------------

    setPanelType: (panelType: EmbeddedPanelType) => void

    setCurrentStage: (currentStage: number) => void
    // setPreviousStage: (previousStage: number) => void

    setPartnerDetailsPayload: (payload: EmbeddedPartnerDetails) => void

    setLoanPayload: (payload: EmbeddedLoanPayload) => void
    setCardPayload: (payload: EmbeddedCardPayload) => void
    setVehicleDetailsPayload: (payload: EmbeddedVehicleDetailsPayload) => void
    setPropertyDetailsPayload: (payload: EmbeddedPropertyDetailsPayload) => void

    setAboutYouPayload: (payload: EmbeddedAboutYouPayload) => void
    setCurrentAddressPayload: (payload: EmbeddedAddressPayload) => void
    setCurrentEmploymentPayload: (payload: EmbeddedEmploymentPayload) => void
    setOtherIncomePayload: (payload: EmbeddedOtherIncomePayload) => void
    setExpenditurePayload: (payload: EmbeddedExpenditurePayload) => void
    setMarketingConsentPayload: (payload: EmbeddedMarketingConsentPayload) => void

    setJointAboutYouPayload: (payload: EmbeddedJointAboutYouPayload) => void
    setJointCurrentAddressPayload: (payload: EmbeddedAddressPayload) => void
    setJointCurrentEmploymentPayload: (payload: EmbeddedJointEmploymentPayload) => void
    setJointOtherIncomePayload: (payload: EmbeddedJointOtherIncomePayload) => void

    setAllOffersResponse: (response: EmbeddedAllOffersResponse) => void
    setOfferToProceed: (offerToProceed: EmbeddedOfferToProceed) => void
    setProceedResponse: (response: EmbeddedProceedResponse) => void
}

export const useEmbeddedStageStore = create<EmbeddedStageState>()((set) => ({
    panelType: EmbeddedPanelType.ALL,

    currentStage: EmbeddedLoanFormStage.PartnerDetailsStage,
    // previousStage: EmbeddedLoanFormStage.PartnerDetailsStage,

    // --------------------------------

    partnerDetailsPayload: {} as EmbeddedPartnerDetails,

    loanPayload: {} as EmbeddedLoanPayload,
    cardPayload: {} as EmbeddedCardPayload,
    vehicleDetailsPayload: {} as EmbeddedVehicleDetailsPayload,
    propertyDetailsPayload: {} as EmbeddedPropertyDetailsPayload,

    aboutYouPayload: {} as EmbeddedAboutYouPayload,
    currentAddressPayload: {} as EmbeddedAddressPayload,
    currentEmploymentPayload: {} as EmbeddedEmploymentPayload,
    otherIncomePayload: {} as EmbeddedOtherIncomePayload,
    expenditurePayload: {} as EmbeddedExpenditurePayload,
    marketingConsentPayload: {} as EmbeddedMarketingConsentPayload,

    jointAboutYouPayload: {} as EmbeddedJointAboutYouPayload,
    jointCurrentAddressPayload: {} as EmbeddedAddressPayload,
    jointCurrentEmploymentPayload: {} as EmbeddedJointEmploymentPayload,
    jointOtherIncomePayload: {} as EmbeddedJointOtherIncomePayload,

    allOffersResponse: {} as EmbeddedAllOffersResponse,
    offerToProceed: {} as EmbeddedOfferToProceed,
    proceedResponse: {} as EmbeddedProceedResponse,

    // --------------------------------

    setPanelType: (panelType) => set((state) => ({panelType})),

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
