"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const SubmittedReviewPage = () => {
    const router = useRouter();

    return (
        <div className='bg-white w-full min-h-[100vh] flex flex-col items-center justify-center text-[#344054] text-center'>
            <h1 className='font-semibold text-xl'>Your review has been successfully submitted</h1>
            <h2>Thank you for your feedback! We appreciate it.</h2>
            <Image src={'/thank-you.svg'} width={375} height={280} alt='thank-you' className='mt-4' />
            <button className='bg-[#3D3FDF] text-white px-8 py-3 mt-8 rounded-lg' onClick={router.back}>Go back</button>
        </div>
    )
}

export default SubmittedReviewPage