import PropTypes, { object } from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import { updateConstituency, addConstituency } from 'src/redux/actions'
import './AddConstituency.css'
import { useDispatch } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilCheck, cilCheckAlt, cilChevronBottom, cilX } from '@coreui/icons'
import UCsData from '../../Static/UC.json'

const AddParties = (props) => {
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(false)
  const [isProvince, setIsProvince] = useState(false)
  const [isUC, setIsUC] = useState(false)
  const [seatType, setSeatType] = useState('MNA')
  const [province, setProvince] = useState('Punjab')
  const [dropdownSearch, setDropdownSearch] = useState('')
  const [ucErr, setUcErr] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [SelectedUC, setSelectedUC] = useState([])
  const provinceDropdown = useRef()
  const seatDropdown = useRef()
  const ucDropdown = useRef()
  const [form, setForm] = useState({
    name: '',
    division: '',
    halka: '',
  })
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  const Submit = (e) => {
    if (!SelectedUC.length) setUcErr(true)
    else setUcErr(false)
    e.preventDefault()
    let selectedConsi = form.halka
    if (selectedConsi && selectedConsi.includes('UC')) {
      selectedConsi = selectedConsi + ` (${seatType})`
    }
    const data = {
      province: province,
      seatType: seatType,
      halka: selectedConsi,
      unionCouncils: SelectedUC,
      name: form.name,
      division: form.division,
    }
    console.log(data, 'data')
    if (props.edit) {
      dispatch(updateConstituency(props.editData._id, data))
        .then((response) => {
          props.isToast('success', 'updated')
          props.allConstituency()
          props.closeModal()
        })
        .catch((error) => {
          console.log(error)
          setErrMsg(error.response.data.message + '*')
        })
    } else {
      dispatch(addConstituency(data))
        .then((response) => {
          props.isToast('success')
          props.allConstituency()
          props.closeModal()
        })
        .catch((error) => {
          setErrMsg(error.response.data.message + '*')
          console.log(error)
        })
    }
  }
  useEffect(() => {
    if (props.edit) {
      console.log(props.editData)
      setForm(props.editData)
      setSeatType(props.editData.seatType)
      setProvince(props.editData.province)
      setSelectedUC(props.editData.unionCouncils)
    } else {
      setForm({
        name: '',
        division: '',
      })
    }
    document.addEventListener('click', closeSelectBox)
    return () => {
      document.removeEventListener('click', closeSelectBox)
    }
  }, [])
  const closeSelectBox = (event) => {
    if (!provinceDropdown.current.contains(event.target)) {
      setIsProvince(false)
    }
    if (!seatDropdown.current.contains(event.target)) {
      setDropdown(false)
    }
    if (!ucDropdown.current.contains(event.target)) {
      setIsUC(false)
    }
  }
  const Checkbox = (text) => {
    if (SelectedUC.includes(text)) {
      // if (SelectedUC.length > 1) {
      const tempArray = [...SelectedUC]
      const index = tempArray.indexOf(text)
      tempArray.splice(index, 1)
      setSelectedUC(() => tempArray)
      // }
    } else {
      if (SelectedUC.length < 10) {
        setSelectedUC((prev) => {
          return [...prev, text]
        })
      }
    }
  }
  const deleteCheckbox = (event, text) => {
    event.stopPropagation()
    // if (SelectedUC.length > 1) {
    const tempArray = [...SelectedUC]
    const index = tempArray.indexOf(text)
    tempArray.splice(index, 1)
    setSelectedUC(() => tempArray)
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
                <div className="inputBox">
                  <label>Name</label>
                  <input
                    className="input"
                    placeholder="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputBox" ref={seatDropdown}>
                  <label>Seat Type</label>
                  <div className="dropdownContainer">
                    <div
                      className="dropdownBox"
                      style={{ height: '40px' }}
                      onClick={() => setDropdown(!dropdown)}
                    >
                      <div className="selectedText">
                        <p className="dropdownText">{seatType}</p>
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
                            onClick={() => (setSeatType('MNA'), setDropdown(!dropdown))}
                          >
                            MNA
                          </p>
                          <p
                            className="Text"
                            onClick={() => (setSeatType('MPA'), setDropdown(!dropdown))}
                          >
                            MPA
                          </p>
                          <p
                            className="Text"
                            onClick={() => (setSeatType('Chairman'), setDropdown(!dropdown))}
                          >
                            Chairman
                          </p>
                          <p
                            className="Text"
                            onClick={() => (setSeatType('Councellor'), setDropdown(!dropdown))}
                          >
                            Councellor
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="inputContainer" style={{ marginTop: '15px' }}>
                <div className="inputBox">
                  <label>Constituency</label>
                  <input
                    className="input"
                    placeholder="NA, PP, UC"
                    name="halka"
                    value={form.halka}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputBox" ref={provinceDropdown}>
                  <label>Province</label>
                  <div className="dropdownContainer">
                    <div
                      className="dropdownBox"
                      style={{ height: '40px' }}
                      onClick={() => setIsProvince(!isProvince)}
                    >
                      <div className="selectedText">
                        <p className="dropdownText">{province}</p>
                      </div>
                      <div className="ArrowIcon">
                        <CIcon icon={cilChevronBottom} size="sm" className="me-2 editIcon" />
                      </div>
                    </div>
                    {isProvince && (
                      <div className="SelectboxContainer">
                        <div className="SelectBox">
                          <p
                            className="Text"
                            onClick={() => (setProvince('Punjab'), setIsProvince(false))}
                          >
                            Punjab
                          </p>
                          <p
                            className="Text"
                            onClick={() => (setProvince('Sindh'), setIsProvince(false))}
                          >
                            Sindh
                          </p>
                          <p
                            className="Text"
                            onClick={() => (setProvince('KPK'), setIsProvince(false))}
                          >
                            KPK
                          </p>
                          <p
                            className="Text"
                            onClick={() => (setProvince('Balochistan'), setDropdown(false))}
                          >
                            Balochistan
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="inputContainer" style={{ marginTop: '15px' }}>
                <div className="inputBox">
                  <label>Division</label>
                  <input
                    placeholder="Division"
                    name="division"
                    value={form.division}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>
              <div className="inputContainer" style={{ marginTop: '15px', marginBottom: '20px' }}>
                <div className="inputBox" ref={ucDropdown}>
                  <label>Union Councils</label>
                  <div className="dropdownContainer">
                    <div
                      className="dropdownBox"
                      style={{ borderColor: ucErr && 'red' }}
                      onClick={() => setIsUC(!isUC)}
                    >
                      <div className="selectedText">
                        {!SelectedUC.length ? (
                          <span style={{ color: 'grey' }}>Union Councils</span>
                        ) : (
                          SelectedUC.map((uc, index) => {
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
                    {isUC && (
                      <div className="SelectboxContainer">
                        <input
                          placeholder="Search..."
                          className="dropdownSearch"
                          onChange={(e) => setDropdownSearch(e.target.value)}
                        />
                        <div className="SelectBox">
                          {UCsData.UCs.filter((ele) => {
                            return dropdownSearch.toLowerCase() === ''
                              ? ele
                              : ele.name.toLowerCase().includes(dropdownSearch)
                          }).map((uc, index) => {
                            return (
                              <div
                                className="checkboxWrapper"
                                key={index}
                                onClick={() => Checkbox(uc.name)}
                              >
                                <div
                                  className={
                                    SelectedUC.includes(uc.name) ? 'isChecked' : 'MultipleCheckbox'
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
                                  {uc.name}
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

AddParties.propTypes = {
  closeModal: PropTypes.func,
  isToast: PropTypes.func,
  allConstituency: PropTypes.func,
  editData: PropTypes.object,
  id: PropTypes.string,
  edit: PropTypes.bool,
}

export default React.memo(AddParties)
