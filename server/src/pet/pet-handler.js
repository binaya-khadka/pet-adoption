import { apiMethodUtils } from "../utils/index.js"
import { upload } from '../utils/index.js';
import * as petRepository from './pet-repository.js'


const addPetHandler = async (req, res) => {

  try {
    if (req?.file !== undefined) {
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

        const pet = await petRepository.addPet(payload);
        return apiMethodUtils.apiSuccess({ req, res, data: pet, message: 'Added New Pet' });
      });
    }

    const { name, age, breed, onAdoptionByUser } = req.body;
    const payload = { name, age, breed, onAdoptionByUser };

    const pet = await petRepository.addPet(payload);
    return apiMethodUtils.apiSuccess({ req, res, data: pet, message: 'Added New Pet' });
  } catch (err) {
    console.log(err);
    return apiMethodUtils.apiFail({ req, res, error: err, message: "Something went wrong" })
  }
}

const fetchPets = async (req, res) => {
  try {
    const pets = await petRepository.fetchAllPets();
    return apiMethodUtils.apiSuccess({ req, res, data: pets, message: 'Successfully fetched pets' })
  } catch (err) {
    return apiMethodUtils.apiFail({ req, res, error: err, message: 'Something went wrong' })
  }
}

async function deletePetHandler(req, res) {
  try {
    const { id } = req.params;

    const pet = await petRepository.getPet(id);
    if (!pet) {
      apiMethodUtils.apiFail({ req, res, message: 'No Pet Found', error: { message: 'Not Pet Found' } })
    }

    const deletePet = await petRepository.deletePet(id);
    return apiMethodUtils.apiSuccess({ req, res, data: deletePet, message: 'Successfully deleted pet' })
  } catch (err) {
    console.log(err)
    return apiMethodUtils.apiFail({ req, res, error: err, message: 'Something went wrong' })
  }
}

async function updatePetHandler(req, res) {
  try {
    const { id } = req.params;
    const { name, age, breed } = req.body;
    const payload = { id, name, age, breed };

    const pet = await petRepository.updatePet(payload);

    return apiMethodUtils.apiSuccess({ req, res, data: pet, message: 'Successfully updated pet' })
  } catch (err) {
    console.log(err)
    return apiMethodUtils.apiFail({ req, res, error: err, message: 'Something went wrong' })
  }
}

async function adoptPetHandler(req, res) {
  try {

    const { id } = req.params;
    const { adoptedByUser } = req.body;

    const payload = { id, adoptedByUser };

    const pet = await petRepository.getPet(id);

    if (pet.isAdopted) {
      return apiMethodUtils.apiFail({ req, res, message: 'Sorry pet has already been adopted' })
    }

    const adoptpet = await petRepository.petAdoption(payload);

    return apiMethodUtils.apiSuccess({ req, res, data: adoptpet, message: 'Adopted Pet' })
  } catch (err) {
    console.log(err)
    return apiMethodUtils.apiFail({ req, res, error: err, message: 'Something went wrong' })
  }
}

async function fetchSinglePet() {
  try {
    const { id } = req.params;
    const pet = await petRepository.getPet(id);
    return apiMethodUtils.apiSuccess({ req, res, data: pet, message: 'Successfully fetched pet' })
  } catch (err) {
    console.log(err)
    return apiMethodUtils.apiFail({ req, res, error: err, message: 'Something went wrong' })
  }
}

export {
  addPetHandler,
  fetchPets,
  deletePetHandler,
  updatePetHandler,
  adoptPetHandler,
  fetchSinglePet
}