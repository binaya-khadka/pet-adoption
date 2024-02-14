import Layout from "../../Layout/Layout";
import styles from './home.module.css'
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { petService } from "../../../services";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../../store";
import type { User } from "../../../../interfaces";

export default function Pet() {

  const { id } = useParams<{ id: string }>();

  const [currentUser, setCurrentUser] = useState<User>();

  const { data, isLoading } = useQuery({
    queryKey: ['pet', id],
    queryFn: petService.fetchPet
  })

  const { mutate: adoptPet, isLoading: isAdopting } = useMutation(petService.adoptPet, {
    onSuccess: () => {
      alert("Adopted")
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Error")
    }
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    setCurrentUser(currentUser?.user)
  }, []);


  const adoptFn = () => {
    if (currentUser && currentUser?.id) {
      adoptPet({ _id: id, userId: currentUser?.id })
    }
  }

  return (
    <Layout>
      <div style={{}}>
        <div style={{ maxWidth: 1200, margin: '0 auto', overflow: 'hidden' }} className="hero">
          <h1 className={styles.heroTitle}>Details</h1>
          {
            isLoading ? <>
              <div>
                Loading...
              </div>
            </> : (
              <div className={styles.section}>
                <div className={styles.sectionInner}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{data?.data?.name}</h2>
                    <p className={styles.sectionDescription}>
                      {data?.data?.isAdopted ? 'The Pet has adopted' : 'The pet is available for adoption'}
                    </p>
                  </div>
                  <div className={styles.sectionContent}>
                    <div className={styles.imageContainer}>
                      <img src={`http://localhost:3000/uploads/${data?.data?.image}`} alt="" className={styles.img} />
                    </div>
                    <p>
                      Name - {data?.data?.name}
                    </p>
                    <p>
                      Age - {data?.data?.age}
                    </p>
                    <p>
                      Breed - {data?.data?.breed}
                    </p>
                    <div>
                      On Adoption By - {data?.data?.onAdoptionByUser?.name}
                    </div>
                    <div>
                      EMAIL - {data?.data?.onAdoptionByUser?.email}
                    </div>

                    {data?.data?.isAdopted ?
                      <>
                        <div>The Pet has been adopted by <b> {data?.data?.adoptedByUser?.name} </b> and his email is <b>{data?.data?.adoptedByUser?.email} </b></div>
                        {/* <div>{data?.data?.adoptedByUser?.name}</div> */}
                      </>
                      :
                      <>
                        <button onClick={adoptFn} style={{ padding: '10px 20px', outline: 'none', border: 'none', background: '#dadada', borderRadius: '5px', cursor: 'pointer' }}>
                          {isAdopting ? "Adopting" : "Adopt"}
                        </button>
                      </>}
                  </div>
                </div>
              </div>
            )
          }

        </div>
      </div>
    </Layout>
  )
}