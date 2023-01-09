const { messages } = require('../constants/error')
const Blog = require('../models/Blog')
const { uploadImage } = require('../extensions/upload')

module.exports.blogs = async (req, res) => {
  try {
    const searchQuery = req.query.keyword
      ? { title: { $regex: req.query.keyword, $options: 'i' } }
      : {}

    const blogs = await Blog.find({ ...searchQuery }).sort({
      createdAt: -1
    })

    const total = await Blog.countDocuments({
      ...searchQuery
    })

    return res.status(200).json({
      success: true,
      result: {
        blogs,
        total
      }
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

module.exports.blog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    return res.status(200).json({
      success: true,
      blog
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

module.exports.create = async (req, res) => {
  try {
    if (req.body.image && typeof req.body.image === 'string') {
      const { error, result } = await uploadImage(req.body.image)
      if (error) {
        return res.status(400).json({
          success: false,
          message: messages.UPLOAD_FAIL
        })
      } else {
        req.body.image = result
      }
    }

    const blog = new Blog({
      title: req.body.title,
      url: req.body.url,
      image: req.body.image
    })

    const newBlog = await blog.save()

    return res.status(200).json({
      success: true,
      blog: newBlog
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

module.exports.update = async (req, res) => {
  try {
    if (req.body.image && typeof req.body.image === 'string') {
      const { error, result } = await uploadImage(req.body.image)
      if (error) {
        return res.status(400).json({
          success: false,
          message: messages.UPLOAD_FAIL
        })
      } else {
        req.body.image = result
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.body.id,
      { ...req.body },
      { new: true }
    )

    if (!updatedBlog) {
      return res.status(400).json({
        success: false,
        message: messages.BLOG_NOT_EXIST
      })
    }

    return res.status(200).json({
      success: true,
      blog: updatedBlog
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

module.exports.delete = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)

    return res.status(200).json({
      success: true
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message
    })
  }
}
