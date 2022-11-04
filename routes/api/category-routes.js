const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    let categoryData = await Category.findAll({
      include: [{ model: Product }]
    });

    if(!categoryData) {
      res.status(404).json({ message: "That data was not found" });
      return;
    }

    res.status(200).json(categoryData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if(!categoryData) {
      res.status(404).json({ message: "That data was not found" });
      return;
    }
    
    res.status(200).json(categoryData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

router.post('/', async (req, res) => {
  try {
    let categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

router.put('/:id', async (req, res) => {
  try {
    let categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if(!categoryData) {
      res.status(404).json({ message: "That category was not found" });
      return;
    }

    res.status(200).json(categoryData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!categoryData) {
      res.status(404).json({ message: "That category was not found" });
      return;
    }

    res.status(200).json(categoryData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

module.exports = router;
