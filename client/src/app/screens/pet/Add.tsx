import { useForm, Controller } from 'react-hook-form'
import { Pet, User } from '../../../interfaces'
import { localStorageUtils } from '../../utils'

import { useMutation } from 'react-query'
import { petService } from '../../services'

import Layout from '../Layout/Layout'

export const AddPet = () => {

  const { control, handleSubmit } = useForm<Pet>()

  const onSubmit = ({
    name,
    age,
    breed,
    images
  }: {
    name: string,
    age: string,
    breed: string,
    images: string
  }) => {
    const user = localStorageUtils.getItem('user') as { user: User };
    const onAdoptionByUser = user?.user?.id;
    console.log({ name, age, breed, onAdoptionByUser, images })
    addPet({ name, age, breed, onAdoptionByUser, images })
  }


  const { mutate: addPet, isLoading } = useMutation({
    mutationFn: petService.addPet,
    onSuccess: () => {
      alert("Added")
    }
  })


  return (
    <Layout>
      <div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <Controller
                name='images'
                control={control}
                render={({ field }) => <input {...field} type='file' />}
              />

            </div>

            <input type={isLoading ? "button" : "submit"} value={isLoading ? "Adding" : "Add Pet"} />

          </form>
        </div>
      </div>
    </Layout>
  )
}