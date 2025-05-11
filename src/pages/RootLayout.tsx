import Footer from '@/shared/Footer'
import Navbar from '@/shared/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <div className='flex flex-col h-screen'>
            <div>
                <Navbar />
            </div>
            <main className='flex-grow' >
                <Outlet />
            </main>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default RootLayout