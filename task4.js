function Palindrome(value = "123444321") {
    if (isInputValid(value)) {
        let query = String(value),
            max_length = 0,
            palindrome = '';
        for (let i = 0; i < query.length; i += 1) {
            let subString = query.substr(i, query.length),
                j = subString.length;

            while (j) {
                let stringOperate = subString.substr(0, j);
                if (isPalindrome(stringOperate) && stringOperate.length > max_length) {
                    max_length = stringOperate.length;
                    if (stringOperate.length === query.length) {
                        return palindrome = stringOperate;
                    }
                    palindrome = stringOperate;
                }
                j -= 1;
            }
        }
    }

    if (!palindrome) return 0;
    return palindrome;
}

function isPalindrome(subString) {
    subString += '';
    var reversed = subString.split("").reverse().join("");
    return subString == reversed;
}

function isInputValid(value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
        throw new Error(`Status: ${error.status}, reason: ${error.reason}`);
    }
    return true;
}

var error = {
    status: `failed`,
    reason: `Input isn't a number or a string.`
};