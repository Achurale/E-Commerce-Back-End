const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const products = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryID = req.params.id;
    const category = await Category.findByPk(categoryID, {
      include: [{model: Product}],
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found!'});
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  /* req.body should look like this...
    {
      "category_name": "Category A"
    }
  */
  try {
    const newCategory = await Category.create( req.body );
    res.status(201).json(newCategory)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryID = req.params.id;
    const updatedCategory = await Category.update(req.body, {
      where: {id: categoryID},
    });
    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'Category not found'});
      return;
    }
    res.status(200).json({ message: 'Category has been updated'})
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryID = req.params.id;
    const deletedCategory = await Category.destroy({
      where: {id:categoryID}
    });
    if (!deletedCategory) {
      res.status(400).json({message:'Category not found'});
      return;
    }
    res.status(200).json({ message: 'Category has been deleted'})
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
