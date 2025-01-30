"use client";

import LoginForm from './components/LoginForm'
import  Link from 'next/link'

function Login() {
    return (
        <div className='w-[530px] bg-[#313237] p-8 rounded-[5px] shadow-[0px_2px_10px_#00000033]'>
            <div className='text-center mb-6'>
                <h1 className='text-[22.5px] font-semibold text-[#f2f2f4] mb-2'>
                    돌아오신 것을 환영해요!
                </h1>
                <p className='text-[15px] text-[#b5b9c0]'>
                    다시 만나다니 너무 반가워요!
                </p>
            </div>
            <LoginForm />
            <p className='text-[13.6px] text-left text-[#949aa3] mt-2'>
                계정이 필요하신가요?{' '}
                <Link href='/signup' className='text-[#00a9fb] hover:underline'>
                    가입하기
                </Link>
            </p>
        </div>
    )
}

export default Login