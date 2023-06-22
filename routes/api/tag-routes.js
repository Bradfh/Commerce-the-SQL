const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');



router.get('/', async(req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [ { model: Product, as: 'products' , through:{ model: ProductTag,attributes: [] } } ],
    });
    res.json(tags);
  } catch (error) {
    console.error(err);
    res.status(500).send('An error occurred while trying to get the tags');
  } 
});

router.get('/:id', async(req, res) => {
 try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [ { model: Product, as: 'products' , through:{ model: ProductTag,attributes: [] } } ],
    });
    res.json(tag);
  } catch (error) {
    console.error(err);
    res.status(500).send('An error occurred while trying to get the tag');
  }
});

router.post('/', async(req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.json(newTag);
  } catch (error) {
    console.error(err);
    res.status(500).send('An error occurred while trying to create the tag');
  }
});

router.put('/:id', async(req, res) => {
  try {
    const updatedTag = await Tag.create(req.body, {
    where: { tag_id: req.params.id },
  });
  res.json(updatedTag);
  } catch (error) {
    console.error(err);
    res.status(500).send('An error occurred while trying to create the tag');
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const deletedTag = await Tag.destroy({
    where: { tag_id: req.params.id },
  });
  res.json(deletedTag);
  } catch (error) {
    console.error(err);
    res.status(500).send('An error occurred while trying to delete the tag');
  }
});

module.exports = router;
