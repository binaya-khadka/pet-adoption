import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userValidationSchema } from '../../../../validationSchemas'
import { useMutation } from 'react-query'
import { userService } from '../../../services'
import { localStorageUtils } from '../../../utils'
import { useNavigate } from 'react-router-dom'
import { storageConstants } from "../../../../constants"

type ISignupDTO = z.infer<typeof userValidationSchema.signup>;

export default function useSingupHook() {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<ISignupDTO>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(userValidationSchema.signup)
  })

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: userService.signUpUser,
    onSuccess: ({ data: { token, ...currentUser } }) => {
      localStorageUtils.setItem(storageConstants.sessionKey, token)
      localStorageUtils.setItem(storageConstants.localUserKey, JSON.stringify(currentUser))
      navigate('/')
    }
  })

  const onSubmit = ({ name, email, password }: { name: string, email: string, password: string }) => {
    signup({ name, email, password })
  }

  return {
    handleSubmit,
    Controller,
    control,
    errors,
    onSubmit,
    isLoading
  }
}