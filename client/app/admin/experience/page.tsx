"use client"
import { useCreateexpMutation, useDeleteExpMutation, useGetexpQuery, useUpdateExpMutation } from '@/redux/api/admin.api'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Experience = () => {
    const [editExp, setEditExp] = useState<string | null>()
    const [deleteExp] = useDeleteExpMutation()
    const [updateExp] = useUpdateExpMutation()
    const { data } = useGetexpQuery()
    const [exp] = useCreateexpMutation()
    const expSchma = z.object({
        Role: z.string().min(1),
        company: z.string().min(1),
        period: z.string().min(1),
        desc: z.string().min(1),
        risponsibility: z.string().min(1),
    }) satisfies z.ZodType<EXP_REQUEST>

    const { register, reset, handleSubmit, formState: { errors, touchedFields } } = useForm<EXP_REQUEST>({
        resolver: zodResolver(expSchma),
        defaultValues: {
            Role: "",
            company: "",
            period: "",
            desc: "",
            risponsibility: "",
        },
    })
    const handleExp = async (data: EXP_REQUEST) => {
        try {
            if (editExp) {
                await updateExp({ ...data, _id: editExp }).unwrap()
                toast.success(" new experience added ✅")
                reset()
            }
            await exp(data).unwrap()
            toast.success(" new experience added ✅")
            reset()
        } catch (error) {
            console.log(error);
            toast.error("unabel to add experience")

        }

    }
    const handleDelete = async (data: DELETE_EXP_REQUEST) => {
        try {
            await deleteExp(data).unwrap()
            toast.success(" new experience delete ✅")
            reset()
        } catch (error) {
            console.log(error);
            toast.error("unabel to delete experience")

        }

    }

    const handleEdit = (data: any) => {
        reset({
            company: data.company,
            desc: data.desc,
            period: data.period,
            risponsibility: data.responsibility,
            Role: data.Role
        })
    }
    const handleClassess = (key: keyof EXP_REQUEST) => clsx({
        "form-control my-3": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })
    return <>
        <div className="container">
            <div className="row">

                <div className="card mt-5">
                    <div className="card-header d-flex justify-content-between align-items-center"> <b>Experience</b>
                        <button type='button' className='btn btn-sm btn-outline-dark' data-bs-toggle="modal" data-bs-target="#edit">add experience</button>
                    </div>
                    <div className="card-body">
                        {
                            data && <table className='table table-hover text-center'>
                                <thead>
                                    <tr>
                                        <th>Role</th>
                                        <th>Company</th>
                                        <th>Period</th>
                                        <th>Description</th>
                                        <th>Responsibility</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.result.map(item => <tr key={item._id}>
                                            <td>{item.Role}</td>
                                            <td>{item.company}</td>
                                            <td>{item.period}</td>
                                            <td>{item.desc}</td>
                                            <td>{item.risponsibility}</td>
                                            <td>
                                                <button onClick={() => {
                                                    handleEdit(item)
                                                    setEditExp(item._id)
                                                }} className='btn btn-outline-warning btn-sm mx-2' data-bs-toggle="modal" data-bs-target="#edit">Edit</button>
                                                <button onClick={() => handleDelete({ _id: item._id })} className='btn btn-outline-danger btn-sm'>Delete</button>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
                <div className="modal fade" id='edit'>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">Add Expriece</div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(handleExp)} >
                                    <div>
                                        <input className={handleClassess("Role")} {...register("Role")} type="text" placeholder='role' />
                                        <div className="invalid-feedback">{errors && errors.Role?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("company")}  {...register("company")} type="text" placeholder='company name' />
                                        <div className="invalid-feedback">{errors && errors.company?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("period")}  {...register("period")} type="text" placeholder='period of working' />
                                        <div className="invalid-feedback">{errors && errors.period?.message}</div>
                                    </div>
                                    <div>
                                        <textarea className={handleClassess("desc")}  {...register("desc")} placeholder='description' />
                                        <div className="invalid-feedback">{errors && errors.desc?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("risponsibility")}  {...register("risponsibility")} type="text" placeholder='risponsibility' />
                                        <div className="invalid-feedback">{errors && errors.risponsibility?.message}</div>
                                    </div>
                                    {
                                        editExp
                                            ? <div className='text-end'>
                                                <button type='submit' data-bs-dismiss="modal" className='btn btn-warning '>Add update</button>
                                            </div>
                                            : <div className='text-end'>
                                                <button type='submit' data-bs-dismiss="modal" className='btn btn-info '>Add Experiance</button>
                                            </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    </>
}

export default Experience