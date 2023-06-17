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
  const [tempResultArr, setTempResultArr] = useState([
    {
      electionType: 'National Assembly',
      halka: 'NA-03',
      name: 'abc',
      party: 'PTI',
      searchType: 'National Assembly',
      voteCount: 10,
    },
    {
      electionType: 'National Assembly',
      halka: 'NA-03',
      name: 'asd',
      party: 'PPP',
      searchType: 'National Assembly',
      voteCount: 6,
    },
    {
      electionType: 'Provincial Assembly',
      halka: 'PP-10',
      name: 'uty',
      party: 'PTI',
      searchType: 'Provincial Assembly',
      voteCount: 10,
    },
    {
      electionType: 'National Assembly',
      halka: 'NA-05',
      name: 'ert',
      party: 'PMLN',
      searchType: 'National Assembly',
      voteCount: 20,
    },
    {
      electionType: 'National Assembly',
      halka: 'NA-10',
      name: 'qhy',
      party: 'JI',
      searchType: 'National Assembly',
      voteCount: 17,
    },
    {
      electionType: 'National Assembly',
      halka: 'NA-05',
      name: 'qwe',
      party: 'PTI',
      searchType: 'National Assembly',
      voteCount: 12,
    },
    {
      electionType: 'National Assembly',
      halka: 'NA-03',
      name: 'xyz',
      party: 'PMLN',
      searchType: 'National Assembly',
      voteCount: 3,
    },
    {
      electionType: 'National Assembly',
      halka: 'NA-05',
      name: 'iuo',
      party: 'PPP',
      searchType: 'National Assembly',
      voteCount: 9,
    },
    {
      electionType: 'Provincial Assembly',
      halka: 'PP-10',
      name: 'gyh',
      party: 'PTI',
      searchType: 'Provincial Assembly',
      voteCount: 13,
    },
    {
      electionType: 'National Assembly',
      halka: 'NA-10',
      name: 'qhy',
      party: 'PTI',
      searchType: 'National Assembly',
      voteCount: 50,
    },
    {
      electionType: 'National Assembly',
      halka: 'NA-05',
      name: 'qhy',
      party: 'JI',
      searchType: 'National Assembly',
      voteCount: 17,
    },
    {
      electionType: 'Provincial Assembly',
      halka: 'PP-10',
      name: 'xne',
      party: 'PTI',
      searchType: 'Provincial Assembly',
      voteCount: 31,
    },
    {
      electionType: 'National Assembly',
      halka: 'NA-10',
      name: 'qhy',
      party: 'PPP',
      searchType: 'National Assembly',
      voteCount: 25,
    },
  ])
  const func = () => {
    if (resultData) {
      console.log(resultData)
      const filterElectionType = resultData.filter((ele) => {
        return ele.seatType === 'MNA'
      })
      console.log(filterElectionType)
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
      console.log(VCarr)
      // seat count
      for (let i = 0; i < filterElectionType.length; i++) {
        for (let j = 0; j < filterElectionType.length; j++) {
          const vc = Number(ethers.utils.formatEther(filterElectionType[j].voteCount))
            .toString()
            .split('e')[0]
          if (filterElectionType[i].halka === filterElectionType[j].halka) {
            if (max < Number(vc)) {
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
      const removeDuplicate = filteredArr.filter(
        ({ halka }, index) => !seatIds.includes(halka, index + 1),
      )
      console.log(removeDuplicate, 'removeDuplicate')
      // party with no. of seats
      const result = Object.values(
        removeDuplicate.reduce((r, e) => {
          let k = `${e.party}`
          if (!r[k]) r[k] = { ...e, noOfSeats: 1 }
          else r[k].noOfSeats += 1
          return r
        }, {}),
      )
      // console.log(result, 'result')
      const finalResult = []
      for (let i = 0; i < removeDuplicateVoteCount.length; i++) {
        for (let j = 0; j < result.length; j++) {
          const vc = Number(ethers.utils.formatEther(removeDuplicateVoteCount[i].voteCount))
            .toString()
            .split('e')[0]
          if (removeDuplicateVoteCount[i].party === result[j].party) {
            finalResult.push({
              party: result[j].party,
              noOfSeats: result[j].noOfSeats,
              voteCount: Number(vc),
            })
          }
        }
      }
      setFinalResultData(finalResult)
    }
  }

  useEffect(() => {
    func()
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
      setLoading(false)
      await state.contract
        .eachCandidateVote()
        .then((response) => {
          // console.log(response)
          setResultData(response)
          setLoading(true)
        })
        .catch((err) => {
          console.log(err)
          setLoading(true)
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
          <input
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="search"
          />
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
