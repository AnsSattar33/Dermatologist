import React from 'react'

const LandingPage = () => {
    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-10'>Welcome to the Skin Disease Detection App</h1>
            <p className='text-center mt-5'>This app helps you detect skin diseases using machine learning.</p>
            <div className='flex justify-center mt-10'>
                <img src="/images/landing.jpg" alt="Landing" className='w-1/2 h-auto' />
            </div>
            <div className='flex justify-center mt-10'>
                <button className='bg-blue-500 text-white px-4 py-2 rounded'>Get Started</button>
            </div>
        </div>
    )
}

export default LandingPage