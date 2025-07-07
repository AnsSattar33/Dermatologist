import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { User, Mail, Lock, Sparkles } from 'lucide-react'

import { createAccount } from '@/lib/appwrite/auth'
import { login } from '@/lib/redux/authSlice'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { account } from '@/lib/appwrite/config'

const formSchema = z.object({
    username: z.string().min(2, 'Username must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

type FormData = z.infer<typeof formSchema>

const SignupPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        account.getSession('current')
            .then((session) => {
                if (session && session.userId) {
                    navigate('/profile')
                }
            })
            .catch(() => {
                // No session, do nothing
            })
    }, [navigate])

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values: FormData) => {
        try {
            setIsLoading(true)
            const { username, email, password } = values
            const result = await createAccount({ username, email, password })
            
            if (result?.userId) {
                dispatch(login({
                    username,
                    email,
                }))
                toast.success('Account created successfully')
                navigate('/upload')
            }
        } catch (error: any) {
            if (error.message.includes('unique')) {
                toast.error('Email already exists. Please try logging in instead.')
            } else {
                toast.error(error.message || 'Failed to create account. Please try again.')
            }
            console.error('Signup error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Main signup card */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Create Account
                            </h1>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Sign up to get started
                        </p>
                    </div>

                    {/* Form */}
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                            <User className="w-4 h-4" />
                                            <span>Username</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                type='text' 
                                                placeholder="Choose a username" 
                                                {...field}
                                                disabled={isLoading}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                            <Mail className="w-4 h-4" />
                                            <span>Email Address</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                type='email' 
                                                placeholder="Enter your email" 
                                                {...field}
                                                disabled={isLoading}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                            <Lock className="w-4 h-4" />
                                            <span>Password</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                type='password' 
                                                placeholder="Create a password" 
                                                {...field}
                                                disabled={isLoading}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                            <Lock className="w-4 h-4" />
                                            <span>Confirm Password</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                type='password' 
                                                placeholder="Confirm your password" 
                                                {...field}
                                                disabled={isLoading}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button 
                                className="w-full bg-black text-white font-medium py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                type='submit'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    'Sign Up'
                                )}
                            </Button>
                        </form>
                    </FormProvider>

                    {/* Footer */}
                    <div className="text-center pt-4 border-t border-gray-100">
                        <Label className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link 
                                className="text-black font-medium hover:underline transition-colors" 
                                to='/login'
                            >
                                Login
                            </Link>
                        </Label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage