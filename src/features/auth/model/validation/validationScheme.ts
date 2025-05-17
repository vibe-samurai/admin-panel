import { z } from 'zod'

export const errorMessages = {
  email: {
    required: 'Email is required',
    invalid: 'Invalid email format',
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 5 characters',
    maxLength: 'Password must be at most 20 characters',
    invalid: 'Invalid password format',
    noLeadingSpace: 'Password must not start with a space',
  },
}

type EmailValidation = {
  required: string
  invalid: string
}

type PasswordValidation = {
  required: string
  minLength: string
  maxLength: string
  invalid: string
  noLeadingSpace: string
}

export const email = (messages: EmailValidation = errorMessages.email) => {
  return z.string().trim().min(1, messages.required).email(messages.invalid)
}

export const password = (messages: PasswordValidation = errorMessages.password) => {
  return z
    .string()
    .min(5, messages.minLength)
    .max(20, messages.maxLength)
    .refine(value => !value.startsWith(' '), {
      message: messages.noLeadingSpace,
    })
}

export const loginScheme = (messages: { email: EmailValidation; password: PasswordValidation }) => {
  return z.object({
    email: email(messages.email),
    password: password(messages.password),
  })
}
export type LoginFormValues = z.infer<ReturnType<typeof loginScheme>>
