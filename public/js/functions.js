/**
 * 
 * @param {number} num 
 */
function numFormat(num) {
    let parts = num.toString().split(".");
    let integer = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let decimal = parts[1] !== undefined ? parts[1].padEnd(2, "0").substring(0, 2) : "00";
    return `${integer}.${decimal}`;
}

/**
 * @param {number} num 
 */
function numRounded(num) {
    return Math.round(num * 100) / 100;
}

export { numFormat, numRounded };