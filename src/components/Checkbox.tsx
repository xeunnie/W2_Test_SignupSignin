interface CheckboxProps {
    style: string
}

export default function Checkbox({ style }: CheckboxProps) {
    return <button className={`${style}`} />
}