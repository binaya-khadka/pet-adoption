import { petRepository } from '.';
import { apiMethodUtils } from '../utils';
import { Request, Response } from 'express';

const addPetHandler = async (req: Request, res: Response) => {
  try {
    const {
      name,
      age,
      breed,
      onAdoptionByUser
    }: { name: string; age: string; breed: string; onAdoptionByUser: any } =
      req.body;
    const image = req?.file?.filename;

    if (!image)
      return apiMethodUtils.apiFail({
        req,
        res,
        message: 'Image is required',
        error: { message: 'Image is required' }
      });

    const payload = {
      name,
      age,
      breed,
      onAdoptionByUser,
      image: image
    };
    const pet = await petRepository.addPet(payload);
    return apiMethodUtils.apiSuccess({
      req,
      res,
      data: pet,
      message: 'Added New Pet'
    });
  } catch (err) {
    console.log(err);
    return apiMethodUtils.apiFail({
      req,
      res,
      error: err,
      message: 'Something went wrong'
    });
  }
};

const fetchPets = async (req: Request, res: Response) => {
  try {
    const pets = await petRepository.fetchAllPets();
    return apiMethodUtils.apiSuccess({
      req,
      res,
      data: pets,
      message: 'Successfully fetched pets'
    });
  } catch (err) {
    return apiMethodUtils.apiFail({
      req,
      res,
      error: err,
      message: 'Something went wrong'
    });
  }
};

async function deletePetHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const pet = await petRepository.getPet(id);
    if (!pet) {
      apiMethodUtils.apiFail({
        req,
        res,
        message: 'No Pet Found',
        error: { message: 'Not Pet Found' }
      });
    }

    const deletePet = await petRepository.deletePet(id);
    return apiMethodUtils.apiSuccess({
      req,
      res,
      data: deletePet,
      message: 'Successfully deleted pet'
    });
  } catch (err) {
    console.log(err);
    return apiMethodUtils.apiFail({
      req,
      res,
      error: err,
      message: 'Something went wrong'
    });
  }
}

async function updatePetHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, age, breed } = req.body;
    const payload = { id, name, age, breed };

    const pet = await petRepository.updatePet(payload);

    return apiMethodUtils.apiSuccess({
      req,
      res,
      data: pet,
      message: 'Successfully updated pet'
    });
  } catch (err) {
    console.log(err);
    return apiMethodUtils.apiFail({
      req,
      res,
      error: err,
      message: 'Something went wrong'
    });
  }
}

async function adoptPetHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { adoptedByUser } = req.body;

    const payload = { _id: id, adoptedByUser };

    const pet = await petRepository.getPet(id);

    if (!pet) {
      throw {
        message: 'Pet not found',
        error: {
          message: 'Pet not found'
        }
      };
    }

    const adoptPet = await petRepository.petAdoption(payload);

    return apiMethodUtils.apiSuccess({
      req,
      res,
      data: adoptPet,
      message: 'Adopted Pet'
    });
  } catch (err) {
    console.log(err);
    return apiMethodUtils.apiFail({
      req,
      res,
      error: err,
      message: 'Something went wrong'
    });
  }
}

async function fetchSinglePet(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const pet = await petRepository.getPet(id);
    return apiMethodUtils.apiSuccess({
      req,
      res,
      data: pet,
      message: 'Successfully fetched pet'
    });
  } catch (err) {
    console.log(err);
    return apiMethodUtils.apiFail({
      req,
      res,
      error: err,
      message: 'Something went wrong'
    });
  }
}

export {
  addPetHandler,
  fetchPets,
  deletePetHandler,
  updatePetHandler,
  adoptPetHandler,
  fetchSinglePet
};
