"use client"
import { useCreateContactMutation } from '@/redux/api/user.api'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Contact = () => {
    const [createContact] = useCreateContactMutation()
    const contactSchma = z.object({
        fullName: z.string().min(1),
        mobile: z.string().min(1),
        email: z.string().min(1),
        message: z.string().min(1),
    }) satisfies z.ZodType<CONTACT_CREATE_REQUEST>

    const { register, reset, handleSubmit, formState: { errors, touchedFields } } = useForm<CONTACT_CREATE_REQUEST>({
        resolver: zodResolver(contactSchma),
        defaultValues: {
            fullName: "",
            mobile: "",
            email: "",
            message: "",

        },
    })
    const hadleContact = async (data: CONTACT_CREATE_REQUEST) => {
        try {
            await createContact(data).unwrap()
            toast.success("message send ✅")
            reset()
        } catch (error) {
            console.log(error);
            toast.error("unabel to send message")

        }

    }
    const handleClassess = (key: keyof CONTACT_CREATE_REQUEST) => clsx({
        "form-control my-3": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })
    return <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-4 offset-sm-4 mt-5">
                    <div className="card mb-5">
                        <div className="card-header text-center"> <h5>Contact</h5></div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(hadleContact)} >
                                <div>
                                    <input className={handleClassess("fullName")} {...register("fullName")} type="text" placeholder='Name' />
                                    <div className="invalid-feedback">{errors && errors.fullName?.message}</div>
                                </div>
                                <div>
                                    <input className={handleClassess("mobile")} {...register("mobile")} type="text" placeholder='mobile number' />
                                    <div className="invalid-feedback">{errors && errors.mobile?.message}</div>
                                </div>
                                <div>
                                    <input className={handleClassess("email")} {...register("email")} type="text" placeholder='example@mail.com' />
                                    <div className="invalid-feedback">{errors && errors.email?.message}</div>
                                </div>
                                <div>
                                    <textarea className={handleClassess("message")}  {...register("message")} placeholder='enter message' />
                                    <div className="invalid-feedback">{errors && errors.message?.message}</div>
                                </div>
                                <button type='submit' className='btn btn-info '>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    </>
}

export default Contact