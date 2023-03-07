const express = require('express')
const router  = express.Router()
const {check, validationResult} = require("express-validator")
const { Show, User } = require('../models/index')
const {sequelize} = require("../db")


router.get('/', async(req, res) => {
    const shows = await Show.findAll()
    res.json(shows)
})

router.get('/:id', async(req, res) => {
    objKeyToFind = req.params.id
    objFound = await Show.findByPk(objKeyToFind)
    res.json(objFound)
})

router.get('/genre/:genre', async (req, res) => {
    const shows = await Show.findAll({
    where: { genre: req.params.genre },
    })
    res.json(shows)
})

router.put('/:id/watched', async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    const {rating} = req.body
    show.rating = rating
    await show.save()
    res.json({ message: 'Show rating updated' })
})

router.put('/:id/updates', async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    const {status} = req.body
    show.status = status
    await show.save()
    res.json({ message: 'Show status updated' })
})

router.delete('/:id', async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    await show.destroy()
    res.json({ message: 'Show deleted' })
  })


module.exports = router