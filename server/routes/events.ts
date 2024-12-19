import express from 'express'

import { validateDay } from './helpers.ts'

import * as db from '../db/index.ts'

const router = express.Router()
export default router

router.post('/', async (req, res, next) => {
  try {
    const { name, description, time, locationId } = req.body
    const day = validateDay(req.body.day)
    const id = db.addNewEvent({ name, day, description, time, locationId }) // TODO: call your new db.addNewEvent function and use the returned ID
    const url = `/api/v1/events/${id}`
    res.setHeader('Location', url)
    res.status(201).json({ location: url })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    // TODO: DELETE the event with this matching ID
    db.deleteEvent(id)
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const result = await db.getEventById(id)

    if (!result) {
      return res.sendStatus(404)
    } else {
      res.json(result)
    }
  } catch (e) {
    next(e)
  }
})

// router.patch('/:id', async (req, res, next) => {
//   try {
//     const { name, description, time } = req.body
//     const id = Number(req.body.id)
//     const day = validateDay(req.body.day)
//     const locationId = Number(req.body.locationId)

//     // TODO: UPDATE the event in the db with the matching ID using these details,
//     // if no event has a matching id, respond with a 404 instead
//     res.sendStatus(204)
//   } catch (e) {
//     next(e)
//   }
// })
