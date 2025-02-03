import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset"
    style: string
    children: React.ReactNode
    disabled?: boolean
}
export default function Button({ type = "button", style, children, disabled }: ButtonProps) {
    return <button type={type} className={`${style}`} disabled={disabled}>{children}</button>
}