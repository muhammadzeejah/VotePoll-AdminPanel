import React, { useEffect, useState } from 'react'
import './ElectionDetail.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getConstituency, getElection, getParty } from 'src/redux/actions'
import { CCard, CCardTitle, CCardBody, CCardSubtitle, CCardText, CSpinner } from '@coreui/react'

const PartyDetail = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState()
  useEffect(() => {
    dispatch(getElection(location.state.id))
      .then((response) => {
        setLoading(false)
        setData(response.data.data.election)
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
                    <CCardTitle>Start Date:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {/* {data.startTime.split('T')[0]},&nbsp;
                      {start.split('.')[0]} */}
                      {new Date(data.startTime).toString().split('G')[0]}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>End Date:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {/* {data.endTime.split('T')[0]},&nbsp;
                      {end.split('.')[0]} */}
                      {new Date(data.endTime).toString().split('G')[0]}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Type:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">{data.type}</CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Status:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {new Date() > new Date(data.startTime) &&
                        new Date() < new Date(data.endTime) &&
                        'Open'}
                      {new Date() < new Date(data.startTime) && 'Pending'}
                      {new Date() > new Date(data.endTime) && 'Close'}
                    </CCardSubtitle>
                  </div>
                  {data.type === 'PROVINCIAl' ||
                    (data.type === 'LOCAL' && (
                      <div className="info">
                        <CCardTitle>Areas:</CCardTitle>
                        <CCardSubtitle className="text-medium-emphasis UCs">
                          {data.area.map((area, index) => {
                            return (
                              <span key={index}>
                                &nbsp;{area}
                                {data.area.length - 1 !== index && ','}
                              </span>
                            )
                          })}
                        </CCardSubtitle>
                      </div>
                    ))}
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
