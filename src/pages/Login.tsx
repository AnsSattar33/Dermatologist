import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { createAccount } from '@/lib/appwrite/auth'
import { login, logout } from '@/lib/redux/authSlice'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'

const Login = () => {

    const navigate = useNavigate()

    const formSchema = z.object({
        username: z.string().min(2).max(50),
        email: z.string().email(),
        password: z.string().min(8).max(50),
        confirmPassword: z.string().min(8).max(50)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        const { email, password, username } = values
        createAccount({ email, password, username })
        console.log(values)
        navigate('/upload')
    }

    return (
        <div className='flex bg-gray-100'>
            <div className='w-1/2'>
                <img src='/images/loginSignup-min.png' alt='login image' />
            </div>
            <div className='w-1/2 flex flex-col justify-center items-center'>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-1/2 flex flex-col space-y-10'>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='mb-1'>Username</FormLabel>
                                    <FormControl className='mb-1'>
                                        <Input type='text' placeholder="shadcn" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='mb-1'>Email</FormLabel>
                                    <FormControl className='mb-1'>
                                        <Input type='email' placeholder="Enter Email" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='mb-1'>Password</FormLabel>
                                    <FormControl className='mb-1'>
                                        <Input type='password' placeholder="Enter Password" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='mb-1'>Email</FormLabel>
                                    <FormControl className='mb-1'>
                                        <Input type='password' placeholder="Enter Confirm password" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className=''>
                            <Button className='w-full' type='submit'>Submit</Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default Login