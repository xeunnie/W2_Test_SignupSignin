import React, { useState } from 'react'

interface LoginLabelProps {
    title: string
    error?: string
    isRequired?: boolean
    children?: React.ReactNode
    htmlFor?: string
}

export default function LoginLabel({
                                       title, error, isRequired = false, children, htmlFor
                                   }: LoginLabelProps) {
    const [isBlurred, setIsBlurred] = useState(false)
    function handleBlur() {
        setIsBlurred(true)
    }

    return (
        <label className='mt-5 flex flex-col items-stretch' onBlur={handleBlur} htmlFor={htmlFor}>
            <div className='pb-2 text-[#B5BAC1] text-sm text-left'>
                {title}
                {isRequired && <span className='text-[#fb8d91]'>{` *`}</span>}
            </div>
            {children}
            {error && isBlurred && (
                <div className='pt-1 text-sm text-[#fb8d91] text-left'>{error}</div>
            )}
        </label>
    )
}