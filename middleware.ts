import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  console.log('--- Visitor ---')

  console.log({
    path: req.nextUrl.pathname,
    ua: req.headers.get('user-agent'),
    ip: req.headers.get('x-forwarded-for'),
    country: req.headers.get('x-vercel-ip-country'),
    region: req.headers.get('x-vercel-ip-country-region'),
    city: req.headers.get('x-vercel-ip-city'),
    vercelId: req.headers.get('x-vercel-id'),
  })

  return NextResponse.next()
}

export const config = {
  matcher: '/',
}