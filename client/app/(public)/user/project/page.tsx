"use client"
import { useGetAllProjectQuery } from '@/redux/api/user.api'
import React from 'react'

const Project = () => {
    const { data } = useGetAllProjectQuery()
    return <>
        <div className="card mx-3 mt-5" style={{ width: 1500, height: 500 }}>
            {
                data && <div className="card mx-5 mt-5" style={{ width: 370, height: 250 }}>
                    <div className="card-body">
                        <h5 className="card-title ">
                            Project Name:  {data.result.title}
                        </h5>
                        <h6 className="card-subtitle mb-2 mt-2 text-body-secondary">
                            Category: {data.result.category}
                        </h6>
                        <p className="card-text">
                            Description:{data.result.desc}
                        </p>
                        <a href={data.result.gitHubUrl}><button className='btn btn-dark text-light btn-sm'>Git-Hub</button></a>
                        <a href={data.result.liveUrl}> <button className='btn btn-primary btn-sm'>Live-URL</button> </a>
                    </div>
                </div>
            }
        </div>

    </>
}

export default Project