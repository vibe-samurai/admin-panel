'use client'

import { Alertpopup, Card, Typography } from '@vibe-samurai/visual-ui-kit'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { selectIsAuthenticated } from '@/features/auth/model/selectors/authSelectors'
import { setAuth } from '@/features/auth/model/slices/authSlice'
import { type LoginFormValues } from '@/features/auth/model/validation/validationScheme'
import { LoginForm } from '@/features/auth/ui/login/LoginForm'
import { useLoginAdminMutation } from '@/shared/api/mutations/loginAdmin.generated'

import s from './LoginPage.module.scss'

export default function Login() {
  const [loginAdmin, { loading: isLoading, error: gqlError }] = useLoginAdminMutation()
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (isAuth) router.push('/users')
  }, [isAuth, router])

  const handleSubmit = async (formData: LoginFormValues) => {
    setAlertMessage(null)

    try {
      const res = await loginAdmin({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      })

      const loggedIn = res.data?.loginAdmin.logged

      if (loggedIn) {
        const basicToken = btoa(`${formData.email}:${formData.password}`)

        localStorage.setItem('basicToken', basicToken)
        dispatch(setAuth(true))
      } else {
        setAlertMessage('Invalid credentials')
      }
    } catch (err) {
      console.error(err)
      setAlertMessage('Something went wrong')
    }
  }

  return (
    <>
      <Card className={s.card}>
        <Typography as={'h1'} variant={'h1'}>
          Sign In
        </Typography>

        <LoginForm
          disabled={isLoading}
          onSubmitAction={handleSubmit}
          isError={!!alertMessage || !!gqlError}
        />
      </Card>

      {(alertMessage || gqlError) && (
        <Alertpopup
          alertType={'error'}
          message={alertMessage || gqlError?.message || 'Unknown error'}
          duration={5000}
        />
      )}
    </>
  )
}
