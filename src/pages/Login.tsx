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

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(50),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        const { email, password } = values
        loginAccount({ email, password })

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

                        <div className=''>
                            <Button className='w-full' type='submit'>Submit</Button>
                        </div>

                        <div>
                            <Label>
                                <p>Already have an account</p>
                                <Link className='underline' to={'/signup'}>Login</Link>
                            </Label>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default Login