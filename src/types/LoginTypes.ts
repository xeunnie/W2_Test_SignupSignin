export type FieldName = string
export type FieldValue = string | number | boolean
export type InputValidation = (newValue: FieldValue) => string

export interface FormInfo {
    initialValue: FieldValue
    isRequired: boolean
    validation: InputValidation
}
export type FieldInfos = Record<FieldName, FormInfo>