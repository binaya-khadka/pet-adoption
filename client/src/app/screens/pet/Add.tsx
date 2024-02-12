import Layout from '../Layout/Layout'
import { useForm, Controller } from 'react-hook-form'
import { Pet, User } from '../../../interfaces'
import { localStorageUtils } from '../../utils'

import { useState } from 'react'
import { useMutation } from 'react-query'
import { petService } from '../../services'
import { FormContainer, Form } from '../../components/styled-component'

export const AddPet = () => {

  const [image, setImage] = useState<File | FileList | null>(null);
  const { control, handleSubmit } = useForm<Pet>()

  const onSubmit = ({
    name,
    age,
    breed,
  }: {
    name: string,
    age: string,
    breed: string,
  }) => {
    const user = localStorageUtils.getItem('user') as { user: User };
    const onAdoptionByUser = user?.user?.id;
    addPet({ name, age, breed, onAdoptionByUser, image: image })
  }

  const { mutate: addPet, isLoading } = useMutation({
    mutationFn: petService.addPet,
    onSuccess: () => {
      alert("Added")
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
        <div>
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

              {/* </form> */}
            </Form>
          </FormContainer>
        </div>
      </div>
    </Layout>
  )
}