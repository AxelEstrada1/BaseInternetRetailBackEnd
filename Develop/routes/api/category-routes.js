const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const creatingCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(creatingCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
    const categoryUpdated = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.json(categoryUpdated);
  } catch (err) {
    res.json(err);
  }
});

router.delete('/:id', (req, res) => {
  try {const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!categoryData) {
    res.status(404).json({ message: 'No category name was found with that id!' });
    return;
  }

  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
