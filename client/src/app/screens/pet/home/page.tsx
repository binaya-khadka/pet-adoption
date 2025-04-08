import Layout from '../../Layout/Layout';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { petService } from '../../../services';
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../../store';
import type { User } from '../../../../interfaces';
import styled from 'styled-components';

export default function Pet() {
  const { id } = useParams<{ id: string }>();

  const [currentUser, setCurrentUser] = useState<User>();

  const { data, isLoading } = useQuery({
    queryKey: ['pet', id],
    queryFn: petService.fetchPet
  });

  const { mutate: adoptPet, isLoading: isAdopting } = useMutation(
    petService.adoptPet,
    {
      onSuccess: () => {
        alert('Adopted');
      },
      onError: (err: any) => {
        alert(err?.response?.data?.message || 'Error');
      }
    }
  );

  useEffect(() => {
    const currentUser = getCurrentUser();
    setCurrentUser(currentUser?.user);
  }, []);

  const adoptFn = () => {
    if (currentUser && currentUser?.id) {
      adoptPet({ _id: id, userId: currentUser?.id });
    }
  };

  return (
    <Layout>
      <Section>
        <SectionInner>
          <HeroTitle>Details</HeroTitle>
          {isLoading ? (
            <>
              <LoadingScreen>Loading...</LoadingScreen>
            </>
          ) : (
            <>
              <PetTitle>{data?.data?.name}</PetTitle>
              <AdoptedPetDescription>
                {data?.data?.isAdopted
                  ? 'The Pet has been adopted'
                  : 'The pet is available for adoption'}
              </AdoptedPetDescription>
              <ImageContainer>
                <Image
                  src={`http://localhost:3000/uploads/${data?.data?.image}`}
                  alt={data?.data?.name}
                ></Image>
              </ImageContainer>
              <PetDescription>
                <PetDetails>
                  <Span>Name</Span> : {data?.data?.name}
                </PetDetails>
                <PetDetails>
                  <Span>Age</Span> : {data?.data?.age}
                </PetDetails>
                <PetDetails>
                  <Span>Breed</Span> : {data?.data?.breed}
                </PetDetails>
                <PetDetails>
                  <Span>On Adoption By</Span> :{' '}
                  {data?.data?.onAdoptionByUser?.name}
                </PetDetails>

                <PetDetails>
                  <Span>Email</Span> : {data?.data?.onAdoptionByUser?.email}
                </PetDetails>
              </PetDescription>

              {data?.data?.isAdopted ? (
                <>
                  <AdoptedPetDescription>
                    Sorry Not Aavailable for adoption. The Pet has been already
                    adopted by <b> {data?.data?.adoptedByUser?.name} </b> and
                    his email is <b>{data?.data?.adoptedByUser?.email} </b>
                  </AdoptedPetDescription>
                </>
              ) : (
                <>
                  {currentUser && currentUser?.id ? (
                    <>
                      <Button onClick={adoptFn}>
                        {isAdopting ? 'Adopting' : 'Adopt'}
                      </Button>
                    </>
                  ) : (
                    <>
                      <AdoptedPetDescription>
                        You've to login first to adopt the pet
                      </AdoptedPetDescription>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </SectionInner>
      </Section>
    </Layout>
  );
}

const Section = styled.div`
  margin-bottom: 100px;
  font-family: 'Inter';
`;

const SectionInner = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  padding: 0 15px;
`;

const HeroTitle = styled.h1`
  background-image: linear-gradient(60deg, rgb(255, 108, 108), #ffb03a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const LoadingScreen = styled.div`
  height: 80vh;
  display: grid;
  place-items: center;
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
  font-size: 2rem;
  font-weight: 500;
`;

const PetTitle = styled.h1`
  font-size: 1.225rem;
  font-weight: 600;
`;

const AdoptedPetDescription = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 10px;
  color: #6b6b6b;
  line-height: 1.6rem;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  justify-content: center;
  align-items: center;
  justify-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 500px;
  border-radius: 5px;
  margin-top: 20px;
`;

const PetDescription = styled.div`
  font-weight: 500;
  margin-top: 10px;
  color: #6b6b6b;
  margin-bottom: 20px;
`;

const PetDetails = styled.div`
  // align-items: center;
  // font-weight: 500;
  // margin-top: 10px;
  // color: #6b6b6b;
  // margin-bottom: 20px;
  // display: flex;
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
  gap: 4px;
`;

const Span = styled.p`
  color: tomato;
  font-weight: 600;
`;

const Button = styled.button`
  padding: 12px 28px;
  outline: none;
  border: none;
  background: #dadada;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  // margin-top: 20px;
  font-size: 1rem;
  font-weight: 500;
  color: #6b6b6b;
  transition: all 0.3s ease;
  &:hover {
    background: #ffb03a;
    color: white;
  }
`;
