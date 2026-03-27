"use client"

import { useGetaboutQuery, useUpdateAboutMutation } from '@/redux/api/admin.api'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'
type ProfileFormValues = {
    name: string
    title: string
    bio: string
    journey: string
    currentWork: string
    dob: string
    location: string
    email: string
    phone: string
    language: string
    profileImg?: FileList
}
const optionalFileList = z.any().refine(
    (files) => !files || files.length === 0 || files[0] instanceof File,
    "Invalid file"
)
const About = () => {
    const { data } = useGetaboutQuery()
    const [aboutUpdate, { isLoading: isProfileUpdating }] = useUpdateAboutMutation()
    const [showProfilePicInput, setShowProfilePicInput] = useState(false)
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
        profileImg: optionalFileList.optional(),
    }) satisfies z.ZodType<ProfileFormValues>

    const { register, reset, handleSubmit, setValue, formState: { errors, touchedFields } } = useForm<ProfileFormValues>({
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
            language: ""

        },
    })
    useEffect(() => {
        if (!data?.result) return
        reset({
            name: data.result.name ?? "",
            title: data.result.title ?? "",
            bio: data.result.bio ?? "",
            journey: data.result.journey ?? "",
            currentWork: data.result.currentWork ?? "",
            dob: data.result.dob ?? "",
            location: data.result.location ?? "",
            email: data.result.email ?? "",
            phone: data.result.phone ?? "",
            language: data.result.language ?? "",
        })
        setValue("profileImg", undefined)
        setShowProfilePicInput(false)
    }, [data, reset, setValue])
    const handleabout = async (data: ProfileFormValues) => {

        try {
            const fd = new FormData()
            fd.append("name", data.name.trim())
            fd.append("title", data.title.trim())
            fd.append("bio", data.bio.trim())
            fd.append("journey", data.journey.trim())
            fd.append("currentWork", data.currentWork.trim())
            fd.append("dob", data.dob.trim())
            fd.append("location", data.location.trim())
            fd.append("email", data.email.trim())
            fd.append("phone", data.phone.trim())
            fd.append("language", data.language.trim())
            const file = data?.profileImg?.item?.(0)
            if (file) {
                fd.append("profileImg", file)
            }
            await aboutUpdate(fd).unwrap()
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
    const handleClassess = (key: keyof ProfileFormValues) => clsx({
        "form-control my-1": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })
    const hasprofileImg = Boolean(data?.result?.profileImg)
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
                                        {hasprofileImg && !showProfilePicInput ? (
                                            <div className="d-flex flex-column gap-2">
                                                <img src={data?.result?.profileImg}
                                                    alt="Profile"
                                                    className="img-thumbnail"
                                                    style={{ width: 140, height: 140, objectFit: "cover" }}
                                                />
                                                <button
                                                    className="btn btn-outline-primary btn-sm align-self-start"
                                                    type="button"
                                                    onClick={() => setShowProfilePicInput(true)}
                                                >
                                                    Change
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="d-flex flex-column gap-2">
                                                <input
                                                    className="form-control"
                                                    id="profileImg"
                                                    type="file"
                                                    {...register("profileImg")}
                                                />
                                                {hasprofileImg ? (
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm align-self-start"
                                                        type="button"
                                                        onClick={() => {
                                                            setShowProfilePicInput(false)
                                                            setValue("profileImg", undefined)
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                ) : null}
                                            </div>
                                        )}
                                    </div>
                                    <button className="btn btn-primary" type="submit" disabled={isProfileUpdating}>
                                        {isProfileUpdating ? "Updating..." : "Update Profile"}
                                    </button>
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