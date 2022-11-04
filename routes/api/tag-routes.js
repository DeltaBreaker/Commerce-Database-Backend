const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    let tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    if(tagData) {
      res.status(200).json(tagData);
    } else {
      res.status(404).json({ message: "That data was not found" });
    }
  } catch(exception) {
    res.status(500).json(exception);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if(!tagData) {
      res.status(404).json({ message: "That tag was not found" });
      return;
    }

    res.status(200).json(tagData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

router.post('/', async (req, res) => {
  try {
    let tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

router.put('/:id', async (req, res) => {
  try {
    let tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if(!tagData) {
      res.status(404).json({ message: "That tag was not found" });
      return;
    }

    res.status(200).json(tagData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!tagData) {
      res.status(404).json({ message: "That tag was not found" });
      return;
    }

    res.status(200).json(tagData);
  } catch(exception) {
    res.status(500).json(exception);
  }
});

module.exports = router;
