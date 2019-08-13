let enviroment = process.env.NODE_ENV || 'development'

enviroment = enviroment === 'production' ? 'prod' : enviroment

const serverUrl = enviroment === 'development' ? 'http://localhost:8080' : 'https://mytestfront.com'

// Set the config to the server base
export const SERVER_URL = serverUrl
export const URL_STATIC_FILES = `${serverUrl}/static/images/hotels`
export const LOGO_URL = `${serverUrl}/static/images/logo.svg`
export const SPINNER_URL = `${serverUrl}/static/images/spinner.gif`
export const BROKEN_IMAGE = `${serverUrl}/static/images/broken_image.jpg`
export const MAP_IMAGE = `${serverUrl}/static/images/map_image.jpg`
