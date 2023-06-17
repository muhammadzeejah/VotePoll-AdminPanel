import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect } from 'react'
import { updateParty, addParty, updateCandidate, addCandidate } from 'src/redux/actions'
import './AddCandidate.css'
import { useDispatch, useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { cilCheckAlt, cilChevronBottom, cilX } from '@coreui/icons'
import { getAllParties } from 'src/redux/actions'
import { getAllConstituency } from 'src/redux/actions'

const AddCandidate = (props) => {
  const dispatch = useDispatch()
  const [isConsituency, setIsConsituency] = useState(false)
  const [isParties, setIsParties] = useState(false)
  const [dropdownSearch, setDropdownSearch] = useState('')
  const [consituency, setConsituency] = useState([])
  const [parties, setParties] = useState([])
  const [selectedConsituency, setSelectedConsituency] = useState([])
  const [selectedParty, setSelectedParty] = useState({ name: '', id: '' })
  const [cnic, setCnic] = useState()
  const [assets, setAssets] = useState()
  const partyDropdown = useRef()
  const consituencyDropdown = useRef()
  const [consituencyErr, setConsituencyErr] = useState(false)
  const [partyErr, setpartyErr] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [totalParties, setTotalParties] = useState()
  const [totalConsituencies, settotalConsituencies] = useState()
  const [partiesCount, setPartiesCount] = useState(0)
  const [consituenciesCount, setConsituenciesCount] = useState(0)

  const Submit = (e) => {
    if (!selectedConsituency.length) setConsituencyErr(true)
    else setConsituencyErr(false)
    if (!selectedParty.name) setpartyErr(true)
    else setpartyErr(false)
    e.preventDefault()
    const consituenciesIds = selectedConsituency.map((consituency) => {
      return consituency.id
    })
    const data = {
      citizenId: cnic,
      partyId: selectedParty.id,
      consituencyIds: consituenciesIds,
      assets: assets,
    }
    if (props.edit) {
      dispatch(updateCandidate(props.editData._id, data))
        .then((response) => {
          props.isToast('success', 'updated')
          props.allCandidates('contract')
          props.closeModal()
        })
        .catch((error) => {
          console.log(error)
          setErrMsg(error.response.data.message + '*')
        })
    } else {
      dispatch(addCandidate(data))
        .then((response) => {
          props.isToast('success')
          props.allCandidates('contract')
          props.closeModal()
        })
        .catch((error) => {
          console.log(error)
          setErrMsg(error.response.data.message + '*')
        })
    }
  }
  useEffect(() => {
    if (props.edit) {
      setAssets(props.editData.assets)
      setCnic(props.editData.citizen.cnic)
      setSelectedParty({ name: props.editData.party.name, id: props.editData.party._id })
      const consituencies = props.editData.consituencies.map((consituency) => {
        return { name: consituency.halka, id: consituency._id }
      })
      setSelectedConsituency(consituencies)
    } else {
      getConsituencies()
      getParties()
    }
    document.addEventListener('click', closeSelectBox)
    return () => {
      document.removeEventListener('click', closeSelectBox)
    }
  }, [])

  const getConsituencies = () => {
    let temp = partiesCount + 1
    setConsituenciesCount(temp)
    dispatch(getAllConstituency(temp)).then((response) => {
      const consituencies = response.data.data.consituencies.map((consituency) => {
        return { name: consituency.halka, id: consituency._id }
      })
      settotalConsituencies(response.data.total)
      setConsituency(consituencies)
    })
  }

  const getParties = () => {
    let temp = partiesCount + 1
    setPartiesCount(temp)
    dispatch(getAllParties(temp)).then((response) => {
      console.log(response.data)
      const party = response.data.data.parties.map((party) => {
        return { name: party.name, id: party._id }
      })
      setParties(party)
      setTotalParties(response.data.total)
      setSelectedParty(party[0])
    })
  }

  const closeSelectBox = (event) => {
    if (!partyDropdown.current.contains(event.target)) {
      setIsParties(false)
    }
    if (!consituencyDropdown.current.contains(event.target)) {
      setIsConsituency(false)
    }
  }
  const Checkbox = (text) => {
    if (selectedConsituency.includes(text)) {
      // if (selectedConsituency.length > 1) {
      const tempArray = [...selectedConsituency]
      const index = tempArray.indexOf(text)
      tempArray.splice(index, 1)
      setSelectedConsituency(() => tempArray)
      // }
    } else {
      if (selectedConsituency.length < 10) {
        setSelectedConsituency((prev) => {
          return [...prev, text]
        })
      }
    }
    console.log(selectedConsituency)
  }
  const deleteCheckbox = (event, text) => {
    event.stopPropagation()
    // if (selectedConsituency.length > 1) {
    const tempArray = [...selectedConsituency]
    const index = tempArray.indexOf(text)
    tempArray.splice(index, 1)
    setSelectedConsituency(() => tempArray)
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
                  <label>Candidate&apos;s CNIC</label>
                  <input
                    className="input"
                    placeholder="Candidate's CNIC"
                    name="name"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    required
                  />
                </div>
                <div className="inputBox" ref={partyDropdown}>
                  <label>Party</label>
                  <div className="dropdownContainer">
                    <div
                      className="dropdownBox"
                      style={{ height: '40px', borderColor: partyErr && 'red' }}
                      onClick={() => setIsParties(!isParties)}
                    >
                      <div className="selectedText">
                        <p className="dropdownText">{selectedParty.name}</p>
                      </div>
                      <div className="ArrowIcon">
                        <CIcon icon={cilChevronBottom} size="sm" className="me-2 editIcon" />
                      </div>
                    </div>
                    {isParties && (
                      <div className="SelectboxContainer">
                        <input
                          placeholder="Search..."
                          className="dropdownSearch"
                          onChange={(e) => setDropdownSearch(e.target.value)}
                        />
                        <div className="SelectBox">
                          {parties &&
                            parties
                              .filter((ele) => {
                                return dropdownSearch.toLowerCase() === ''
                                  ? ele
                                  : ele.name.toLowerCase().includes(dropdownSearch)
                              })
                              .map((party, index) => {
                                return (
                                  <p
                                    key={index}
                                    className="Text"
                                    onClick={() => (setSelectedParty(party), setIsParties(false))}
                                  >
                                    {party.name}
                                  </p>
                                )
                              })}
                          {parties.length < totalParties && (
                            <p
                              className="Text"
                              style={{
                                textAlign: 'center',
                                fontWeight: '500',
                                textDecoration: 'underline',
                              }}
                              onClick={getParties}
                            >
                              Load More...
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="inputContainer" style={{ marginTop: '15px' }}>
                <div className="inputBox" ref={consituencyDropdown}>
                  <label>Constituencies</label>
                  <div className="dropdownContainer">
                    <div
                      className="dropdownBox"
                      style={{ borderColor: consituencyErr && 'red', minHeight: '45px' }}
                      onClick={() => setIsConsituency(!isConsituency)}
                    >
                      <div className="selectedText">
                        {!selectedConsituency.length ? (
                          <span style={{ color: 'grey' }}>Constituencies</span>
                        ) : (
                          selectedConsituency.map((consituency, index) => {
                            return (
                              <div className="DurationBox" key={index}>
                                <div className="DurationTime">{consituency.name}</div>
                                <div
                                  className="DeleteDuration"
                                  onClick={(event) => deleteCheckbox(event, consituency)}
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
                    {isConsituency && (
                      <div className="SelectboxContainer">
                        <input
                          placeholder="Search..."
                          className="dropdownSearch"
                          onChange={(e) => setDropdownSearch(e.target.value)}
                        />
                        <div className="SelectBox">
                          {consituency
                            .filter((ele) => {
                              return dropdownSearch.toLowerCase() === ''
                                ? ele
                                : ele.toLowerCase().includes(dropdownSearch)
                            })
                            .map((consituency, index) => {
                              return (
                                <div
                                  className="checkboxWrapper"
                                  key={index}
                                  onClick={() => Checkbox(consituency)}
                                >
                                  <div
                                    className={
                                      selectedConsituency.includes(consituency)
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
                                    {consituency.name}
                                  </p>
                                </div>
                              )
                            })}
                          {consituency.length < totalConsituencies && (
                            <p
                              className="Text"
                              style={{
                                textAlign: 'center',
                                fontWeight: '500',
                                textDecoration: 'underline',
                              }}
                              onClick={getConsituencies}
                            >
                              Load More...
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="inputContainer" style={{ marginTop: '15px', marginBottom: '10px' }}>
                <div className="inputBox">
                  <label>Assets</label>
                  <textarea
                    placeholder="Assets"
                    name="assets"
                    value={assets}
                    onChange={(e) => setAssets(e.target.value)}
                    className="input"
                    required
                  />
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

AddCandidate.propTypes = {
  closeModal: PropTypes.func,
  isToast: PropTypes.func,
  allCandidates: PropTypes.func,
  editData: PropTypes.object,
  id: PropTypes.string,
  edit: PropTypes.bool,
}

export default React.memo(AddCandidate)
