"use client"
import { useDeleteContactMutation, useGetContactQuery } from '@/redux/api/admin.api'
import React from 'react'
import { toast } from 'react-toastify'

const Contace = () => {
    const { data } = useGetContactQuery()
    const [deleteContact] = useDeleteContactMutation()

    const handleDelete = async (data: DELETE_SKILL_REQUEST) => {
        try {
            await deleteContact(data).unwrap()
            toast.success("contact deleted ✅")
        } catch (error) {
            console.log(error);
            toast.error("unabel to delete contact")

        }

    }
    return <>
        <div className="container">
            <div className="row">
                <div className="card mt-5">
                    <div className="card-header d-flex justify-content-between align-items-center"> <b>Contact</b>

                    </div>
                    <div className="card-body">
                        {
                            data && <table className='table table-hover text-center'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.result.map(item => <tr key={item._id}>
                                            <td>{item.fullName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.message}</td>
                                            <td>
                                                <button onClick={() => handleDelete({ _id: item._id })} className='btn btn-outline-danger btn-sm'>Delete</button>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Contace