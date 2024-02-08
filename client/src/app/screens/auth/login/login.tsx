import { Nav } from "../../../components"
import { useForm, Controller } from 'react-hook-form'
import { userValidationSchema } from "../../../../validationSchemas"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "react-query"
import { userService } from "../../../services"
import { localStorageUtils } from "../../../utils"
import { useNavigate } from "react-router-dom"

type ILoginDTO = z.infer<typeof userValidationSchema.login>;

export const Login = () => {

  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<ILoginDTO>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(userValidationSchema.login)
  })

  const { mutate: login, isLoading } = useMutation({
    mutationFn: userService.loginUser,
    onSuccess: ({ data: { token, ...currentUser } }) => {
      localStorageUtils.setItem('token', token)
      localStorageUtils.setItem('user', currentUser)
      navigate('/')
    }

  })

  const onSubmit = ({ email, password }: { email: string, password: string }) => {
    login({ email, password })
  }

  return (
    <>
      <Nav />
      <div style={{ maxWidth: 1200, margin: 'auto' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <input type={isLoading ? "button" : "submit"} value={isLoading ? "Logging In" : "Login"} />
          </div>
        </form>
      </div>
    </>
  )
}