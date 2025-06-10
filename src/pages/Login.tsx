import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { loginAccount } from '@/lib/appwrite/auth'
import { login } from '@/lib/redux/authSlice'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
    })

    type FormData = z.infer<typeof formSchema>

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: FormData) => {
        try {
            setIsLoading(true)
            const result = await loginAccount(values)
            
            dispatch(login({
                username: result.name || result.userId,
                email: result.email,
            }))
            
            toast.success('Welcome back!')
            navigate('/upload')
        } catch (error: any) {
            toast.error(error.message || 'Login failed. Please check your credentials.')
            form.setError('password', { 
                type: 'manual',
                message: 'Invalid credentials'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex min-h-screen bg-gray-100'>
            <div className='w-1/2'>
                <img src='/images/loginSignup-min.png' alt='login' className='h-full w-full object-cover' />
            </div>
            <div className='w-1/2 flex flex-col justify-center items-center p-8'>
                <div className='w-full max-w-md'>
                    <h2 className='text-3xl font-bold text-gray-900 mb-6 text-center'>Welcome Back</h2>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
                                                autoComplete="email"
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
                                                placeholder="Enter your password" 
                                                {...field}
                                                disabled={isLoading}
                                                autoComplete="current-password"
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
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>

                            <div className='text-center mt-4'>
                                <Label className='text-muted-foreground'>
                                    Don't have an account?{' '}
                                    <Link className='text-primary hover:underline' to='/signup'>
                                        Sign up
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

export default Login