import { URL_STATIC_FILES } from '../../config'
import { REMOVE_FILTERS, SET_HOTELS, SET_HOTELS_FILTER, IS_LOADING_STATUS, CURRENT_HOTEL } from "../Actions";

const initialState = { hotels: [], filters: [], currentHotel: {}, isLoading: true }

const hotels = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOTELS:
      const newHotels = action.payload.map((hotel) => Object.assign({}, hotel, { image: `${URL_STATIC_FILES}/${hotel.image}` }))
      return {
        ...state,
        filters: newHotels,
        hotels: newHotels
      }
    case SET_HOTELS_FILTER:
      const filtered = action.payload.map((hotel) => Object.assign({}, hotel, { image: `${URL_STATIC_FILES}/${hotel.image}` }))
      return {
        ...state,
        filters: filtered
      }
    case REMOVE_FILTERS:
      return {
        ...state,
        filters: state.hotels
      }
    case IS_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.payload
      }
    case CURRENT_HOTEL:
      console.log('CURRENT_HOTEL', action.payload)
      return {
        ...state,
        currentHotel: action.payload
      }
    default:
      return state
  }
}

export default hotels
