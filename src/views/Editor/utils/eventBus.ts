import { EventEmitter } from 'events'

const eventBus = new EventEmitter()

// process.env.NODE_ENV === 'development' && window.eventBus = eventBus

export default eventBus
