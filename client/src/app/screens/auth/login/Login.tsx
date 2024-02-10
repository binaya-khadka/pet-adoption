import Layout from "../../Layout/Layout"
import { useForm, Controller } from 'react-hook-form'
import { userValidationSchema } from "../../../../validationSchemas"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "react-query"
import { userService } from "../../../services"
import { localStorageUtils } from "../../../utils"
import { useNavigate } from "react-router-dom"
import "./login.css"

type ILoginDTO = z.infer<typeof userValidationSchema.login>;

export default function Login() {
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
    <Layout>
      <div style={{ maxWidth: 1200, margin: 'auto' }}>
        <div className="formContainer">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
              <input className="button" type={isLoading ? "button" : "submit"} value={isLoading ? "Logging In" : "Login"} />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}