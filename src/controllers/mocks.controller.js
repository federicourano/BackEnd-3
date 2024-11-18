import { generateUsersMock, generatePetsMock } from "../utils/mock.js";
import { petsService, usersService } from "../services/index.js";

export const getPetsMock = (req, res) => {
    const pets = generatePetsMock(50);
    res.send({ status: "succes", payload: pets});
};

export const getUsersMock = (req, res) => {
    const users = generateUsersMock(50); 
    res.send({ status: 'success', payload: users });  
};

export const generateData = async (req, res) => {
    const users = parseInt(req.query.users) || 50;
    const pets = parseInt(req.query.pets) || 50;
    
    try {
      const mockUsers = generateUsersMock(users);
      const mockPets = generatePetsMock(pets);
  
      const insertedUsers = await usersService.insertMany(mockUsers);
      const insertedPets = await petsService.insertMany(mockPets);
  
      res.status(201).json({
      message: "Datos generados e insertados exitosamente",
      status: "success",
      payload: {
          usersInserted: insertedUsers.length,
          petsInserted: insertedPets.length
      }
  });
    } catch (error) {
      res.status(500).json({ error: 'Error al generar los datos.' });
    }
  };