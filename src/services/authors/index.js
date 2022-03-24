import express from "express"
import createError from "http-errors"
import AuthorsModel from "./model.js"

const authorsRouter = express.Router()

authorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = new AuthorsModel(req.body)
    const { _id } = await newAuthor.save()
    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})

authorsRouter.get("/", async (req, res, next) => {
  try {
      const authors = await AuthorsModel.find()
      res.send(authors)
  } catch (error) {
    next(error)
  }
})

authorsRouter.get("/:id", async (req, res, next) => {
  try {
      const author = await AuthorsModel.findById(req.params.id)
      if (author) {
      res.send(author)
    } else {
        next(createError(404, `Author of id ${req.params.id} not found`))
    }
  } catch (error) {
    next(error)
  }
})

authorsRouter.put("/:id", async (req, res, next) => {
  try {
      const updatedAuthor = await AuthorsModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          {new: true, runValidators: true}
      )
      if (updatedAuthor) {
          res.send(updatedAuthor)
      } else {
        next(createError(404, `Author of id ${req.params.id} not found`))
      }
  } catch (error) {
    next(error)
  }
})

authorsRouter.delete("/:id", async (req, res, next) => {
  try {
      const deletedAuthor = await AuthorsModel.findByIdAndDelete(req.params.id)
      if (deletedAuthor) {
          res.status(204).send()
      } else {
          next(createError(404, `Author with id ${req.params.id} not found` ))
      }
  } catch (error) {
    next(error)
  }
})

export default authorsRouter
  
  
  
  
  
  
  
  