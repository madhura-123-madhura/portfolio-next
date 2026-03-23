"use client"

import { useLoginMutation } from '@/redux/api/auth.api'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Login = () => {
    const router = useRouter()
    const [login] = useLoginMutation()
    const loginSchma = z.object({
        email: z.string().min(1),
        password: z.string().min(1)
    }) satisfies z.ZodType<LOGIN_REQUEST>

    const { register, reset, handleSubmit, formState: { errors, touchedFields } } = useForm<LOGIN_REQUEST>({
        resolver: zodResolver(loginSchma),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const handleLogin = async (data: LOGIN_REQUEST) => {
        try {
            await login(data).unwrap()
            toast.success("login success ✅")
            reset()
            router.push("/admin")
        } catch (error) {
            console.log(error);
            toast.error("unabel to login")

        }

    }
    const handleClassess = (key: keyof LOGIN_REQUEST) => clsx({
        "form-control my-3": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })
    return <>
        <div className="container">
            <div className="row">
                <div className="col-sm-4 offset-sm-4 mt-5">
                    <div className="card">
                        <div className="card-header text-center"> <h5>Login here</h5></div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleLogin)} >
                                <div>
                                    <input className={handleClassess("email")} {...register("email")} type="text" placeholder='example@mail.com' />
                                    <div className="invalid-feedback">{errors && errors.email?.message}</div>
                                </div>
                                <div>
                                    <input className={handleClassess("password")}  {...register("password")} type="text" placeholder='enter password' />
                                    <div className="invalid-feedback">{errors && errors.password?.message}</div>
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    </>
}

export default Login