'use client'

import { useEffect } from 'react'

export function JsPing() {
  useEffect(() => {
    fetch('/api/ping', {
      method: 'POST',
    }).catch(() => {})
  }, [])

  return null
}