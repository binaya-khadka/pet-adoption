import { Nav } from "../../../components"
import { useForm, Controller } from 'react-hook-form'
import { userValidationSchema } from "../../../../validationSchemas"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type ILoginDTO = z.infer<typeof userValidationSchema.login>;

export const Login = () => {

  const { control, handleSubmit, formState: { errors } } = useForm<ILoginDTO>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(userValidationSchema.login)
  })

  const onSubmit = ({ email, password }: { email: string, password: string }) => {
    console.log({ email, password })
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
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  )
}