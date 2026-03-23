import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

const proxy = (req: NextRequest) => {
    const { pathname } = req.nextUrl
    const admintoken = req.cookies.get("ADMIN")?.value
    console.log(pathname);

    if (pathname.startsWith("/admin") && !admintoken) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*"]
}

export default proxy