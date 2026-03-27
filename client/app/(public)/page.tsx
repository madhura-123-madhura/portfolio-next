"use client"

import { useGetAboutQuery, useGetStatQuery } from '@/redux/api/user.api'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return <>
    <About />
    <Skill />
    <Footer />
  </>
}

const About = () => {
  const { data } = useGetAboutQuery()

  console.log(data);

  return <>

    {
      data && <div className="container mb-5">
        {
          data && <div className="row  ">
            <div className="col-sm-6 mt-5 ">
              <div className='mx-5'>
                <p className='mt-5  '>
                  Hello,
                  <h1 className='text-info'> I'am Madhura</h1>
                  <h4>web Designer and Devloper</h4>
                  <a href="/user/contact"><button className='btn btn-info mt-3 text-light'>Hire me</button></a>
                </p>
              </div>
            </div>
            <div className="col-sm-6 mt-5 text-center ">
              <img className='rounded float-lef' src={data.result.profileImg} height={500} alt="" />
            </div>
          </div>

        }
      </div>
    }
    <hr />

    <div className="container ">
      {
        data && <div className="row">
          <div className="col-sm-6 text-center " >
            <h5 className='text-light mt-2'>Statistics</h5>
            <Stat />
          </div>
          <div className="col-sm-6">
            <h3 className='text-link fw-bold mt-5 text-decoration-underline link-info'>
              About
            </h3>
            <p className='mt-5 text-wrap fs-6'>
              {data.result.bio}
            </p>

            <a download="" href={data.result.resume} target="_blank">
              <button type='submit' className='btn btn-dark mt-4'  >Download Resume</button>
            </a>
          </div>


        </div>
      }
    </div >
    <hr />
  </>

}
const Skill = () => {

  return <>
    <div className="container mt-3 ">
      <div className="container text-center">
        <div className="card">
          <div className="row">
            <div className="col-sm-2 offset-sm-3">
              <img src="https://tse4.mm.bing.net/th/id/OIP.4dQkxLm-cAndV-9OfVjjQwHaE8?pid=Api&P=0&h=180" height={150} width={150} alt="" />
            </div>
            <div className="col-sm-2 mt-3">
              <img src="https://tse1.mm.bing.net/th/id/OIP.0P6Lz1NzJYcAACiRxJHfpwHaHa?pid=Api&P=0&h=180" height={100} width={100} alt="" />
            </div>

            <div className="col-sm-2 mt-3">
              <img src="https://tse1.mm.bing.net/th/id/OIP.f5buM1eu2K4VMgos0TjR6AHaKZ?pid=Api&P=0&h=180" height={100} width={100} alt="" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 offset-sm-3 ">
              <img src="https://tse4.mm.bing.net/th/id/OIP.0_tNJx2QnZdMQkoAHjiq0gHaEK?pid=Api&P=0&h=180" height={150} width={200} alt="" />
            </div>
            <div className="col-sm-2 mt-3">
              <img src="https://tse3.mm.bing.net/th/id/OIP.1CKAr_Q7vy6xZOh7c4BjdQHaHa?pid=Api&P=0&h=180" height={100} width={100} alt="" />
            </div>
            <div className="col-sm-2">
              <img src="https://tse4.mm.bing.net/th/id/OIP.Ae6KuLbSCjSEbFBy2o2uiAHaHa?pid=Api&P=0&h=180" height={150} width={150} alt="" />
            </div>
          </div>
        </div>
      </div>

    </div >




  </>
}

const Stat = () => {
  const { data } = useGetStatQuery()
  console.log(data);

  return <>
    <div className="container">

      {
        data && <div className="card mt-4 bg-info">
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col-sm-3 offset-sm-2 text-center">
                  <div className="card">
                    <div className="card-body bg-warning border-black"> <h4> {data.result.expYear}</h4><h6>Experience year</h6></div>
                  </div>
                </div>
                <div className="col-sm-3 offset-sm-2 text-center">
                  <div className="card">
                    <div className="card-body bg-warning "> <h4>{data.result?.noOfProject}</h4><h6>Number of Project</h6></div>
                  </div>
                </div>
                <div className="col-sm-3 offset-sm-2 text-center mt-3">
                  <div className="card">
                    <div className="card-body bg-warning "> <h4>{data.result?.tech}</h4><h6>Technologies</h6></div>
                  </div>
                </div>
                <div className="col-sm-3 offset-sm-2 text-center mt-3">
                  <div className="card">
                    <div className="card-body bg-warning "> <h4>{data.result?.happyClient}</h4><h6>Happy custemor</h6></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      }

    </div>

  </>
}

const Footer = () => {
  return <div className='bg-dark'>

  </div>
}

export default Home