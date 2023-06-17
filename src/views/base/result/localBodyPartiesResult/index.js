import {
  CTable,
  CTableHead,
  CTableRow,
  CTableDataCell,
  CTableHeaderCell,
  CTableBody,
  CSpinner,
  CPaginationItem,
  CPagination,
  CButton,
} from '@coreui/react'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import '../result.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ethers } from 'ethers'
import abi from '../../../../components/contract/contract'
import CIcon from '@coreui/icons-react'
import { cilChevronBottom } from '@coreui/icons'

const PartiesResults = () => {
  const [dropdown, setDropdown] = useState(false)
  const [seatType, setSeatType] = useState('Chairman')
  const [search, setSearch] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [state, setState] = React.useState({
    provider: null,
    signer: null,
    contract: null,
  })
  const [account, setAccount] = React.useState('None')
  const [resultData, setResultData] = useState([])
  const [finalResultData, setFinalResultData] = useState([])
  const pageCount = Math.ceil(finalResultData.length / 10)
  const [currentPage, setCurrentPage] = useState(0)
  const dropdownRef = useRef()
  const [tempResultArr, setTempResultArr] = useState([
    {
      electionType: 'Local Body',
      halka: 'UC-20',
      name: 'abc',
      party: 'PTI',
      seatType: 'Councellor',
      voteCount: 10,
    },
    {
      electionType: 'Local Body',
      halka: 'UC-20',
      name: 'xyz',
      party: 'PMLN',
      seatType: 'Chairman',
      voteCount: 3,
    },
    {
      electionType: 'Local Body',
      halka: 'UC-20',
      name: 'asd',
      party: 'PPP',
      seatType: 'National Assembly',
      voteCount: 6,
    },
    {
      electionType: 'National Assembly',
      halka: 'NA-05',
      name: 'ert',
      party: 'PMLN',
      seatType: 'National Assembly',
      voteCount: 20,
    },
    {
      electionType: 'National Assembly',
      halka: 'NA-05',
      name: 'qwe',
      party: 'PTI',
      seatType: 'National Assembly',
      voteCount: 12,
    },
    {
      electionType: 'National Assembly',
      halka: 'NA-05',
      name: 'iuo',
      party: 'PPP',
      seatType: 'National Assembly',
      voteCount: 9,
    },
    {
      electionType: 'National Assembly',
      halka: 'NA-05',
      name: 'qhy',
      party: 'JI',
      seatType: 'National Assembly',
      voteCount: 17,
    },
    {
      electionType: 'Local Body',
      halka: 'UC-21',
      name: 'gyh',
      party: 'PPP',
      seatType: 'Councellor',
      voteCount: 19,
    },
    {
      electionType: 'Local Body',
      halka: 'UC-21',
      name: 'gyh',
      party: 'PPP',
      seatType: 'Chairman',
      voteCount: 13,
    },
    {
      electionType: 'Local Body',
      halka: 'UC-21',
      name: 'xne',
      party: 'PTI',
      seatType: 'Chairman',
      voteCount: 31,
    },
    {
      electionType: 'Local Body',
      halka: 'UC-20',
      name: 'uty',
      party: 'PTI',
      seatType: 'Councellor',
      voteCount: 10,
    },
  ])
  const func = (province) => {
    if (resultData) {
      const filterElectionType = resultData.filter((ele) => {
        return ele.seatType === province
      })
      const filteredArr = []
      let max = 0,
        winningParty,
        voteCount = 0
      const VCarr = []

      // vote count
      for (let i = 0; i < filterElectionType.length; i++) {
        let party
        for (let j = 0; j < filterElectionType.length; j++) {
          const vc = Number(ethers.utils.formatEther(filterElectionType[j].voteCount))
            .toString()
            .split('e')[0]
          if (filterElectionType[i].party === filterElectionType[j].party) {
            party = filterElectionType[j].party
            // voteCount += filterElectionType[j].voteCount
            voteCount += Number(vc)
          }
        }
        VCarr.push({ party: party, voteCount: voteCount })
        voteCount = 0
      }
      const voteIds = VCarr.map((o) => o.party)
      const removeDuplicateVoteCount = VCarr.filter(
        ({ party }, index) => !voteIds.includes(party, index + 1),
      )

      //  seat count
      for (let i = 0; i < filterElectionType.length; i++) {
        for (let j = 0; j < filterElectionType.length; j++) {
          const vc = Number(ethers.utils.formatEther(filterElectionType[j].voteCount))
            .toString()
            .split('e')[0]
          if (filterElectionType[i].halka === filterElectionType[j].halka) {
            if (max < filterElectionType[j].voteCount) {
              // max = filterElectionType[j].voteCount
              max = Number(vc)
              winningParty = {
                party: filterElectionType[j].party,
                halka: filterElectionType[j].halka,
              }
            }
          }
        }
        if (winningParty) {
          filteredArr.push(winningParty)
        }
        max = 0
      }

      // Winning Party with halka
      const seatIds = filteredArr.map((o) => o.halka)
      const removeDuplicatePartiesSeats = filteredArr.filter(
        ({ halka }, index) => !seatIds.includes(halka, index + 1),
      )

      const result = []
      for (let i = 0; i < removeDuplicatePartiesSeats.length; i++) {
        let seatCount = 0,
          partyName
        const halka = []
        for (let j = 0; j < removeDuplicatePartiesSeats.length; j++) {
          if (removeDuplicatePartiesSeats[i].party === removeDuplicatePartiesSeats[j].party) {
            seatCount += 1
            halka.push(removeDuplicatePartiesSeats[j].halka)
            partyName = removeDuplicatePartiesSeats[j].party
          }
        }
        result.push({ party: partyName, halka: halka, noOfSeats: seatCount })
      }

      const seatCountIds = result.map((o) => o.party)
      const removeDuplicateSeatCount = result.filter(
        ({ party }, index) => !seatCountIds.includes(party, index + 1),
      )
      const finalResult = []
      for (let i = 0; i < removeDuplicateVoteCount.length; i++) {
        for (let j = 0; j < removeDuplicateSeatCount.length; j++) {
          const vc = Number(ethers.utils.formatEther(removeDuplicateVoteCount[i].voteCount))
            .toString()
            .split('e')[0]
          if (removeDuplicateVoteCount[i].party === removeDuplicateSeatCount[j].party) {
            finalResult.push({
              party: removeDuplicateSeatCount[j].party,
              noOfSeats: removeDuplicateSeatCount[j].noOfSeats,
              // voteCount: filterElectionType[j].voteCount,
              voteCount: Number(vc),
            })
          }
        }
      }
      console.log(finalResult, 'finalResult')
      setFinalResultData(finalResult)
    }
  }

  useEffect(() => {
    func('Chairman')
  }, [resultData])
  const paginationNum = []
  const paginateItems = () => {
    for (let i = 1; i <= pageCount; i++) {
      paginationNum.push(i)
    }
  }
  paginateItems()
  const ChangePage = (index) => {
    setCurrentPage(index)
  }
  const closeSelectBox = (event) => {
    if (!dropdownRef.current.contains(event.target)) {
      setDropdown(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', closeSelectBox)
    return () => {
      document.removeEventListener('click', closeSelectBox)
    }
  }, [])
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = '0x8D660640933f573554f24651e812f1B02675BAfb'
      const contractABI = abi.abi
      try {
        const { ethereum } = window

        if (ethereum) {
          const account = await ethereum.request({
            method: 'eth_requestAccounts',
          })

          window.ethereum.on('chainChanged', () => {
            window.location.reload()
          })

          window.ethereum.on('accountsChanged', () => {
            window.location.reload()
          })

          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, contractABI, signer)
          setAccount(account)
          setState({ provider, signer, contract })
        } else {
          alert('Please install metamask')
        }
      } catch (error) {
        console.log(error)
      }
    }
    connectWallet()
    console.log(state)
  }, [])
  useEffect(() => {
    resultHandler()
    getTotalVotes()
  }, [state])
  const resultHandler = async () => {
    if (state.contract) {
      await state.contract
        .eachCandidateVote()
        .then((response) => {
          console.log(response, 'result')
          setResultData(response)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const getTotalVotes = async () => {
    if (state.contract) {
      await state.contract
        .getTotalVotes()
        .then((response) => {
          // console.log(
          //   Number(ethers.utils.formatEther(response)).toString().split('e')[0],
          //   'getTotalVotes',
          // )
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const onReload = () => {
    resultHandler()
  }
  return (
    <>
      <div className="candidate-container">
        <div className="candidate-box">
          <div className="dropdownContainer" ref={dropdownRef}>
            <div className="searchBar">
              <div>
                <div
                  className="resultDropdownBox"
                  style={{ maxWidth: '125px' }}
                  onClick={() => setDropdown(!dropdown)}
                >
                  <div className="selectedText">
                    <p className="dropdownText">{seatType}</p>
                  </div>
                  <div className="ArrowIcon">
                    <CIcon icon={cilChevronBottom} size="sm" className="me-2 editIcon" />
                  </div>
                </div>
                {dropdown && (
                  <div className="resultSelectboxContainer">
                    <div className="SelectBox">
                      <p
                        className="Text"
                        onClick={() => (
                          setSeatType('Chairman'), setDropdown(!dropdown), func('Chairman')
                        )}
                      >
                        Chairman
                      </p>
                      <p
                        className="Text"
                        onClick={() => (
                          setSeatType('Councellor'), setDropdown(!dropdown), func('Councellor')
                        )}
                      >
                        Councellor
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <input
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  className="resultSearch"
                />
              </div>
            </div>
          </div>
          <CButton color="dark" onClick={onReload} style={{ marginRight: '10px' }}>
            Reload Result
          </CButton>
        </div>
        {!isLoading ? (
          <CTableBody className="spinner">
            <CSpinner color="dark" variant="grow" />
            <CSpinner color="dark" variant="grow" />
            <CSpinner color="dark" variant="grow" />
          </CTableBody>
        ) : (
          <>
            <div className="w-100">
              <CTable bordered striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Party&nbsp;Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">No&nbsp;of&nbsp;Seats</CTableHeaderCell>
                    <CTableHeaderCell scope="col">No&nbsp;of&nbsp;Votes</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                {finalResultData && (
                  <CTableBody>
                    {finalResultData
                      .filter((ele) => {
                        return search.toLowerCase() === ''
                          ? ele
                          : ele.party.toLowerCase().includes(search)
                      })
                      .map((result, index) => {
                        return (
                          <CTableRow key={index} style={{ cursor: 'pointer' }}>
                            <CTableDataCell>{result.party}</CTableDataCell>
                            <CTableDataCell>{result.noOfSeats}</CTableDataCell>
                            <CTableDataCell>{result.voteCount}</CTableDataCell>
                            {/* <CTableDataCell className="icons" onClick={(e) => e.stopPropagation()}>
                                <CIcon
                                  icon={cilColorBorder}
                                  className="me-2 editIcon"
                                  onClick={() => onEdit(candidate)}
                                />
                                <CIcon
                                  icon={cilDelete}
                                  className="me-2 deleteIcon"
                                  onClick={() => onDelete(candidate._id)}
                                />
                              </CTableDataCell> */}
                          </CTableRow>
                        )
                      })}
                  </CTableBody>
                )}
              </CTable>
            </div>
            <div className="mt-3">
              <CPagination aria-label="Page navigation example" style={{ cursor: 'pointer' }}>
                <CPaginationItem
                  aria-label="Previous"
                  disabled={currentPage === 0}
                  className={currentPage === 0 && 'disabledPagination'}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>
                {paginationNum.map((ele, index) => {
                  return (
                    <CPaginationItem
                      key={index}
                      active={currentPage === index}
                      onClick={() => ChangePage(index)}
                    >
                      {ele}
                    </CPaginationItem>
                  )
                })}
                <CPaginationItem
                  aria-label="Next"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === paginationNum.length - 1}
                  className={currentPage === paginationNum.length - 1 && 'disabledPagination'}
                >
                  <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
              </CPagination>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  )
}

export default PartiesResults
