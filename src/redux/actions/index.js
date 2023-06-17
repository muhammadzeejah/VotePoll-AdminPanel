import axios from 'axios'
import { ActionTypes } from '../constants/action-type'

export const register = (form) => async (dispatch) => {
  return await axios.post(`http://127.0.0.1:3000/api/v1/users/signup`, form)
}

export const login = (form) => async (dispatch) => {
  return await axios.post(`http://127.0.0.1:3000/api/v1/users/login`, form).then((response) => {
    localStorage.setItem('token', response.data.token)
  })
}

export const forgetPassword = (form) => async (dispatch) => {
  return await axios.post(`http://127.0.0.1:3000/api/v1/users/forgetPassword`, form)
}

export const resetPassword = (id, form) => async (dispatch) => {
  return await axios.patch(`http://127.0.0.1:3000/api/v1/users/resetPassword/${id}`, form)
}

export const getAllParties = (pageNum) => async (dispatch) => {
  return await axios.get(`http://127.0.0.1:3000/api/v1/parties?page=${pageNum}&limit=10`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const getParty = (id) => async (dispatch) => {
  await axios
    .get(`http://127.0.0.1:3000/api/v1/parties/party/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
      },
    })
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_PARTY,
        payload: response.data,
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export const addParty = (form) => async () => {
  return await axios({
    url: 'http://127.0.0.1:3000/api/v1/parties/create',
    method: 'POST',
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const updateParty = (id, form) => async (dispatch) => {
  return await axios({
    url: `http://127.0.0.1:3000/api/v1/parties/update/${id}`,
    method: 'PATCH',
    data: form,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const deleteParty = (id) => async (dispatch) => {
  return await axios.delete(`http://127.0.0.1:3000/api/v1/parties/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const getAllCandidates = (pageNum) => async (dispatch) => {
  return await axios.get(`http://127.0.0.1:3000/api/v1/candidate?page=${pageNum}&limit=10`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const getCandidate = (id) => async (dispatch) => {
  return await axios.get(`http://127.0.0.1:3000/api/v1/candidate/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const addCandidate = (form) => async () => {
  return await axios({
    url: 'http://127.0.0.1:3000/api/v1/candidate/create',
    method: 'POST',
    data: form,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const updateCandidate = (id, form) => async (dispatch) => {
  return await axios({
    url: `http://127.0.0.1:3000/api/v1/candidate/update/${id}`,
    method: 'PATCH',
    data: form,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const deleteCandidate = (id) => async (dispatch) => {
  return await axios.delete(`http://127.0.0.1:3000/api/v1/candidate/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}
export const getAllConstituency = (pageNum) => async (dispatch) => {
  return await axios.get(`http://127.0.0.1:3000/api/v1/consituencies?page=${pageNum}&limit=10`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const getConstituency = (id) => async (dispatch) => {
  return await axios.get(`http://127.0.0.1:3000/api/v1/consituencies/consituency/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const addConstituency = (form) => async () => {
  return await axios({
    url: 'http://127.0.0.1:3000/api/v1/consituencies/create',
    method: 'POST',
    data: form,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const updateConstituency = (id, form) => async (dispatch) => {
  return await axios({
    url: `http://127.0.0.1:3000/api/v1/consituencies/update/${id}`,
    method: 'PATCH',
    data: form,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const deleteConstituency = (id) => async (dispatch) => {
  return await axios.delete(`http://127.0.0.1:3000/api/v1/consituencies/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const getAllElections = (pageNum) => async (dispatch) => {
  return await axios.get(`http://127.0.0.1:3000/api/v1/elections?page=${pageNum}&limit=10`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const getElection = (id) => async (dispatch) => {
  return await axios.get(`http://127.0.0.1:3000/api/v1/elections/election/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const addElection = (form) => async () => {
  return await axios({
    url: 'http://127.0.0.1:3000/api/v1/elections/create',
    method: 'POST',
    data: form,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const updateElection = (id, form) => async (dispatch) => {
  return await axios({
    url: `http://127.0.0.1:3000/api/v1/elections/update/${id}`,
    method: 'PATCH',
    data: form,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const deleteElection = (id) => async (dispatch) => {
  return await axios.delete(`http://127.0.0.1:3000/api/v1/elections/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  })
}

export const sidebar = (show) => {
  return {
    type: 'set',
    payload: show,
  }
}
