"use client"

import { useCreatstatMutation, useGetstatQuery, useUpdatestatMutation } from '@/redux/api/admin.api'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Statistics = () => {
    const [Edit, setEdit] = useState<UPDATE_STAT_RESPONCE | null>()
    const [UpdateEdit] = useUpdatestatMutation()
    const { data } = useGetstatQuery()
    const statSchma = z.object({
        expYear: z.string().min(1),
        noOfProject: z.string().min(1),
        tech: z.string().min(1),
        happyClient: z.string().min(1),
    }) satisfies z.ZodType<UPDATE_STAT_REQUEST>

    const { register, reset, handleSubmit, formState: { errors, touchedFields } } = useForm<UPDATE_STAT_REQUEST>({
        resolver: zodResolver(statSchma),
        defaultValues: {
            expYear: "",
            noOfProject: "",
            tech: "",
            happyClient: "",
        },
    })
    const handleStat = async (statData: UPDATE_STAT_REQUEST) => {
        try {
            // if (Edit) {
            await UpdateEdit({ ...statData, _id: data?.result._id }).unwrap()
            reset({ expYear: "", happyClient: '', noOfProject: "", tech: "" })
            toast.success(" statistic update ✅")
            reset()
            // }
        } catch (error) {
            console.log(error);
            toast.error("unabel to add statistic")

        }

    }

    const handleEdit = (data: any) => {
        reset({
            expYear: data.result.expYear,
            happyClient: data.result.happyClient,
            noOfProject: data.result.noOfProject,
            tech: data.result.tech

        })


    }
    const handleClassess = (key: keyof UPDATE_STAT_REQUEST) => clsx({
        "form-control my-3": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })

    console.log(errors)

    return <>
        <div className="container">
            <div className="row">

                {
                    data && <div className="card mt-5">
                        <div className="card-header d-flex justify-content-between align-items-center"> <b>Statistics</b>

                            <button type='button' className='btn btn-sm btn-outline-dark' onClick={() => handleEdit(data)} data-bs-toggle="modal" data-bs-target="#edit">add statistic</button>

                        </div>
                        <div className="card-body">
                            {
                                data &&
                                <div className="card">
                                    <div className="card-body">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm-4 offset-sm-1 text-center">
                                                    <div className="card">
                                                        <div className="card-body"> <h4> {data.result?.expYear}</h4><h6>Experience year</h6></div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4 offset-sm-1 text-center">
                                                    <div className="card">
                                                        <div className="card-body"> <h4>{data.result?.noOfProject}</h4><h6>Number of Project</h6></div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4 offset-sm-1 text-center mt-3">
                                                    <div className="card">
                                                        <div className="card-body"> <h4>{data.result?.tech}</h4><h6>Technologies</h6></div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4 offset-sm-1 text-center mt-3">
                                                    <div className="card">
                                                        <div className="card-body"> <h4>{data.result?.happyClient}</h4><h6>Happy custemor</h6></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            }
                        </div>
                    </div>
                }


                <div className="modal fade" id='edit'>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">Add Skills</div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(handleStat)} >

                                    <div>
                                        <input className={handleClassess("expYear")} {...register("expYear")} type="text" placeholder='experience years' />
                                        <div className="invalid-feedback">{errors && errors.expYear?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("noOfProject")}  {...register("noOfProject")} type="text" placeholder='number of projects' />
                                        <div className="invalid-feedback">{errors && errors.noOfProject?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("tech")}  {...register("tech")} type="text" placeholder='technologies used' />
                                        <div className="invalid-feedback">{errors && errors.tech?.message}</div>
                                    </div>
                                    <div>
                                        <input className={handleClassess("happyClient")}  {...register("happyClient")} type="text" placeholder='happy client' />
                                        <div className="invalid-feedback">{errors && errors.happyClient?.message}</div>
                                    </div>
                                    <div className='text-end'>
                                        <button type='submit' data-bs-dismiss="modal" className='btn btn-info '>Update statistics</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default Statistics