"use client"

import { useCreatskillMutation, useDeleteskillMutation, useGetskillQuery, useUpdateskillMutation } from '@/redux/api/admin.api'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Skill = () => {
    const [editSkill, setEditSkill] = useState<string | null>()
    const [deleteSkill] = useDeleteskillMutation()
    const [updateSkill] = useUpdateskillMutation()
    const { data } = useGetskillQuery()
    const [skills] = useCreatskillMutation()
    const skillSchma = z.object({
        skillName: z.string().min(1),
        category: z.string().min(1),
        level: z.string().min(1),
    }) satisfies z.ZodType<SKILL_REQUEST>

    const { register, reset, handleSubmit, formState: { errors, touchedFields } } = useForm<SKILL_REQUEST>({
        resolver: zodResolver(skillSchma),
        defaultValues: {
            skillName: "",
            category: "",
            level: ""
        },
    })
    const handleSkill = async (data: SKILL_REQUEST) => {
        try {
            if (editSkill) {
                await updateSkill({ ...data, _id: editSkill }).unwrap()
                toast.success("update Success")
                reset({ skillName: "", category: "", level: "" })
                setEditSkill(null)
            } else {
                await skills(data).unwrap()
                toast.success(" new skill added ✅")
                reset()
            }

        } catch (error) {
            console.log(error);
            toast.error("unabel to add skill")

        }

    }
    const handleDelete = async (data: DELETE_SKILL_REQUEST) => {
        try {
            await deleteSkill(data).unwrap()
            toast.success("skill deleted ✅")
            reset()


        } catch (error) {
            console.log(error);
            toast.error("unabel to add skill")

        }

    }
    const handleEdit = (data: any) => {
        reset({
            skillName: data.skillName,
            category: data.category,
            level: data.level
            // due: format(data.due, "yyy-MM-dd")
        })
    }
    const handleClassess = (key: keyof SKILL_REQUEST) => clsx({
        "form-control my-3": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })
    return <>
        <div className="container">
            <div className="row">

                <div className="card mt-5">
                    <div className="card-header d-flex justify-content-between align-items-center"> <b>Skills</b>

                        <button type='button' className='btn btn-sm btn-outline-dark' data-bs-toggle="modal" data-bs-target="#edit">add skills</button>
                    </div>
                    <div className="card-body">
                        {
                            data && <table className='table table-hover text-center'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>level</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.result.map(item => <tr key={item._id}>

                                            <td>{item.skillName}</td>
                                            <td>{item.category}</td>
                                            <td>{item.level}</td>
                                            <td>
                                                <button onClick={() => {
                                                    handleEdit(item)
                                                    setEditSkill(item._id)
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
                            <div className="modal-header">Add Skills</div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(handleSkill)} >
                                    <div>
                                        <input className={handleClassess("skillName")} {...register("skillName")} type="text" placeholder='skill name' />
                                        <div className="invalid-feedback">{errors && errors.skillName?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("category")}  {...register("category")} type="text" placeholder='category' />
                                        <div className="invalid-feedback">{errors && errors.category?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("level")}  {...register("level")} type="text" placeholder='level(10-100)' />
                                        <div className="invalid-feedback">{errors && errors.level?.message}</div>
                                    </div>
                                    {
                                        editSkill
                                            ? <div className='text-end'>
                                                <button type='submit' data-bs-dismiss="modal" className='btn btn-warning '>Add update</button>
                                            </div>
                                            : <div className='text-end'>
                                                <button type='submit' data-bs-dismiss="modal" className='btn btn-info '>Add Skill</button>
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

export default Skill