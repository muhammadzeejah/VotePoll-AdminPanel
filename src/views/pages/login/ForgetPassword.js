import { cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { BsKey, BsPersonVcard } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { forgetPassword } from 'src/redux/actions'
import PropTypes from 'prop-types'

const ForgetPassword = (props) => {
  const [cnic, setCnic] = useState()
  const [cnicErr, setCnicErr] = useState('Please enter valid CNIC.')
  const [invalidCnic, setInvalidCnic] = useState(false)
  const [token, setToken] = useState()
  const [tokenErr, setTokenErr] = useState('Please enter valid Email.')
  const [invalidToken, setInvalidToken] = useState(false)
  const [email, setEmail] = useState()
  const [emailErr, setEmailErr] = useState('Please enter valid Email.')
  const [invalidEmail, setInvalidEmail] = useState(false)
  const dispatch = useDispatch()
  const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

  const Submit = (e) => {
    e.preventDefault()
    const data = {
      cnic: cnic,
      email: email,
      token: token,
    }
    dispatch(forgetPassword(data)).then((response) => {
      props.isToast()
      props.closeModal()
    })
  }
  const onChangeEmail = (e) => {
    if (!regex.test(e.target.value)) setInvalidEmail(true)
    else setInvalidEmail(false)
    setEmail(e.target.value)
  }

  const onChangeCnic = (e) => {
    if (e.target.value.length > 13) return
    if (e.target.value.length < 13) setInvalidCnic(true)
    else setInvalidCnic(false)
    setCnic(e.target.value)
  }
  const onChangeToken = (e) => {
    if (e.target.value.length > 8) return
    if (e.target.value.length < 8) setInvalidToken(true)
    else setInvalidToken(false)
    setToken(e.target.value)
  }
  return (
    <div>
      <div className="addPartyContainer">
        <div className="backdrop" onClick={props.closeModal} />
        {/* <div className="crossIcon" onClick={props.closeModal}>
          &#9587;
        </div> */}
        <div className="addPartyBox">
          <CForm onSubmit={Submit}>
            <h3>Forget Password</h3>
            <p className="text-small-emphasis">Please fill in required information</p>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={onChangeEmail}
                required
                invalid={invalidEmail}
                feedbackInvalid={emailErr}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <BsPersonVcard color="grey" />
              </CInputGroupText>
              <CFormInput
                placeholder="CNIC"
                type="number"
                value={cnic}
                onChange={onChangeCnic}
                required
                invalid={invalidCnic}
                feedbackInvalid={cnicErr}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <BsKey />
              </CInputGroupText>
              <CFormInput
                placeholder="Secret Key"
                value={token}
                required
                onChange={onChangeToken}
                invalid={invalidToken}
                feedbackInvalid={tokenErr}
              />
            </CInputGroup>
            <div className="buttonContainer">
              <button className="mt-3 closeButton" onClick={props.closeModal}>
                Close
              </button>
              <button
                type="submit"
                className="mt-3 button"
                disabled={invalidCnic || invalidEmail || invalidToken}
              >
                Submit
              </button>
            </div>
          </CForm>
        </div>
      </div>
    </div>
  )
}
ForgetPassword.propTypes = {
  closeModal: PropTypes.func,
  isToast: PropTypes.func,
}

export default React.memo(ForgetPassword)
