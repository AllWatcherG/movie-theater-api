const express = require('express')
const router  = express.Router()
const {check, validationResult} = require("express-validator")
const { Show, User } = require('../models/index')
const {sequelize} = require("../db")

router.get("/", async(req, res) => {
    const users = await User.findAll()
    res.json(users)
})

router.get("/:id", async(req, res) => {
    objKeyToFind = req.params.id
    objFound = await User.findByPk(objKeyToFind)
    res.json(objFound)

})

router.get('/:id/shows', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: { model: Show },
    })
    res.json(user.shows)
})

router.put('/:id/shows', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    const { title, genre, rating } = req.body
    const show = await Show.findOrCreate({
        where: { title, genre, rating },
    })
    await user.addShow(show[0])
    res.json({ message: 'Show added to user' })
})






module.exports = router