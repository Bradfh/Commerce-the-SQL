const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product,
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while trying to get the categories');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product,
    });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while trying to get the category');
  }
});

router.put('/', async(req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while trying to create the category');
  }
});

router.post('/:id', async(req, res) => {
  try {
    const updatedCategory = await Category.create(req.body, {
    where: { category_id: req.params.id },
  });
  res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while trying to create the category');
  }  
});

;

router.delete('/:id', async(req, res) => {
  try {
    const deletedCategory = await Category.destroy({
    where: { category_id: req.params.id },
  });
  res.json(deletedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while trying to delete the category');
  }
});

module.exports = router;
