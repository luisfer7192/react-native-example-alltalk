export const REMOVE_FILTERS = 'REMOVE_FILTERS'
export const SET_HOTELS = 'SET_HOTELS'
export const SET_HOTELS_FILTER = 'SET_HOTELS_FILTER'
export const IS_LOADING_STATUS = 'IS_LOADING_STATUS'
export const CURRENT_HOTEL = 'CURRENT_HOTEL'

export const isLoadingStatus = bool => ({
  type: IS_LOADING_STATUS,
  payload: bool
})

export const removeFilters = () => ({
  type: REMOVE_FILTERS
})

export const setHotels = hotels => ({
  type: SET_HOTELS,
  payload: hotels
})

export const setHotelsFilter = hotels => ({
  type: SET_HOTELS_FILTER,
  payload: hotels
})

export const setCurrentHotel = hotel => ({
  type: CURRENT_HOTEL,
  payload: hotel
})
