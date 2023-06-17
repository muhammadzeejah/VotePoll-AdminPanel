import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import { cilLockLocked } from '@coreui/icons'
import './Login.css'
import { useDispatch } from 'react-redux'
import { resetPassword } from 'src/redux/actions'
import 'react-toastify/dist/ReactToastify.css'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  console.log(params.id.split('.')[0], 'id')
  const [confirm, setConfirm] = useState()
  const [password, setPassword] = useState()
  const [passwordErr, setPasswordErr] = useState('Password should be ateast 8 characters.')
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('Password doest not match')
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false)
  const Submit = (e) => {
    e.preventDefault()
    const data = {
      passwordConfirm: confirm,
      password: password,
    }
    dispatch(resetPassword(params.id.split('.')[0], data)).then((response) => {
      navigate('/login')
    })
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
    setConfirm(e.target.value)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer className="resetContainer">
        <CRow className="justify-content-center">
          <CCol lg={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={Submit}>
                    <h2>Reset Password</h2>
                    <p className="text-medium-emphasis">Please Fill In Required Fields</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChangePassword}
                        required
                        invalid={invalidPassword}
                        feedbackInvalid={passwordErr}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Confirm Password"
                        value={confirm}
                        onChange={onChangeConfirmPassword}
                        required
                        invalid={invalidConfirmPassword}
                        feedbackInvalid={confirmPasswordErr}
                      />
                    </CInputGroup>
                    <CRow>
                      <div className="innerBox">
                        <CCol xs={6}>
                          <button
                            type="submit"
                            className="px-4 button"
                            disabled={invalidPassword || invalidConfirmPassword}
                          >
                            Submit
                          </button>
                        </CCol>
                      </div>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword
