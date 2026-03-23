"use client"

import { useCreateProjectMutation, useDeleteProjectMutation, useGetProjectQuery, useUpdateProjectMutation } from '@/redux/api/admin.api'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Project = () => {
    const [editSkill, setEditSkill] = useState<string | null>()
    const [deleteProject] = useDeleteProjectMutation()
    const [UpdateProject] = useUpdateProjectMutation()
    const { data } = useGetProjectQuery()
    const [createProject] = useCreateProjectMutation()
    const projectSchma = z.object({
        title: z.string().min(1),
        desc: z.string().min(1),
        category: z.string().min(1),
        technologies: z.string().min(1),
        liveUrl: z.string().min(1),
        gitHubUrl: z.string().min(1),
    }) satisfies z.ZodType<PROJECT_REQUEST>

    const { register, reset, handleSubmit, formState: { errors, touchedFields } } = useForm<PROJECT_REQUEST>({
        resolver: zodResolver(projectSchma),
        defaultValues: {
            title: "",
            desc: "",
            category: "",
            technologies: "",
            liveUrl: "",
            gitHubUrl: "",
        },
    })
    const handleProject = async (data: PROJECT_REQUEST) => {
        try {
            if (editSkill) {
                await UpdateProject({ ...data, _id: editSkill }).unwrap()
                toast.success("update Success")
                reset({ title: "", desc: "", category: "", technologies: "", liveUrl: "", gitHubUrl: "" })
                setEditSkill(null)

            } else {
                await createProject(data).unwrap()
                toast.success(" new Project added ✅")
                reset()

            }
        } catch (error) {
            console.log(error);
            toast.error("unabel to add project")

        }

    }
    const handleEdit = (data: any) => {
        reset({
            title: data.title,
            desc: data.desc,
            category: data.category,
            technologies: data.technologies,
            gitHubUrl: data.gitHubUrl,
            liveUrl: data.liveUrl,

            // due: format(data.due, "yyy-MM-dd")
        })
    }
    const handleDelete = async (data: DELETE_REQUEST) => {
        try {
            await deleteProject(data).unwrap()
            toast.success("skill deleted ✅")
            reset()
        } catch (error) {
            console.log(error);
            toast.error("unabel to add skill")

        }

    }
    const handleClassess = (key: keyof PROJECT_REQUEST) => clsx({
        "form-control my-3": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })

    return <div className="container">
        <div className="row">


            <div className="card mt-5">
                <div className="card-header d-flex justify-content-between align-items-center"> <b>Projects</b>
                    <button type='button' className='btn btn-sm btn-outline-dark' data-bs-toggle="modal" data-bs-target="#edit">add project</button>
                </div>
                <div className="card-body">
                    {
                        data && <table className='table table-hover text-center'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Technologies</th>
                                    <th>Live Url</th>
                                    <th>GitHub Url</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.result.map(item => <tr key={item._id}>
                                        <td>{item.title}</td>
                                        <td>{item.desc}</td>
                                        <td>{item.category}</td>
                                        <td>{item.technologies}</td>
                                        <td>
                                            <a href={item.liveUrl}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-link" viewBox="0 0 16 16">
                                                <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                                                <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
                                            </svg></a>
                                        </td>
                                        <td>
                                            <a href={item.gitHubUrl}><button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                            </svg></button></a>
                                        </td>
                                        <td>
                                            <button onClick={() => {
                                                handleEdit({ item })
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
                            <form onSubmit={handleSubmit(handleProject)} >
                                <div>
                                    <input className={handleClassess("title")} {...register("title")} type="text" placeholder='project title' />
                                    <div className="invalid-feedback">{errors && errors.title?.message}</div>
                                </div>
                                <div>
                                    <input className={handleClassess("desc")}  {...register("desc")} type="text" placeholder='description' />
                                    <div className="invalid-feedback">{errors && errors.desc?.message}</div>
                                </div>
                                <div>
                                    <input className={handleClassess("category")}  {...register("category")} type="text" placeholder='category' />
                                    <div className="invalid-feedback">{errors && errors.category?.message}</div>
                                </div>
                                <div>
                                    <input className={handleClassess("liveUrl")}  {...register("liveUrl")} type="text" placeholder='live Url' />
                                    <div className="invalid-feedback">{errors && errors.liveUrl?.message}</div>
                                </div>
                                <div>
                                    <input className={handleClassess("technologies")}  {...register("technologies")} type="text" placeholder='technologies' />
                                    <div className="invalid-feedback">{errors && errors.technologies?.message}</div>
                                </div>
                                <div>
                                    <input className={handleClassess("gitHubUrl")}  {...register("gitHubUrl")} type="text" placeholder='gitHub Url' />
                                    <div className="invalid-feedback">{errors && errors.gitHubUrl?.message}</div>
                                </div>

                                {
                                    editSkill
                                        ? <div className='text-end'>
                                            <button type='submit' data-bs-dismiss="modal" className='btn btn-warning '>Add update</button>
                                        </div>
                                        : <div className='text-end'>
                                            <button type='submit' data-bs-dismiss="modal" className='btn btn-info '>Add project</button>
                                        </div>
                                }

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    </div>

}

export default Project