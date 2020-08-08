const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Post = require('../models/Post')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')
    const {from} = req.body

    const code = shortid.generate()

    const existing = await Link.findOne({ from })

    if (existing) {
      return res.json({ link: existing })
    }

    const to = baseUrl + '/t/' + code

    const post = new Post({
      code, to, from, owner: req.user.userId
    })

    await post.save()

    res.status(201).json({ post })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please try it again.' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Post.find({ owner: req.user.userId })
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please try it again.' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.json(post)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please try it again.' })
  }
})

module.exports = router
