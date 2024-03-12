export interface OfferProductAttributes {
    apr: number
    credit_limit_min: number
    credit_limit_max: number
    rep_example: string
    apr_label_1: string
    apr_label_2: string
    purchases_1: string
    purchases_3: string
    balance_transfer_1: string
    balance_transfer_3: string
}

export interface Offer {
    uuid: string
    product_type: string
    product_sub_type: string
    product_code: string
    product_name: string
    lender_name: string
    apr: number
    aer: number
    rate_type: string
    approval_percentage: number
    offer_display_rank: number
    loan_offered: number
    term_offered: number
    term_requested: number
    first_month_repayment: number
    monthly_repayment: number
    last_repayment: number
    total_repayment: number
    total_borrowing: number
    broker_fee: number
    lender_fee: number
    fees: number
    total_fees: number
    total_credit_charge: number
    card_limit: number
    open_banking_required: string
    rep_example_text: string
    product_logo_url: string
    proceed_url: string
    product_attributes?: OfferProductAttributes
}