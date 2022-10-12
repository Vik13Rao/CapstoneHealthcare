export function getCookie(key: string) {
    const x = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return x ? x.pop() : "";
}

//export function currencyFormat(amount: number) {
//    return '$' + (amount / 100).toFixed(2);
//}