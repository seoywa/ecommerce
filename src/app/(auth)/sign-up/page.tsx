import AuthForm from '@/src/components/AuthForm'
import { signUp } from '@/src/lib/auth/actions'
import React from 'react'

const SignUp = () => {
  return (
    <AuthForm mode='sign-up' 
    onSubmit={signUp}
     />
  )
}

export default SignUp