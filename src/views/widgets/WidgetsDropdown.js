import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import '../dashboard/Dashboard.css'
import { useNavigate } from 'react-router-dom'

const WidgetsDropdown = () => {
  const navigate = useNavigate()
  const onNavigate = (route) => {
    navigate(route)
  }
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          onClick={() => onNavigate('/party')}
          className="mb-4 dashboardCard"
          color="primary"
          value={<>Visit Parties</>}
          title="Parties"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          onClick={() => onNavigate('/consituency')}
          className="mb-4 dashboardCard"
          color="info"
          value={<>Visit Consituencies</>}
          title="Consituencies"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          onClick={() => onNavigate('/candidate')}
          className="mb-4 dashboardCard"
          color="warning"
          value={<>Visit Candidates</>}
          title="Candidates"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          onClick={() => onNavigate('/election')}
          className="mb-4 dashboardCard"
          color="danger"
          value={<>Visit Elections</>}
          title="Elections"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 dashboardCard"
          color="info"
          value={<>Visit Result</>}
          title="Result"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => navigate('/result/nationalPartiesResult')}>
                  National Parties
                </CDropdownItem>
                <CDropdownItem onClick={() => navigate('/result/provincialPartiesResult')}>
                  Provincial Parties
                </CDropdownItem>
                <CDropdownItem onClick={() => navigate('/result/localBodyPartiesResult')}>
                  LOCAL Body Parties
                </CDropdownItem>
                <CDropdownItem onClick={() => navigate('/result/nationalCandidatesResult')}>
                  National Assembly Candidates
                </CDropdownItem>
                <CDropdownItem onClick={() => navigate('/result/provincialCandidatesResult')}>
                  Provincial Assembly Candidates
                </CDropdownItem>
                <CDropdownItem onClick={() => navigate('/result/localBodyCandidateResult')}>
                  LOCAL Body Candidates
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
