"use client"

import { useCreatAboutMutation, useGetaboutQuery, useUpdateAboutMutation } from '@/redux/api/admin.api'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { format } from 'date-fns'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const About = () => {
    const { data } = useGetaboutQuery()
    const [aboutUpdate] = useUpdateAboutMutation()
    const expSchma = z.object({
        name: z.string().min(1),
        title: z.string().min(1),
        bio: z.string().min(1),
        journey: z.string().min(1),
        currentWork: z.string().min(1),
        dob: z.string().min(1),
        location: z.string().min(1),
        email: z.string().min(1),
        phone: z.string().min(1),
        language: z.string().min(1),
        profileImg: z.string().min(1),
    }) satisfies z.ZodType<UPDATE_ABOUT_REQUEST>

    const { register, reset, handleSubmit, formState: { errors, touchedFields } } = useForm<UPDATE_ABOUT_REQUEST>({
        resolver: zodResolver(expSchma),
        defaultValues: {
            name: "",
            title: "",
            bio: "",
            journey: "",
            currentWork: "",
            dob: "",
            location: "",
            email: "",
            phone: "",
            language: "",
            profileImg: "" ,
        },
    })
    const handleabout = async (updateData: UPDATE_ABOUT_REQUEST) => {
        try {
            await aboutUpdate({ ...updateData, _id: data?.result._id }).unwrap()
            toast.success(" About Updated ✅")
            reset()
        } catch (error) {
            console.log(error);
            toast.error("unabel to Update about")

        }

    }
    const handleEdit = (data: any) => {
        reset({

            name: data.name,
            email: data.email,
            phone: data.phone,
            journey: data.journey,
            currentWork: data.currentWork,
            bio: data.bio,
            language: data.language,
            location: data.location,
            profileImg: data.profileImg,
            title: data.title,
            dob: format(data.dob, "yyy-MM-dd")
        })
    }
    const handleClassess = (key: keyof ABOUT_REQUEST) => clsx({
        "form-control my-1": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })
    return <>
        <div className="container">
            <div className="row">


                {

                    data && <div className="card mt-5">
                        <div className="card-header d-flex justify-content-between align-items-center"> <b>About</b>
                            <button type='button' onClick={() => handleEdit(data.result)} className='btn btn-sm btn-outline-dark' data-bs-toggle="modal" data-bs-target="#edit">add about</button>
                        </div>
                        <div className="card-body">

                            {
                                data && <li key={data.result._id}>
                                    <li> <p><b>Name:</b>  {data.result.name}</p></li>
                                    <li><p><b>Email:</b>  {data.result.email}</p></li>
                                    <li><p><b>Phone:</b>  {data.result.phone}</p></li>
                                    <li><p><b>DOB:</b>  {data.result.dob}</p></li>
                                    <li><p><b>Location:</b>  {data.result.location}</p></li>
                                    <li><p><b>Journey:</b>  {data.result.journey}</p></li>
                                    <li><p><b>Title:</b>  {data.result.title}</p></li>
                                    <li><p><b>Current Work:</b>  {data.result.currentWork}</p></li>
                                    <li> <p><b>Language:</b>  {data.result.language}</p></li>

                                </li>
                            }
                        </div>
                    </div>
                }
                <div className="modal fade" id='edit'>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">Add About</div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(handleabout)} >
                                    <div>
                                        <input className={handleClassess("name")} {...register("name")} type="text" placeholder='name' />
                                        <div className="invalid-feedback">{errors && errors.name?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("email")}  {...register("email")} type="text" placeholder='email ' />
                                        <div className="invalid-feedback">{errors && errors.email?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("phone")}  {...register("phone")} type="text" placeholder='phone ' />
                                        <div className="invalid-feedback">{errors && errors.phone?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("dob")} type='date' {...register("dob")} placeholder='DOB' />
                                        <div className="invalid-feedback">{errors && errors.dob?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("location")}  {...register("location")} type="text" placeholder='location' />
                                        <div className="invalid-feedback">{errors && errors.location?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("title")}  {...register("title")} placeholder='Title' />
                                        <div className="invalid-feedback">{errors && errors.title?.message}</div>
                                    </div>
                                    <div>
                                        <textarea className={handleClassess("bio")}  {...register("bio")} placeholder='Bio' />
                                        <div className="invalid-feedback">{errors && errors.bio?.message}</div>
                                    </div>
                                    <div>
                                        <textarea className={handleClassess("journey")}  {...register("journey")} placeholder='journey' />
                                        <div className="invalid-feedback">{errors && errors.journey?.message}</div>
                                    </div>
                                    <div>
                                        <textarea className={handleClassess("currentWork")}  {...register("currentWork")} placeholder='current work' />
                                        <div className="invalid-feedback">{errors && errors.currentWork?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("language")}  {...register("language")} placeholder='language' />
                                        <div className="invalid-feedback">{errors && errors.language?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("profileImg")} type='file'  {...register("profileImg")} placeholder='profile Url' />
                                        <div className="invalid-feedback">{errors && errors.profileImg?.message}</div>
                                    </div>
                                    <div className='text-end'>
                                        <button type='submit' className='btn btn-info '>Update About</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    </>
}

export default About