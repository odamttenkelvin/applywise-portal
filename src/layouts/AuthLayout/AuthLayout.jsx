import React from 'react'

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
                {children}
            </div>
        </div>
    )
}
