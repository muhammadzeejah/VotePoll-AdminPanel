import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { BsKey, BsPersonVcard } from 'react-icons/bs'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import './Register.css'
import { useDispatch } from 'react-redux'
import { register } from 'src/redux/actions'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cnic, setCnic] = useState('')
  const [cnicErr, setCnicErr] = useState('Please enter valid CNIC.')
  const [invalidCnic, setInvalidCnic] = useState(false)
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('Please enter valid Email.')
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState('Password should be ateast 8 characters.')
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('Password doest not match')
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false)
  const [invalidKey, setInvalidKey] = useState(false)
  const [key, setKey] = useState('')
  const [keyErr, setKeyErr] = useState('Please enter valid Secret Key.')
  const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  const Submit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    dispatch(register(data))
      .then((response) => {
        navigate('/login')
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }
  const onChangeCnic = (e) => {
    if (e.target.value.length > 13) return
    if (e.target.value.length < 13) setInvalidCnic(true)
    else setInvalidCnic(false)
    setCnic(e.target.value)
  }
  const onChangeToken = (e) => {
    if (e.target.value.length > 8) return
    if (e.target.value.length < 8) setInvalidKey(true)
    else setInvalidKey(false)
    setKey(e.target.value)
  }
  const onChangePassword = (e) => {
    if (e.target.value.length > 8) return
    if (e.target.value.length < 8) setInvalidPassword(true)
    else setInvalidPassword(false)
    setPassword(e.target.value)
  }
  const onChangeConfirmPassword = (e) => {
    if (e.target.value.length > 8) return
    if (!password) return
    if (e.target.value !== password) setInvalidConfirmPassword(true)
    else setInvalidConfirmPassword(false)
    setConfirmPassword(e.target.value)
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
    if (!e.target.value) setInvalidEmail(true)
    else setInvalidEmail(false)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={Submit}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <BsPersonVcard color="grey" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="CNIC"
                      name="cnic"
                      type="number"
                      value={cnic}
                      autoComplete="cnic"
                      feedbackInvalid={cnicErr}
                      invalid={invalidCnic}
                      required
                      onChange={onChangeCnic}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="User Name"
                      name="userName"
                      autoComplete="username"
                      feedbackInvalid={emailErr}
                      invalid={invalidEmail}
                      value={email}
                      onChange={onChangeEmail}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <BsKey />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="ECP Secret Key"
                      name="ecpSecretKey"
                      autoComplete="ecpSecretKey"
                      type="number"
                      feedbackInvalid={keyErr}
                      required
                      invalid={invalidKey}
                      value={key}
                      onChange={onChangeToken}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      autoComplete="new-password"
                      feedbackInvalid={passwordErr}
                      required
                      invalid={invalidPassword}
                      value={password}
                      onChange={onChangePassword}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      name="passwordConfirm"
                      autoComplete="new-password"
                      feedbackInvalid={confirmPasswordErr}
                      required
                      invalid={invalidConfirmPassword}
                      value={confirmPassword}
                      onChange={onChangeConfirmPassword}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="button"
                      disabled={
                        invalidPassword ||
                        invalidEmail ||
                        invalidCnic ||
                        invalidConfirmPassword ||
                        invalidKey
                      }
                    >
                      Create Account
                    </button>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  )
}

export default Register
