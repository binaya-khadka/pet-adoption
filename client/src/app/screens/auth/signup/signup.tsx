import * as z from 'zod'
import { Nav } from "../../../components"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userValidationSchema } from '../../../../validationSchemas'

type ISignupDTO = z.infer<typeof userValidationSchema.signup>;

export const Signup = () => {

  const { control, handleSubmit, formState: { errors } } = useForm<ISignupDTO>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(userValidationSchema.signup)
  })

  const onSubmit = ({ name, email, password }: { name: string, email: string, password: string }) => {
    console.log({
      name,
      email,
      password
    })
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
            <div style={{color: 'tomato'}}>{errors?.name?.message}</div>
          </div>
          <div>
            <div>Email</div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <input {...field} />}
            />
            <div style={{color: 'tomato'}}>{errors?.email?.message}</div>
          </div>
          <div>
            <div>Password</div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <input type="password" {...field} />}
            />
            <div style={{color: 'tomato'}}>{errors?.password?.message}</div>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  )
}