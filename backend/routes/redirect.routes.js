const {Router} = require('express')
const Post = require('../models/Post')
const router = Router()

router.get('/:code', async (req, res) => {
  try {

    const post = await Post.findOne({ code: req.params.code })

    if (post) {
      post.clicks++
      await post.save()
      return res.redirect(post.from)
    }

    res.status(404).json('The link is not found')

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please try it again' })
  }
})

module.exports = router
