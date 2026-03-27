import Link from 'next/link'
import React from 'react'

const PublicNavbar = () => {
    return <>
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">Madhura</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link active" href="/">Home</Link>
                        <Link className="nav-link" href="/user/about">About</Link>
                        <Link className="nav-link" href="/user/experience">Experience</Link>
                        <Link className="nav-link" href="/user/project">Project</Link>
                        <Link className="nav-link" href="/user/contact">  <button className='btn btn-info btn-sm'>Contact</button></Link>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default PublicNavbar