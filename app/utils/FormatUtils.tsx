export const formatNumber = (num: number) => {
    if (typeof num === 'undefined') {
        return "";
    }

    let [integerPart, decimalPart] = Number(num).toFixed(2).split('.');

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `${integerPart}${decimalPart === "00" ? "" : "." + decimalPart}`;
}