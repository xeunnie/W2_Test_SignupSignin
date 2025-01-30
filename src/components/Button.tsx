interface ButtonProps {
    type: 'button' | 'submit' | 'reset'
    style: string
    children: React.ReactNode
    disabled?: boolean
}
export default function Button({ style, children }: ButtonProps) {
    return <button className={`${style}`}>{children}</button>
}