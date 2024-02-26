import Layout from "../../Layout/Layout"
import useSingupHook from "./signup-hook"

export default function Signup() {

  const { handleSubmit, Controller, control, errors, onSubmit, isLoading } = useSingupHook();

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
              {errors?.name &&
                <div style={{ color: 'tomato' }}>{errors?.name?.message}</div>
              }
            </div>
            <div>
              <div className="labelText">Email</div>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <input className="textField" {...field} />}
              />
              {errors?.email &&
                <div style={{ color: 'tomato' }}>{errors?.email?.message}</div>
              }
            </div>
            <div>
              <div className="labelText">Password</div>
              <Controller
                name="password"
                control={control}
                render={({ field }) => <input className="textField" type="password" {...field} />}
              />
              {errors?.password &&
                <div style={{ color: 'tomato' }}>{errors?.password?.message}</div>
              }
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