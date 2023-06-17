import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import logo from 'src/assets/images/logo.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { sidebar } from 'src/redux/actions'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.changeState)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      // onVisibleChange={(visible) => {
      //   dispatch({ type: 'set', sidebarShow: visible })
      // }}

      // onVisibleChange={(visible) => dispatch(sidebar(visible))}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={logo} alt="Logo" />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(sidebar(!sidebarShow))}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
