export interface LoginInputProps {
    id: string
    label: string
    type: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface LoginFormData {
    email: string
    password: string
}