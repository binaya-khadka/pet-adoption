import { apiMethodUtils } from "../utils/index.js"
import * as petService from './pet-service.js'
import { upload } from '../utils/index.js';

const addPetHandler = async (req, res) => {

  try {
    upload.array("images", 5)(req, res, async function (err) {
      if (err) {
        return apiMethodUtils.apiFail({ req, res, error: err, message: 'Something went wrong' });
      }

      // No errors occurred during upload.
      const { name, age, breed, onAdoptionByUser } = req.body;
      const images = req.files.map(file => file.filename);
      const payload = { name, age, breed, onAdoptionByUser, images };

      if (req.files.length > 5) {
        return apiMethodUtils.apiFail({ req, res, message: 'Sorry the upload limit is 5' });
      }

      const pet = await petService.addPet(payload);
      return apiMethodUtils.apiSuccess({ req, res, data: pet, message: 'Added New Pet' });
    });
  } catch (err) {
    console.log(err);
    return apiMethodUtils.apiFail({ req, res, error: err, message: "Something went wrong" })
  }


  // const { name, age, breed, onAdoptionByUser } = req.body;

  // console.log(req.files.length)

  // if (req?.files.length > 5) {
  //   apiMethodUtils.apiFail({ req, res, message: 'Sorry the upload limit is 5' })
  // }

  // const images = req.files.map(file => file.filename);

  // const payload = { name, age, breed, onAdoptionByUser, images }

  // try {
  //   const pet = await petService.addPet(payload);
  //   return apiMethodUtils.apiSuccess({ req, res, data: pet, message: 'Added New Pet' })
  // } catch (err) {s
  //   return apiMethodUtils.apiFail({ req, res, error: err, message: 'Something went wrong' })
  // }
}

const fetchPets = async (req, res) => {
  try {
    const pets = await petService.getAllPets();
    return apiMethodUtils.apiSuccess({ req, res, data: pets, message: 'Successfully fetched pets' })
  } catch (err) {
    return apiMethodUtils.apiFail({ req, res, error: err, message: 'Something went wrong' })
  }
}

export {
  addPetHandler,
  fetchPets,
}