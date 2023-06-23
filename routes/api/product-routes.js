const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


router.get('/', async(req, res) => {
  try {
    const products = await Product.findAll({
      include: [ { model: Category }, { model: Tag, as: 'tags' , through:{ model: ProductTag,attributes: [] } } ],
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while trying to get the products');
  }
});


router.get('/:id', async(req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [ { model: Category }, { model: Tag, as: 'tags' , through:{ model: ProductTag,attributes: [] } } ],
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while trying to get the product');
  }
});


router.post('/', (req, res) => {

  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(error);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      product_id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((error) => {
      // console.log(err);
      res.status(400).json(error);
    });
});

router.delete('/:id', async(req, res) => {
  try {
    const deletedProduct = await Product.destroy({
    where: { product_id: req.params.id },
  });
  if (!deletedProduct) {
    res.status(404).json({ message: 'No product found with this id!' });
  }
  res.json({message: "Product deleted successfully:", deletedProduct});
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while trying to delete the product');
  }
});

module.exports = router;
