'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAppDispatch } from '@/app/store/store'
import { setAuth } from '@/features/auth/model/slices/authSlice'

export function AuthChecker() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem('basicToken')

    if (token) {
      dispatch(setAuth(true))
    } else {
      dispatch(setAuth(false))
      if (pathname !== '/auth/login') {
        router.push('/auth/login')
      }
    }
  }, [dispatch, router, pathname])

  return null
}
