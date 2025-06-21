import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {useForm} from "react-hook-form";


export default function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setLoading(true)
        setServerError(null)

        try {
            const response = await axios.post('https://api.applywise.com/auth/login', {
                email: data.email,
                password: data.password,
            })

            const { token, user } = response.data

            // Save to localStorage
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))

            // Redirect to dashboard
            navigate('/dashboard')
        } catch (error) {
            setServerError(
                error.response?.data?.message || 'Login failed. Please check your credentials.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to ApplyWise</h2>

            {/* Show server error */}
            {serverError && (
                <div className="text-red-600 text-sm bg-red-100 px-4 py-2 rounded mb-4">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        className={`w-full mt-1 px-4 py-2 border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                        className={`w-full mt-1 px-4 py-2 border ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white font-semibold py-2 px-4 rounded"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </AuthLayout>
    )
}
