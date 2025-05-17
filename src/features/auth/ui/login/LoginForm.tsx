'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@vibe-samurai/visual-ui-kit'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  errorMessages,
  type LoginFormValues,
  loginScheme,
} from '@/features/auth/model/validation/validationScheme'

import s from './LoginForm.module.scss'

type Props = {
  disabled?: boolean
  onSubmitAction: (formData: LoginFormValues) => void
  isError: boolean
}

export const LoginForm = ({ disabled, onSubmitAction, isError }: Props) => {
  const [errorForm, setErrorForm] = useState<boolean>(isError)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(loginScheme(errorMessages)),
  })

  const onChangeHandler = () => {
    if (errorForm) setErrorForm(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitAction)} className={s.form}>
      <Input
        className={s.fullWidth}
        type={'email'}
        label={'Email'}
        placeholder={'Email'}
        disabled={disabled}
        {...register('email', { onChange: onChangeHandler })}
        onBlur={async () => {
          await trigger('email')
        }}
        errorMessage={(errorForm || errors.email) && ''}
      />

      <Input
        className={s.fullWidth}
        type={'password'}
        label={'Password'}
        placeholder={'********'}
        disabled={disabled}
        {...register('password', { onChange: onChangeHandler })}
        onBlur={async () => {
          await trigger('password')
        }}
        errorMessage={
          (errorForm || errors.password || errors.email) &&
          'The email or password are incorrect. Try again please'
        }
      />

      <Button variant={'primary'} fullWidth type={'submit'} disabled={disabled || !isValid}>
        Sign In
      </Button>
    </form>
  )
}
