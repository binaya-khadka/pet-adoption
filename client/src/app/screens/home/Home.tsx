import styled from 'styled-components';

import useHome from './useHome';
import Layout from '@/app/screens/Layout/Layout';

export default function Home() {
  const { data, isLoading, isError, Link, styles } = useHome();
  return (
    <Layout>
      <Section>
        <SectionInner>
          <div>
            <H1>PETS</H1>
            {isLoading ? (
              <>
                <div>Loading...</div>
              </>
            ) : isError ? (
              <>
                <div>Some error occurred</div>
              </>
            ) : (
              <>
                <PetContainer>
                  {data &&
                    data?.data?.map((pet) => (
                      <Pet key={pet._id}>
                        <div>
                          <Link
                            to={`/pet/${pet?._id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            <div style={styles.imageContainer}>
                              <img
                                style={{
                                  ...styles.img
                                }}
                                src={`http://localhost:3000/uploads/${pet.image}`}
                                alt={pet.name}
                              />
                            </div>
                            <div style={styles.petName}>{pet.name}</div>
                            <div style={styles.petAge}>Age - {pet.age}</div>
                            <div style={styles.petBreed}>{pet.breed}</div>
                          </Link>
                        </div>
                      </Pet>
                    ))}
                </PetContainer>
              </>
            )}
          </div>
        </SectionInner>
      </Section>
    </Layout>
  );
}

const H1 = styled.h1`
  color: orangered;
  font-size: 2rem;
`;

const PetContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Pet = styled.div`
  flex: 1;
  padding: 10px 12px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 400px;
`;

const Section = styled.div`
  font-family: 'Inter', sans-serif;
`;

const SectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 15px;
`;
