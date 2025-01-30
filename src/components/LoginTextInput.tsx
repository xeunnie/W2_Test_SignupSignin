import { InputHTMLAttributes } from 'react'
import LoginLabel from "@/components/LoginLabel";

interface LoginTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    title: string
    error?: string
    isRequired?: boolean
}

export default function LoginTextInput({
                                           name,
                                           title,
                                           error,
                                           isRequired = false,
                                           ...props
                                       }: LoginTextInputProps) {
    return (
        <LoginLabel title={title} error={error} isRequired={isRequired}>
            <input
                id={name}
            className='h-10 p-3 rounded-[3px] bg-[#1E1F22]'
            required={isRequired}
            {...props}
            />
    </LoginLabel>
)
}