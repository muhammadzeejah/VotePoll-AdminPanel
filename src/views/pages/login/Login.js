import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import './Login.css'
import { BsPersonVcard } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { login } from 'src/redux/actions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ForgetPassword from './ForgetPassword'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cnic, setCnic] = useState()
  const [cnicErr, setCnicErr] = useState('Please enter valid CNIC.')
  const [invalidCnic, setInvalidCnic] = useState(false)
  const [userName, setUsername] = useState()
  const [emailErr, setEmailErr] = useState('Please enter valid Username.')
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [password, setPassword] = useState()
  const [passwordErr, setPasswordErr] = useState('Password should be ateast 8 characters.')
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [forgetPassword, setForgetPassword] = useState(false)
  const isToast = () => {
    toast.success(`Check Your Email!`)
  }
  const Submit = (e) => {
    e.preventDefault()
    const data = {
      cnic: cnic,
      userName: userName,
      password: password,
    }
    dispatch(login(data))
      .then((response) => {
        toast.success(`Logged In Successfully!`)
        if (localStorage.getItem('token')) {
          navigate('/')
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }

  const closeModal = () => {
    setForgetPassword(!forgetPassword)
  }

  const onChangeEmail = (e) => {
    if (!e.target.value) setInvalidEmail(true)
    else setInvalidEmail(false)
    setUsername(e.target.value)
  }

  const onChangeCnic = (e) => {
    if (e.target.value.length > 13) return
    if (e.target.value.length < 13) setInvalidCnic(true)
    else setInvalidCnic(false)
    setCnic(e.target.value)
  }

  const onChangePassword = (e) => {
    if (e.target.value.length > 8) return
    if (e.target.value.length < 8) setInvalidPassword(true)
    else setInvalidPassword(false)
    setPassword(e.target.value)
  }
  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol lg={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={Submit}>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          value={userName}
                          onChange={onChangeEmail}
                          name="userName"
                          autoComplete="username"
                          feedbackInvalid={emailErr}
                          invalid={invalidEmail}
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <BsPersonVcard color="grey" />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="CNIC"
                          value={cnic}
                          type="number"
                          onChange={onChangeCnic}
                          name="cnic"
                          autoComplete="cnic"
                          feedbackInvalid={cnicErr}
                          invalid={invalidCnic}
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          value={password}
                          onChange={onChangePassword}
                          feedbackInvalid={passwordErr}
                          invalid={invalidPassword}
                          required
                        />
                      </CInputGroup>
                      <CRow>
                        <div className="innerBox">
                          <CCol xs={6}>
                            <button
                              type="submit"
                              className="px-4 button"
                              disabled={invalidPassword || invalidEmail || invalidCnic}
                            >
                              Login
                            </button>
                          </CCol>
                          <CCol xs={6} className="text-right d-flex">
                            <CButton color="link" className="px-0 registerLink">
                              <span style={{ color: '#3c4b64' }}>Register</span>
                            </CButton>
                            <CButton color="link" className="px-0">
                              <span style={{ color: '#3c4b64' }} onClick={closeModal}>
                                Forgot password?
                              </span>
                            </CButton>
                          </CCol>
                        </div>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white py-5 registerBox">
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton className="mt-3 button">Register Now!</CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
        <ToastContainer />
      </div>
      {forgetPassword ? <ForgetPassword closeModal={closeModal} isToast={isToast} /> : null}
    </>
  )
}

export default Login
