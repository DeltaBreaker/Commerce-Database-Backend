const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Returns a list of all categories and associated products
router.get('/', async (req, res) => {
  try {
    // Query the database for all categories and products
    let categoryData = await Category.findAll({
      include: [{ model: Product }]
    });

    // Return 404 if no data is found
    if(!categoryData) {
      res.status(404).json({ message: "That data was not found" });
      return;
    }

    // Return the queried data
    res.status(200).json(categoryData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

// Query for one category with associated products
router.get('/:id', async (req, res) => {
  try {
    // Query the database for one category based on id
    let categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    // Return 404 if no data is found
    if(!categoryData) {
      res.status(404).json({ message: "That data was not found" });
      return;
    }
    
    // Return the queried data
    res.status(200).json(categoryData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

// Creates a new category
router.post('/', async (req, res) => {
  try {
    // Send a create query to the database and return the response
    let categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

// Updates a category base on given id
router.put('/:id', async (req, res) => {
  try {
    // Send an update query to the database restrained to the given id
    let categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    // Return 404 if no data is found
    if(!categoryData) {
      res.status(404).json({ message: "That category was not found" });
      return;
    }

    // Return the accepted reponse
    res.status(200).json(categoryData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

// Deletes a category based on id
router.delete('/:id', async (req, res) => {
  try {
    // Send a delete request restrained to a given id
    let categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    // Return 404 if no data is found
    if(!categoryData) {
      res.status(404).json({ message: "That category was not found" });
      return;
    }

    // Return the accepted reponse
    res.status(200).json(categoryData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

module.exports = router;
