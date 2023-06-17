import React, { Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import DefaultLayout from 'src/layout/DefaultLayout'
import Login from 'src/views/pages/login/Login'
import ResetPassword from 'src/views/pages/login/ResetPassword'
import Register from 'src/views/pages/register/Register'
import Page404 from 'src/views/pages/page404/Page404'
import Page500 from 'src/views/pages/page500/Page500'

const Main = () => {
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      {/* <Suspense fallback={loading}> */}
      <Routes>
        <Route exact path="/login" name="Login Page" element={<Login />} />
        <Route exact path="/reset-password/:id" name="Login Page" element={<ResetPassword />} />
        <Route exact path="/register" name="Register Page" element={<Register />} />
        <Route exact path="/404" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
        <Route path="*" name="Home" element={<DefaultLayout />} />
      </Routes>
      {/* </Suspense> */}
    </div>
  )
}

export default Main
