// For simplicity in the demo, we use a single, combined offer model that covers all product types
export interface Offer {
    uuid: string
    product_type: string
    product_sub_type: string
    product_code: string
    product_name: string
    lender_name: string
    apr: number
    aprc: number // For secured
    rate_type: string
    approval_percentage: number
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
    upfront_fee: number
    purchase_fee: number
    total_fees: number
    total_credit_charge: number
    card_limit: number
    rep_example_text: string
    product_logo_url: string
    proceed_url_redirect: string
}