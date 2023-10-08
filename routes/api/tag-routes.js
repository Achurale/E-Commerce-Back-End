const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tags = await Tag.findAll({
      include: [Product]
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagID = req.params.id;
    const tag = await Tag.findByPk(tagID,{
      include: [Product]
    });
      if (!tag) {
        res.status(404).json({ message: 'Tag not found'});
        return;
      }
    res.status(200).json(tag)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      "tag_name": "tag a"
    }
  */
 try {
  const newTag = await Tag.create(req.body);
  res.status(201).json(newTag)
 } catch (err) {
  res.status(400).json(err);
 }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagID = req.params.id;
    const updatedTag = await Tag.update(req.body, {
      where: {id: tagID},
    })
    if (updatedTag[0] === 0) {
      res.status(404).json({ message: 'Tag not found'});
      return
    }
    res.status(200).json({message: 'Tag has been updated'})
  } catch(err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagID = req.params.id;
    const deletedTag = await Tag.destroy({
      where: {id:tagID}
    });
    if (!deletedTag) {
      res.status(400).json({message:'Tag not found'})
      return
    }
    res.status(200).json({message:'Tag has been deleted'})
  }catch (err){
    res.status(400).json(err)
  }
});

module.exports = router;
