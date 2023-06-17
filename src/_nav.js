import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilContact,
  cilAvTimer,
  cilFindInPage,
  cilSitemap,
  cilLocationPin,
  cilLeaf,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavItem,
    name: 'Parties',
    to: '/party',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Candidates',
    to: '/candidate',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Consituency',
    to: '/consituency',
    icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Elections',
    to: '/election',
    icon: <CIcon icon={cilLeaf} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Result',
    to: '/result',
    icon: <CIcon icon={cilFindInPage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'National Parties',
        to: '/result/nationalPartiesResult',
      },
      {
        component: CNavItem,
        name: 'Provincial Parties',
        to: '/result/provincialPartiesResult',
      },
      {
        component: CNavItem,
        name: 'Local Body Parties',
        to: '/result/localBodyPartiesResult',
      },
      {
        component: CNavItem,
        name: 'National Candidates',
        to: '/result/nationalCandidatesResult',
      },
      {
        component: CNavItem,
        name: 'Provincial Candidates',
        to: '/result/provincialCandidatesResult',
      },
      {
        component: CNavItem,
        name: 'Local Body Candidates',
        to: '/result/localBodyCandidateResult',
      },
    ],
  },
]

export default _nav
