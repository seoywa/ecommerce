import AuthForm from '@/src/components/AuthForm'
import { signIn } from '@/src/lib/auth/actions'
import React from 'react'

const SignIn = () => {
  return (
    <AuthForm mode='sign-in' onSubmit={signIn} />

  )
}

export default SignIn