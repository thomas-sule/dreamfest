import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

export async function getAllLocations(): Promise<Location[]> {
  const locations: unknown[] = await connection('locations') // TODO: replace this with your knex query
  return locations as Location[]
}
export async function getEventsByDay(day: string) {
  const oneDay = await connection('events')
    .join('locations', 'events.location_id', 'locations.id')
    .where('events.day', day)
    .select('events.id', 'events.description', 'events.time', 'events.name')
  return oneDay as EventWithLocation[]
}
export async function getEventById(id: number): Promise<Event> {
  const result = await connection('events')
    .where('id', id)
    .select(
      'events.id',
      'events.day',
      'events.description',
      'events.time',
      'events.name',
      'location_id as locationId',
    )
    .first()
  return result
}

export async function getLocationById(id: number): Promise<LocationData> {
  const locationId = await connection('locations').where('id', id).first()
  return locationId
}
export async function updateLocation(
  id: number,
  name: string,
  description: string,
) {
  await connection('locations').where({ id }).update({ name, description })
}
export async function addNewEvent(event: EventData) {
  const addEvent = await connection('events').insert({
    name: event.name,
    day: event.day,
    description: event.description,
    time: event.time,
    location_id: event.locationId,
  })
  return addEvent
}
export async function deleteEvent(id: number) {
  await connection('events').where('events.id', id).delete('*')
}
