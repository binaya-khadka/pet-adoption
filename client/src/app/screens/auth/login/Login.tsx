import './login.css';
import useLoginHook from './useLogin';

import Layout from '@/app/screens/Layout/Layout';

export default function Login() {
  const {
    handleSubmit,
    onSubmit,
    Controller,
    control,
    errors,
    textInput_invalid,
    isLoading
  } = useLoginHook();

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
                render={({ field }) => (
                  <input
                    style={{ ...(errors?.email && textInput_invalid) }}
                    className="textField"
                    {...field}
                  />
                )}
              />
              {errors?.email && (
                <div
                  style={{
                    fontWeight: 700,
                    color: 'tomato',
                    fontSize: '0.75rem',
                    marginTop: 2
                  }}
                >
                  {errors?.email?.message}
                </div>
              )}
            </div>
            <div>
              <div className="labelText">Password</div>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    className="textField"
                    style={{ ...(errors?.password && textInput_invalid) }}
                    type="password"
                    {...field}
                  />
                )}
              />
              <div
                style={{
                  fontWeight: 700,
                  color: 'tomato',
                  fontSize: '0.75rem',
                  marginTop: 2
                }}
              >
                {errors?.password?.message}
              </div>
            </div>
            <div>
              <input
                className="button"
                type={isLoading ? 'button' : 'submit'}
                value={isLoading ? 'Logging In' : 'Login'}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
