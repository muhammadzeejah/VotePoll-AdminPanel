import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect } from 'react'
import { updateParty, getAllParties, addParty } from 'src/redux/actions'
import './AddParties.css'
import { useDispatch } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

const AddParties = (props) => {
  const dispatch = useDispatch()
  const [logo, setLogo] = useState()
  const [leaderImg, setLeaderImg] = useState()
  const [partyImgErr, setPartyImgErr] = useState(false)
  const [leaderImgErr, setLeaderImgErr] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    leader: '',
    president: '',
    manifesto: '',
    description: '',
    postalAddress: '',
  })

  const logoRef = useRef()
  const leaderImgRef = useRef()

  const handleLogo = (e) => {
    e.preventDefault()
    logoRef.current?.click()
  }
  const handleLogoDetail = () => {
    logoRef.current?.files && setLogo(logoRef.current.files[0])
  }

  const handleLeaderImg = (e) => {
    e.preventDefault()
    leaderImgRef.current?.click()
  }

  const handleLeaderImgDetail = () => {
    leaderImgRef.current?.files && setLeaderImg(leaderImgRef.current.files[0])
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  const Submit = (e) => {
    if (!logo) setPartyImgErr(true)
    else setPartyImgErr(false)
    if (!leaderImg) setLeaderImgErr(true)
    else setLeaderImgErr(false)
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('logo', logo)
    formData.append('leaderPicture', leaderImg)
    const data = Object.fromEntries(formData)
    if (props.edit) {
      console.log(logo)
      const updateData = {
        description: data.description,
        leader: data.leader,
        leaderPicture: data.leaderPicture,
        logo: data.logo,
        manifesto: data.manifesto,
        name: data.name,
        postalAddress: data.postalAddress,
        president: data.president,
      }
      console.log(updateData)
      dispatch(updateParty(props.editData._id, updateData))
        .then((response) => {
          props.isToast('success', 'updated')
          props.allParties()
          props.closeModal()
        })
        .catch((error) => {
          console.log(error)
          setErrMsg(error.response.data.message + '*')
        })
    } else {
      dispatch(addParty(data))
        .then((response) => {
          props.isToast('success')
          props.allParties()
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
      setForm(props.editData)
      setLeaderImg(props.editData.leaderPicture)
      setLogo(props.editData.logo)
    } else {
      setForm({
        name: '',
        leader: '',
        president: '',
        manifesto: '',
        description: '',
        postalAddress: '',
      })
    }
  }, [])
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
                <div className="inputBox">
                  <label>Party Logo</label>
                  <input
                    className="input d-none"
                    type="file"
                    ref={logoRef}
                    onChange={handleLogoDetail}
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                  />
                  <button
                    onClick={handleLogo}
                    style={{ borderColor: partyImgErr && 'red' }}
                    className="upload"
                  >
                    <span style={{ color: 'grey', marginTop: '5px' }}>
                      {logo ? (
                        props.edit && !logo.name ? (
                          logo
                        ) : (
                          logo.name
                        )
                      ) : (
                        <CIcon icon={cilPlus} size="lg" style={{ marginTop: '5px' }} />
                      )}
                    </span>
                  </button>
                </div>
              </div>
              <div className="inputContainer" style={{ marginTop: '15px' }}>
                <div className="inputBox">
                  <label>Part Leader</label>
                  <input
                    placeholder="Leader Name"
                    name="leader"
                    value={form.leader}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
                <div className="inputBox">
                  <label>Leader Image</label>
                  <input
                    type="file"
                    onChange={handleLeaderImgDetail}
                    ref={leaderImgRef}
                    className="input d-none"
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <button
                    onClick={handleLeaderImg}
                    style={{ borderColor: leaderImgErr && 'red' }}
                    className="upload"
                  >
                    <span style={{ color: 'grey', marginTop: '5px' }}>
                      {leaderImg ? (
                        props.edit && !leaderImg.name ? (
                          leaderImg
                        ) : (
                          leaderImg.name
                        )
                      ) : (
                        <CIcon icon={cilPlus} size="lg" style={{ marginTop: '5px' }} />
                      )}
                    </span>
                  </button>
                </div>
              </div>
              <div className="inputContainer" style={{ marginTop: '15px' }}>
                <div className="inputBox">
                  <label>President</label>
                  <input
                    placeholder="President Name"
                    name="president"
                    value={form.president}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>
              <div className="inputContainer" style={{ marginTop: '15px' }}>
                <div className="inputBox">
                  <label>Manifesto</label>
                  <textarea
                    placeholder="Manifesto"
                    name="manifesto"
                    value={form.manifesto}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>
              <div className="inputContainer" style={{ marginTop: '15px' }}>
                <div className="inputBox">
                  <label>Description</label>
                  <textarea
                    placeholder="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>
              <div className="inputContainer" style={{ marginTop: '15px', marginBottom: '15px' }}>
                <div className="inputBox">
                  <label>Postal Address</label>
                  <textarea
                    placeholder="Address"
                    name="postalAddress"
                    value={form.postalAddress}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>
              {errMsg && (
                <p style={{ fontSize: '14px', color: 'red', marginTop: '-10px' }}>{errMsg}</p>
              )}
              <div className="buttonContainer">
                <button className="mt-3 closeButton" onClick={props.closeModal}>
                  Close
                </button>
                <button type="submit" className="mt-3 button">
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
  allParties: PropTypes.func,
  editData: PropTypes.object,
  id: PropTypes.string,
  edit: PropTypes.bool,
}

export default React.memo(AddParties)
