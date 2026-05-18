import { NextResponse } from 'next/server'

export async function POST() {
  console.log('JS executed:', new Date().toISOString())

  return NextResponse.json({
    ok: true,
  })
}