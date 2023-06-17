import React, { useEffect, useState } from 'react'
import './CandidateDetail.css'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCandidate } from 'src/redux/actions'
import { CCard, CCardTitle, CCardBody, CCardSubtitle, CCardText, CSpinner } from '@coreui/react'

const PartyDetail = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState()
  useEffect(() => {
    dispatch(getCandidate(location.state.id))
      .then((response) => {
        setLoading(false)
        console.log(response.data.data.candidate)
        setData(response.data.data.candidate)
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [])
  return (
    <div className="detailContainer">
      <CCard style={{ minWidth: '25rem' }}>
        <CCardBody>
          {isLoading ? (
            <div className="spinner">
              <CSpinner color="dark" variant="grow" />
              <CSpinner color="dark" variant="grow" />
              <CSpinner color="dark" variant="grow" />
            </div>
          ) : (
            <CCardText>
              {data && (
                <div className="detailBox">
                  <div className="partyLogo">
                    <img
                      src={`http://localhost:3000/images/web/Citizen/${data.citizen.photo}`}
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <CCardTitle>Name:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.citizen.firstName} {data.citizen.lastName}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Father Name:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.citizen.fatherName}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Gender:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.citizen.gender}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>CNIC:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.citizen.cnic}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Cell #:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.citizen.cell}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Date of Birth:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.citizen.dob.split('T')[0]}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Party:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.party.name}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Province:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.citizen.province}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Division:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.citizen.division}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>District:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.citizen.district}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Tehsil:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.citizen.tehsil}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>District:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.citizen.district}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Consituencies:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis UCs">
                      {data.consituencies.map((consituency, index) => {
                        return (
                          <span key={index}>
                            &nbsp;{consituency.halka}
                            {data.consituencies.length - 1 !== index && ','}
                          </span>
                        )
                      })}
                    </CCardSubtitle>
                  </div>
                </div>
              )}
            </CCardText>
          )}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default PartyDetail
