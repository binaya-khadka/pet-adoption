import Layout from '../Layout/Layout'
import { useForm, Controller } from 'react-hook-form'
import { Pet, User } from '../../../interfaces'
import { localStorageUtils } from '../../utils'
import { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { petService } from '../../services'
import { FormContainer, Form } from '../../components/styled-component'
import { getCurrentUser } from '../../store'
import { storageConstants } from '../../../constants'

export const AddPet = () => {

  const [image, setImage] = useState<File | FileList | null>(null);

  const { control, handleSubmit } = useForm<Pet>()

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [fetchedUser, setFetchedUser] = useState<boolean>(false);

  interface PetAPIErrorResponse {
    message: string;
  }

  useEffect(() => {
    const fetchingUser = getCurrentUser();
    if (fetchingUser) {
      setCurrentUser(fetchingUser?.user);
    }
    setFetchedUser(true);
  }, [])

  const onSubmit = ({
    name,
    age,
    breed,
  }: {
    name: string,
    age: string,
    breed: string,
  }) => {
    const user = localStorageUtils.getItem(storageConstants.localUserKey);
    const userObj = JSON.parse(user);
    const userId = userObj?.user?.id;
    const onAdoptionByUser = userId;
    addPet({ name, age, breed, onAdoptionByUser, image: image })
  }

  const { mutate: addPet, isLoading } = useMutation({
    mutationFn: petService.addPet,
    onSuccess: () => {
      alert("Added")
    },
    onError: (err: PetAPIErrorResponse) => {
      alert(err?.message)
    }
  })

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  return (
    <Layout>
      <div>
        {fetchedUser && currentUser?.id ? (<>
          <FormContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              <div>
                <div>Name</div>
                <Controller
                  name='name'
                  control={control}
                  defaultValue=''
                  render={({ field }) => <input {...field} />}
                />
              </div>

              <div>
                <div>Breed</div>
                <Controller
                  name='breed'
                  control={control}
                  defaultValue=''
                  render={({ field }) => <input {...field} />}
                />
              </div>

              <div>
                <div>Age</div>
                <Controller
                  name='age'
                  control={control}
                  defaultValue=''
                  render={({ field }) => <input {...field} />}
                />
              </div>

              <div>
                <div>Image:</div>
                <input onChange={handleInputImage} type="file" />
              </div>

              <input type={isLoading ? "button" : "submit"} value={isLoading ? "Adding" : "Add Pet"} />

            </Form>
          </FormContainer>
        </>) : (
          <>
            <div style={{ maxWidth: 1200, margin: '0 auto', paddingTop: '50px' }}>
              <div style={{ maxWidth: 1000, margin: 'auto auto 50px', lineHeight: '2.55rem', padding: '0 20px', textAlign: 'center' }}>
                <h1 style={{ background: 'linear-gradient(20deg, orange, blue)', color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
                  Sorry you cannot add any pet when you are logged out. Please Login or Register to add pets.
                </h1>
              </div>
              <div className="hero-content">
                <div className="hero-subtitle" style={{ padding: '0 12px' }}>
                  <div style={{ margin: 'auto auto 20px' }}>
                    You can go to login page by clicking the Login Button
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <a href="/login" style={{ textDecoration: 'none', padding: '10px 45px', color: '#fff', fontWeight: '600', fontSize: '1.255rem', borderRadius: '999px', background: 'linear-gradient(60deg, red, blue)' }}>Login</a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}