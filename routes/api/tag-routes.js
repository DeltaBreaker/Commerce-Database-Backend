const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Returns a list of all tags
router.get('/', async (req, res) => {
  try {
    // Query the database for all tags
    let tagData = await Tag.findAll({
      include: [{ model: Product }]
    });

    // Return 404 if no data is found
    if(!tagData) {
      res.status(404).json({ message: "That data was not found" });
      return;
    }

    // Return the queried data
    res.status(200).json(tagData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

// Returns a specific tag
router.get('/:id', async (req, res) => {
  try {
    // Query the database for a tag based on the given id
    let tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    // Return 404 if no data is found
    if(!tagData) {
      res.status(404).json({ message: "That tag was not found" });
      return;
    }

    // Return the queried data
    res.status(200).json(tagData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

// Creates a new tag
router.post('/', async (req, res) => {
  try {
    // Send a create query to the database and return the response
    let tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

// Updates an existing tag
router.put('/:id', async (req, res) => {
  try {
    // Send an update query to the database restrained to the given id
    let tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    // Return 404 if no data is found
    if(!tagData) {
      res.status(404).json({ message: "That tag was not found" });
      return;
    }

    // Return the accepted reponse
    res.status(200).json(tagData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

// Deleted a tag
router.delete('/:id', async (req, res) => {
  try {
    // Send a delete request restrained to a given id
    let tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    // Return 404 if no data is found
    if(!tagData) {
      res.status(404).json({ message: "That tag was not found" });
      return;
    }

    // Return the accepted reponse
    res.status(200).json(tagData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

module.exports = router;
