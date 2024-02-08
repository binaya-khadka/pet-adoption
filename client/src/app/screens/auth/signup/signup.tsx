import { z } from 'zod'
import { Nav } from "../../../components"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userValidationSchema } from '../../../../validationSchemas'
import { useMutation } from 'react-query'
import { userService } from '../../../services'
import { localStorageUtils } from '../../../utils'
import { useNavigate } from 'react-router-dom'

type ISignupDTO = z.infer<typeof userValidationSchema.signup>;

export const Signup = () => {

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
      console.log(token, currentUser);
      localStorageUtils.setItem('token', token)
      localStorageUtils.setItem('user', currentUser)
      navigate('/')
    }
  })

  const onSubmit = ({ name, email, password }: { name: string, email: string, password: string }) => {
    signup({ name, email, password })
  }

  return (
    <>
      <Nav />
      <div style={{ maxWidth: 1200, margin: 'auto' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>Name</div>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} />}
            />
            <div style={{ color: 'tomato' }}>{errors?.name?.message}</div>
          </div>
          <div>
            <div>Email</div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <input {...field} />}
            />
            <div style={{ color: 'tomato' }}>{errors?.email?.message}</div>
          </div>
          <div>
            <div>Password</div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <input type="password" {...field} />}
            />
            <div style={{ color: 'tomato' }}>{errors?.password?.message}</div>
          </div>
          <div>
            <input type={isLoading ? "button" : "submit"} value={isLoading ? "Submitting" : "Submit"} />
          </div>
        </form>
      </div>
    </>
  )
}