export function isEmptyString(value: string): boolean {
    return value.trim().length === 0
}

export function isLengthBetween(
    value: string,
    min: number,
    max: number,
): boolean {
    return value.length >= min && value.length <= max
}

export function isEmail(value: string): boolean {
    return /^[a-zA-Z0-9]{4,22}@[a-zA-Z0-9]{3,}\.[a-zA-Z]{2,}$/.test(value)
}

export function isPassword(value: string): boolean {
    return /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,22}$/.test(value)
}

export function isNickname(value: string): boolean {
    return /^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,16}$/.test(value) || /^(?=.*[가-힣])[가-힣0-9]{2,10}$/.test(value)
}

export function isName(value: string): boolean {
    return /^[가-힣]{2,}$/.test(value) || /^[a-zA-Z]{2,}$/.test(value)
}