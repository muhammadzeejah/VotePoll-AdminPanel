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

const ProvincialCandidatesResult = () => {
  const [search, setSearch] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [state, setState] = React.useState({
    provider: null,
    signer: null,
    contract: null,
  })
  const [account, setAccount] = React.useState('None')
  const [result, setResult] = useState([])
  const [resultData, setResultData] = useState([])
  const [dropdown, setDropdown] = useState(false)
  const [searchType, setSearchType] = useState('Chairman')
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
  const func = () => {
    if (result) {
      console.log(searchType, 'searchType')
      const filterElectionType = result.filter((ele) => {
        return ele.seatType === searchType
      })
      console.log(filterElectionType, 'filterElectionType')
      const tempResult = []
      for (let i = 0; i < filterElectionType.length; i++) {
        const vc = Number(ethers.utils.formatEther(filterElectionType[i].voteCount))
          .toString()
          .split('e')[0]
        tempResult.push({
          name: filterElectionType[i].name,
          part: filterElectionType[i].party,
          halka: filterElectionType[i].halka,
          // voteCount: filterElectionType[i].voteCount,
          voteCount: Number(vc),
        })
      }
      const sortedArray = tempResult.sort((a, b) => b.voteCount - a.voteCount)
      setResultData(sortedArray)
    }
  }
  // useEffect(() => {
  //   func()
  // }, [searchType])
  useEffect(() => {
    func()
  }, [result, searchType])

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
  const pageCount = Math.ceil(4 / 10)
  const [currentPage, setCurrentPage] = useState(0)
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
  }, [state])
  const resultHandler = async () => {
    if (state.contract) {
      await state.contract
        .eachCandidateVote()
        .then((response) => {
          setResult(response)
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
                  style={{ width: '120px' }}
                  onClick={() => setDropdown(!dropdown)}
                >
                  <div className="selectedText">
                    <p className="dropdownText">{searchType}</p>
                  </div>
                  <div className="ArrowIcon">
                    <CIcon icon={cilChevronBottom} size="sm" className="me-2 editIcon" />
                  </div>
                </div>
                {dropdown && (
                  <div className="resultSelectboxContainer" style={{ width: '190px' }}>
                    <div className="SelectBox">
                      <p
                        className="Text"
                        onClick={() => (setSearchType('Chairman'), setDropdown(!dropdown))}
                      >
                        Chairman
                      </p>
                      <p
                        className="Text"
                        onClick={() => (setSearchType('Councellor'), setDropdown(!dropdown))}
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
            Reload
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
                    <CTableHeaderCell scope="col">Candidate&nbsp;Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Party</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Consituency</CTableHeaderCell>
                    <CTableHeaderCell scope="col">No&nbsp;of&nbsp;Votes</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                {resultData && (
                  <CTableBody>
                    {resultData
                      .filter((ele) => {
                        return search.toLowerCase() === ''
                          ? ele
                          : ele.halka.toLowerCase().includes(search)
                      })
                      .map((result, index) => {
                        return (
                          <CTableRow key={index} style={{ cursor: 'pointer' }}>
                            <CTableDataCell>{result.name}</CTableDataCell>
                            <CTableDataCell>{result.part}</CTableDataCell>
                            <CTableDataCell>{result.halka}</CTableDataCell>
                            <CTableDataCell>
                              {
                                Number(ethers.utils.formatEther(result.voteCount))
                                  .toString()
                                  .split('e')[0]
                              }
                            </CTableDataCell>
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

export default ProvincialCandidatesResult
