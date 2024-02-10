import Layout from "../../Layout/Layout"
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userValidationSchema } from '../../../../validationSchemas'
import { useMutation } from 'react-query'
import { userService } from '../../../services'
import { localStorageUtils } from '../../../utils'
import { useNavigate } from 'react-router-dom'

type ISignupDTO = z.infer<typeof userValidationSchema.signup>;

export default function Signup() {
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
      localStorageUtils.setItem('token', token)
      localStorageUtils.setItem('user', currentUser)
      navigate('/')
    }
  })

  const onSubmit = ({ name, email, password }: { name: string, email: string, password: string }) => {
    signup({ name, email, password })
  }

  return (
    <Layout>
      <div style={{ maxWidth: 1200, margin: 'auto' }}>
        <div className="formContainer">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="labelText">Name</div>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => <input className="textField" {...field} />}
              />
              <div style={{ color: 'tomato' }}>{errors?.name?.message}</div>
            </div>
            <div>
              <div className="labelText">Email</div>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <input className="textField" {...field} />}
              />
              <div style={{ color: 'tomato' }}>{errors?.email?.message}</div>
            </div>
            <div>
              <div className="labelText">Password</div>
              <Controller
                name="password"
                control={control}
                render={({ field }) => <input className="textField" type="password" {...field} />}
              />
              <div style={{ color: 'tomato' }}>{errors?.password?.message}</div>
            </div>
            <div>
              <input className="button" type={isLoading ? "button" : "submit"} value={isLoading ? "Submitting" : "Submit"} />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}