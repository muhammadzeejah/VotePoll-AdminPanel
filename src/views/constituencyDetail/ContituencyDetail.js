import React, { useEffect, useState } from 'react'
import './ContituencyDetail.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getConstituency, getParty } from 'src/redux/actions'
import { CCard, CCardTitle, CCardBody, CCardSubtitle, CCardText, CSpinner } from '@coreui/react'

const PartyDetail = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState()
  useEffect(() => {
    dispatch(getConstituency(location.state.id))
      .then((response) => {
        setLoading(false)
        setData(response.data.data.consituency)
        console.log(response.data.data.consituency)
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
                  <div className="info">
                    <CCardTitle>Name:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">{data.name}</CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Consituency #:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">{data.halka}</CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Seat:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">{data.seatType}</CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Province:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">{data.province}</CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Division:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">{data.division}</CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Union Councils:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis UCs">
                      {data.unionCouncils.map((uc, index) => {
                        return (
                          <span key={index}>
                            &nbsp;{uc}
                            {data.unionCouncils.length - 1 !== index && ','}
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
