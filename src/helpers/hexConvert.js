export function hexEncode(str = '') {
    let result;

    try {
        result = unescape(encodeURIComponent(str))
            .split('')
            .map(v => v.charCodeAt(0).toString(16))
            .join('');
    } catch (e) {
        console.log(`invalid text input: ${str}`);
        result = str;
    }

    return result;
}

export function hexDecode(str = '') {
    let result;

    try {
        result = decodeURIComponent(str.replace(/(..)/g, '%$1'));
    } catch (e) {
        result = str;
        console.log(`invalid hex input: ${result}`);
    }

    return result;
}
