"use client"
import { useGetExpQuery } from '@/redux/api/user.api'
import React from 'react'

const Experience = () => {
    const { data } = useGetExpQuery()
    return <>
        <div className="container">
            <div className="row">
                <div className="card mt-5">
                    <div className="card-header d-flex justify-content-between align-items-center"> <b>Experience</b>
                    </div>
                    <div className="card-body">
                        {
                            data && <table className='table table-hover text-center'>
                                <thead className='table-warning'>
                                    <tr>
                                        <th>Role</th>
                                        <th>Company</th>
                                        <th>Period</th>
                                        <th>Description</th>
                                        <th>Responsibility</th>

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
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>

            </div>
        </div >
    </>
}

export default Experience