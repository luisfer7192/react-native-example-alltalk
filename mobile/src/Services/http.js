import axios from '../lib/axios'
import { setHotels, setHotelsFilter, removeFilters, isLoadingStatus } from './Actions'

export function getHotels() {
  return async dispatch => {
    dispatch(isLoadingStatus(true))
    try {
      const { data } = await axios.get('/hotels')
      dispatch(setHotels(data.data))
    } catch (err) {
      console.log('error: ', err)
    }
    dispatch(isLoadingStatus(false))
  }
}

export function searchFilter(text) {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/search/${encodeURIComponent(text)}`)
      dispatch(setHotelsFilter(data.data))
    } catch (err) {
      console.log('error: ', err)
    }
  }
}

export function setStarsFiler(stars) {
  return async dispatch => {
    try {
      if (!stars.length)
        return dispatch(removeFilters())
      const { data } = await axios.get(`/starts/${stars.join(',')}`)
      dispatch(setHotelsFilter(data.data))
    } catch (err) {
      console.log('error: ', err)
    }
  }
}
