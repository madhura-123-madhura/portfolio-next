"use client"

import { useGetAboutQuery } from '@/redux/api/user.api'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return <>
    <About />
  </>
}

const About = () => {
  const { data } = useGetAboutQuery()
  console.log(data);

  return <>
    {
      data && <div className="card mt-5">
        <div className="card-body">
          {
            data && <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <p>
                    Hello,
                    <h1> I'am Madhura</h1>
                    <h4>web Designer and Devloper</h4>
                  </p>
                </div>
                <div className="col-sm-6">
                  <p> {data.result.bio}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    }





  </>
}

export default Home