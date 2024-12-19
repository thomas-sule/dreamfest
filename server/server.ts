import * as Path from 'node:path'

import express from 'express'

import locationRoutes from './routes/locations.ts'
import scheduleRoutes from './routes/schedule.ts'
import eventRoutes from './routes/events.ts'

const server = express()

server.use(express.json())
server.use('/api/v1/locations', locationRoutes)
server.use('/api/v1/schedule', scheduleRoutes)
server.use('/api/v1/events', eventRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
