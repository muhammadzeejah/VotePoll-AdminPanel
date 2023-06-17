import React, { useEffect, useState } from 'react'
import './PartyDetail.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getParty } from 'src/redux/actions'
import { CCard, CCardTitle, CCardBody, CCardSubtitle, CCardText, CSpinner } from '@coreui/react'

const PartyDetail = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)
  const selector = useSelector((state) => state.GetParty)
  const [data, setData] = useState()
  useEffect(() => {
    dispatch(getParty(location.state.id))
      .then((response) => {
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [])
  useEffect(() => {
    if (selector.data) {
      setData(selector.data.party)
    }
  }, [selector])
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
                    <img src={`http://localhost:3000/images/admin/Party/${data.logo}`} alt="" />
                  </div>
                  <div className="info">
                    <CCardTitle>Party Name:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">{data.name}</CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Leader Name:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">{data.leader}</CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>President:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">{data.president}</CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Manifesto:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">{data.manifesto}</CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Description:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.description}
                    </CCardSubtitle>
                  </div>
                  <div className="info">
                    <CCardTitle>Address:</CCardTitle>
                    <CCardSubtitle className="text-medium-emphasis">
                      {data.postalAddress}
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
