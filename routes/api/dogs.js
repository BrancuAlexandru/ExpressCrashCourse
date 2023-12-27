const express = require('express');
const router = express.Router();
let dogs = require('../../Dogs')
const uuid = require('uuid');
const logger = require('../../middleware/logger');
const validator = require('../../middleware/validator');

router.get('/', (req, res) => {
  res.json(dogs);
});

router.get('/:id', (req, res) => {
  const dogExists = dogs.filter(dog => dog.id === parseInt(req.params.id)).length >= 1 ? true : false;

  if (dogExists) {
    res.json(dogs.filter(dog => dog.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({error: `No dog exists by ID ${req.params.id}`});
  }
});

router.post('/', [logger, validator], (req, res) => {
  const newDog = {
    id: uuid.v4(),
    name: req.body.name,
    color: req.body.color,
    species: req.body.species,
    age: req.body.age,
  }

  dogs.push(newDog);
  res.json(dogs);
});

router.put('/:id', (req, res) => {
  const dogExists = dogs.filter(dog => dog.id === parseInt(req.params.id)).length >= 1 ? true : false;

  if (dogExists) {
    const updatedDog = req.body;

    dogs.forEach(dog => {
      if (dog.id === parseInt(req.params.id)) {
        dog.name = updatedDog.name || dog.name;
        dog.color = updatedDog.color || dog.color;
        dog.species = updatedDog.species || dog.species;
        dog.age = updatedDog.age || dog.age;

        res.json({message: "Dog updated successfully.", dog: dog});
      }
    });
  } else {
    res.status(404).json({error: `No dog exists by ID ${req.params.id}`});
  }
});

router.delete('/:id', (req, res) => {
  const dogExists = dogs.filter(dog => dog.id === parseInt(req.params.id)).length >= 1 ? true : false;

  if (dogExists) {
    dogs = dogs.filter(dog => dog.id !== parseInt(req.params.id));
    res.json({message: "Dog deleted successfully.", dogs: dogs});
  } else {
    res.status(404).json({error: `No dog exists by ID ${req.params.id}`});
  }
});

module.exports = router;