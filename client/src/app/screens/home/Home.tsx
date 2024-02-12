import Layout from "../Layout/Layout";
import * as styles from './home.styles'
import { useQuery } from 'react-query'
import { petService } from '../../services'
import styled from 'styled-components'

export default function Home() {
  
  const { data, isLoading, isError } = useQuery('home', petService.getAllPets);

  return (
    <Layout>
      <div style={{ ...styles.container }}>
        <div>
          <H1>
            PETS
          </H1>
          {isLoading ? <>
            <div>
              Loading...
            </div>
          </> : (
            isError ? <>
              <div>
                Some error occurred
              </div>
            </> : <>
              <PetContainer>
                {data?.data?.map(pet => (
                  <Pet key={pet.id}>
                    <div style={{height: 200, width: 200}}>
                      <img style={{
                        height: 200,
                        width: '100%'
                      }} src={`http://localhost:3000/uploads/${pet.image}`} alt={pet.name} />
                    </div>
                    <div>
                      {pet.name}
                    </div>
                    <div>
                      {pet.age}
                    </div>
                    <div>
                      {pet.breed}
                    </div>
                  </Pet>
                ))}
              </PetContainer>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

const H1 = styled.h1`
  color: orangered;
  font-size: 2rem;
`

const PetContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`

const Pet = styled.div`
  flex: 1;
  padding: 10px 12px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  // margin-bottom: 10px;
  border-radius: 5px;
`