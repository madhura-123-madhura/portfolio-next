import React, { ReactNode } from 'react'
import PublicNavbar from '../_component/PublicNavbar'

const layout = ({ children }: { children: React.ReactNode }) => {
    return <>
        <PublicNavbar />
        {children}
    </>
}

export default layout