import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { createAccount } from '@/lib/appwrite/auth'
import { login } from '@/lib/redux/authSlice'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

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
        <div className='flex min-h-screen bg-gray-100'>
            <div className='w-1/2'>
                <img src='/images/loginSignup-min.png' alt='signup' className='h-full w-full object-cover' />
            </div>
            <div className='w-1/2 flex flex-col justify-center items-center p-8'>
                <div className='w-full max-w-md'>
                    <h2 className='text-3xl font-bold text-gray-900 mb-6 text-center'>Create Account</h2>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type='text' 
                                                placeholder="Choose a username" 
                                                {...field}
                                                disabled={isLoading}
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
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type='email' 
                                                placeholder="Enter your email" 
                                                {...field}
                                                disabled={isLoading}
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type='password' 
                                                placeholder="Create a password" 
                                                {...field}
                                                disabled={isLoading}
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
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type='password' 
                                                placeholder="Confirm your password" 
                                                {...field}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button 
                                className='w-full' 
                                type='submit'
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating account...' : 'Sign Up'}
                            </Button>

                            <div className='text-center mt-4'>
                                <Label className='text-muted-foreground'>
                                    Already have an account?{' '}
                                    <Link className='text-primary hover:underline' to='/login'>
                                        Login
                                    </Link>
                                </Label>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}

export default SignupPage