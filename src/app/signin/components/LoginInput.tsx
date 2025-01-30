import {LoginInputProps} from "@/types/Login";

function LoginInput({ id, label, type, value, onChange }: LoginInputProps) {
    return (
        <div>
            <label
                className='block text-left text-[11.2px] text-[#b5b9c0] mt-3 mb-2'
    htmlFor={id}
        >
        {label} <span className='text-red-600'>*</span>
        </label>
        <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    className='w-full px-4 py-2 rounded bg-[#1e1e21] text-white'
        />
        </div>
)
}

export default LoginInput