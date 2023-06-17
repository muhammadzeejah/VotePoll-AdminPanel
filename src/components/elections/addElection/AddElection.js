import PropTypes, { object } from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import {
  updateConstituency,
  addConstituency,
  updateElection,
  addElection,
  getAllConstituency,
} from 'src/redux/actions'
import './AddElection.css'
import { useDispatch } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { cilCheckAlt, cilChevronBottom, cilX } from '@coreui/icons'
import axios from 'axios'

const AddElection = (props) => {
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(false)
  const [statusDropdown, setStatusDropdown] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [isArea, setIsArea] = useState(false)
  const [electionType, setElectionType] = useState('NATIONAL')
  const [status, setStatus] = useState('OPEN')
  const [dropdownSearch, setDropdownSearch] = useState('')
  const [areas, setareas] = useState([])
  const [SelectedArea, setSelectedArea] = useState([])
  const [endErr, setEndErr] = useState(false)
  const [startErr, setStartErr] = useState(false)
  const [UCs, setUCs] = useState([])
  const [areaErr, setAreaErr] = useState(false)
  const areaDropdown = useRef()
  const statusdropdown = useRef()
  const typeDropdown = useRef()
  let consituenciesCount = 0

  const DateChange = (e) => {
    setStart(e.target.value)
  }
  const EndDateChange = (e) => {
    setEnd(e.target.value)
  }
  const Submit = (e) => {
    console.log('hi')
    e.preventDefault()
    if (!end) setEndErr(true)
    else setEndErr(false)
    if (!start) setStartErr(true)
    else setStartErr(false)
    if (electionType === 'PROVINCIAL' || electionType === 'LOCAL') {
      if (!SelectedArea.length) setAreaErr(true)
      else setAreaErr(false)
    }
    const data = {
      type: electionType,
      status: status,
      start: Math.floor(new Date(start).getTime() / 1000),
      end: Math.floor(new Date(end).getTime() / 1000),
    }
    if (electionType === 'PROVINCIAL' || electionType === 'LOCAL') {
      Object.assign(data, { area: SelectedArea })
    }
    console.log(data)
    if (props.edit) {
      dispatch(updateElection(props.editData._id, data))
        .then((response) => {
          props.isToast('success', 'updated')
          props.allConstituency()
          props.closeModal()
        })
        .catch((error) => {
          if (error.response.data.message.includes('is before'))
            setErrMsg('Start date is before End data*')
          else setErrMsg(error.response.data.message + '*')
        })
    } else {
      dispatch(addElection(data))
        .then((response) => {
          props.isToast('success')
          props.allConstituency()
          props.closeModal()
        })
        .catch((error) => {
          if (error.response.data.message.includes('is before'))
            setErrMsg('Start date is before End data*')
          else setErrMsg(error.response.data.message + '*')
        })
    }
  }
  function dateConverter(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2),
      hours = ('0' + date.getHours()).slice(-2),
      minutes = ('0' + date.getMinutes()).slice(-2),
      seconds = ('0' + date.getSeconds()).slice(-2),
      year = date.getFullYear()
    return `${year}/${mnth}/${day} ${hours}:${minutes}:${seconds}`
  }

  useEffect(() => {
    if (props.edit) {
      setStatus(props.editData.status)
      setElectionType(props.editData.type)
      setStart(
        dateConverter(new Date(props.editData.startTime).toString())
          .replace(/ /g, 'T')
          .replace(/\//g, '-'),
      )
      setEnd(
        dateConverter(new Date(props.editData.endTime).toString())
          .replace(/ /g, 'T')
          .replace(/\//g, '-'),
      )
      setSelectedArea(props.editData.area)
    }
    document.addEventListener('click', closeSelectBox)
    return () => {
      document.removeEventListener('click', closeSelectBox)
    }
  }, [])
  const getAllUc = async () => {
    const arr = []
    const areaa = ['Punjab', 'Pakhtoon Khuwah', 'Sindh', 'Balouchistan']
    areaa.map((item) => {
      arr.push(item)
    })
    await axios
      .get(`http://127.0.0.1:3000/api/v1/consituencies/getUC`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data.data.consituency, 'ucs')
        for (let i = 0; i < response.data.data.consituency.length; i++) {
          arr.push(response.data.data.consituency[i].halka)
        }
        // const consituencies = response.data.data.consituencies.filter((consituency) => {
        //   return consituency.halka.includes('UC')
        // })
        // consituencies.map((consituency) => {
        //   areas.push(consituency.halka)
        // })
      })
    setareas(arr)
    console.log(areas)
  }
  useEffect(() => {
    getAllUc()
    let temp = areas,
      arr
    if (electionType === 'LOCAL') {
      console.log(electionType)
      arr = temp.filter((area) => {
        return area.includes('UC')
      })
    } else {
      console.log(electionType)
      arr = temp.filter((area) => {
        return !area.includes('UC')
      })
    }
    console.log(arr, 'b')
    setUCs(arr)
  }, [electionType])
  const closeSelectBox = (event) => {
    if (!typeDropdown.current.contains(event.target)) {
      setDropdown(false)
    }
    if (!statusdropdown.current.contains(event.target)) {
      setStatusDropdown(false)
    }
    if (!areaDropdown.current.contains(event.target)) {
      setIsArea(false)
    }
  }
  const Checkbox = (text) => {
    if (SelectedArea.includes(text)) {
      // if (SelectedArea.length > 1) {
      const tempArray = [...SelectedArea]
      const index = tempArray.indexOf(text)
      tempArray.splice(index, 1)
      setSelectedArea(() => tempArray)
      // }
    } else {
      // if (SelectedArea.length < 10) {
      setSelectedArea((prev) => {
        return [...prev, text]
      })
      // }
    }
  }
  const deleteCheckbox = (event, text) => {
    event.stopPropagation()
    // if (SelectedArea.length > 1) {
    const tempArray = [...SelectedArea]
    const index = tempArray.indexOf(text)
    tempArray.splice(index, 1)
    setSelectedArea(() => tempArray)
    // }
  }
  return (
    <div>
      <div className="addPartyContainer">
        <div className="backdrop" onClick={props.closeModal} />
        <div className="addPartyBox">
          <div className="crossIcon" onClick={props.closeModal}>
            &#9587;
          </div>
          <div style={{ marginTop: '30px' }}>
            <form onSubmit={Submit}>
              <div className="inputContainer">
                <div className="inputBox" ref={typeDropdown}>
                  <label>Election Type</label>
                  <div className="dropdownContainer">
                    <div
                      className="dropdownBox"
                      style={{ height: '40px' }}
                      onClick={() => setDropdown(!dropdown)}
                    >
                      <div className="selectedText">
                        <p className="dropdownText">{electionType}</p>
                      </div>
                      <div className="ArrowIcon">
                        <CIcon icon={cilChevronBottom} size="sm" className="me-2 editIcon" />
                      </div>
                    </div>
                    {dropdown && (
                      <div className="SelectboxContainer">
                        <div className="SelectBox">
                          <p
                            className="Text"
                            onClick={() => (setElectionType('NATIONAL'), setDropdown(!dropdown))}
                          >
                            NATIONAL
                          </p>
                          <p
                            className="Text"
                            onClick={() => (setElectionType('PROVINCIAL'), setDropdown(!dropdown))}
                          >
                            PROVINCIAL
                          </p>
                          <p
                            className="Text"
                            onClick={() => (setElectionType('LOCAL'), setDropdown(!dropdown))}
                          >
                            LOCAL
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="inputContainer">
                <div className="inputBox" ref={statusdropdown}>
                  <label>Status</label>
                  <div className="dropdownContainer">
                    <div
                      className="dropdownBox"
                      style={{ height: '40px' }}
                      onClick={() => setStatusDropdown(!statusDropdown)}
                    >
                      <div className="selectedText">
                        <p className="dropdownText">{status}</p>
                      </div>
                      <div className="ArrowIcon">
                        <CIcon icon={cilChevronBottom} size="sm" className="me-2 editIcon" />
                      </div>
                    </div>
                    {statusDropdown && (
                      <div className="SelectboxContainer">
                        <div className="SelectBox">
                          <p
                            className="Text"
                            onClick={() => (setStatus('OPEN'), setStatusDropdown(!statusDropdown))}
                          >
                            OPEN
                          </p>
                          <p
                            className="Text"
                            onClick={() => (
                              setStatus('CLOSED'), setStatusDropdown(!statusDropdown)
                            )}
                          >
                            CLOSED
                          </p>
                          <p
                            className="Text"
                            onClick={() => (
                              setStatus('PENDING'), setStatusDropdown(!statusDropdown)
                            )}
                          >
                            PENDING
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div> */}
              <div className="inputContainer" style={{ marginTop: '15px' }}>
                <div className="inputBox">
                  <label>Start Time</label>
                  {!props.edit ? (
                    <input
                      placeholder="Division"
                      type="datetime-local"
                      className="input"
                      style={{ borderColor: startErr && 'red' }}
                      onChange={DateChange}
                    />
                  ) : (
                    start && (
                      <input
                        placeholder="Division"
                        type="datetime-local"
                        style={{ borderColor: startErr && 'red' }}
                        className="input"
                        value={start}
                        onChange={DateChange}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="inputContainer" style={{ marginTop: '15px' }}>
                <div className="inputBox">
                  <label>End Time</label>
                  {!props.edit ? (
                    <input
                      placeholder="Division"
                      type="datetime-local"
                      className="input"
                      style={{ borderColor: endErr && 'red' }}
                      onChange={EndDateChange}
                    />
                  ) : (
                    end && (
                      <input
                        placeholder="Division"
                        type="datetime-local"
                        className="input"
                        style={{ borderColor: endErr && 'red' }}
                        value={end}
                        onChange={EndDateChange}
                      />
                    )
                  )}
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                {(electionType === 'PROVINCIAL' || electionType === 'LOCAL') && (
                  <div className="inputContainer" style={{ marginTop: '15px' }}>
                    <div className="inputBox" ref={areaDropdown}>
                      <label>Areas</label>
                      <div className="dropdownContainer">
                        <div
                          className="dropdownBox"
                          style={{ borderColor: areaErr && 'red' }}
                          onClick={() => setIsArea(!isArea)}
                        >
                          <div className="selectedText">
                            {!SelectedArea.length ? (
                              <span style={{ color: 'grey' }}>Areas</span>
                            ) : (
                              SelectedArea.map((uc, index) => {
                                return (
                                  <div className="DurationBox" key={index}>
                                    <div className="DurationTime">{uc}</div>
                                    <div
                                      className="DeleteDuration"
                                      onClick={(event) => deleteCheckbox(event, uc)}
                                    >
                                      <CIcon icon={cilX} />
                                    </div>
                                  </div>
                                )
                              })
                            )}
                          </div>
                          <div className="ArrowIcon">
                            <CIcon icon={cilChevronBottom} size="sm" className="me-2 editIcon" />
                          </div>
                        </div>
                        {isArea && SelectedArea && (
                          <div className="SelectboxContainer">
                            <input
                              placeholder="Search..."
                              className="dropdownSearch"
                              onChange={(e) => setDropdownSearch(e.target.value)}
                            />
                            <div className="SelectBox">
                              {areas
                                .filter((ele) => {
                                  return dropdownSearch.toLowerCase() === ''
                                    ? ele
                                    : ele.toLowerCase().includes(dropdownSearch)
                                })
                                .map((uc, index) => {
                                  return (
                                    <div
                                      className="checkboxWrapper"
                                      key={index}
                                      onClick={() => Checkbox(uc)}
                                    >
                                      <div
                                        className={
                                          SelectedArea.includes(uc)
                                            ? 'isChecked'
                                            : 'MultipleCheckbox'
                                        }
                                      >
                                        <CIcon
                                          icon={cilCheckAlt}
                                          style={{ color: 'white' }}
                                          height={15}
                                          width={15}
                                        />
                                      </div>
                                      <p key={index} className="Text">
                                        {uc}
                                      </p>
                                    </div>
                                  )
                                })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {errMsg && (
                <p style={{ fontSize: '14px', color: 'red', marginTop: '-10px' }}>{errMsg}</p>
              )}
              <div className="buttonContainer">
                <button className="closeButton" onClick={props.closeModal}>
                  Close
                </button>
                <button type="submit" className="button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

AddElection.propTypes = {
  closeModal: PropTypes.func,
  isToast: PropTypes.func,
  allConstituency: PropTypes.func,
  editData: PropTypes.object,
  id: PropTypes.string,
  edit: PropTypes.bool,
}

export default React.memo(AddElection)
