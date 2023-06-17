import {
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableDataCell,
  CTableHeaderCell,
  CTableBody,
  CSpinner,
  CPaginationItem,
  CPagination,
} from '@coreui/react'
import { cilColorBorder, cilDelete, cilUser } from '@coreui/icons'
import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import './Candidates.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCandidates } from 'src/redux/actions'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddCandidate from 'src/components/candidates/addCandidate/AddCandidate'
import abi from 'src/components/contract/contract'
import DeleteCandidateModal from 'src/components/candidates/deleteCandidate/DeleteCandidateModal'
import { ethers } from 'ethers'
import axios from 'axios'

const Candidates = () => {
  const [candidateData, setCandidateData] = useState([{}])
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [id, setId] = useState()
  const [editData, setEditData] = useState()
  const [isLoading, setLoading] = useState(true)
  let [pageNum, setPageNum] = useState(1)
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [state, setState] = React.useState({
    provider: null,
    signer: null,
    contract: null,
  })

  const isToast = (response, operation) => {
    if (response === 'success') {
      if (operation === 'updated') {
        toast.success(`Candidate Updated Successfully!`)
      } else if (operation === 'deleted') {
        toast.success(`Candidate Deleted Successfully!`)
      } else {
        toast.success(`Candidate Added Successfully!`)
      }
    } else {
      toast.error('Error Occured!')
    }
  }

  const closeModal = () => {
    setModal(false)
  }

  const closeDeleteModal = () => {
    setDeleteModal(false)
  }

  const onDelete = (id) => {
    setId(id)
    setDeleteModal(!deleteModal)
  }

  const onEdit = (party) => {
    setEditData(party)
    setEdit(true)
    setModal(!modal)
  }

  const pageCount = Math.ceil(candidateData.total / candidateData.limit)
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
    allCandidates()
  }, [currentPage])

  const allCandidates = async (arg) => {
    await axios
      .get(`http://127.0.0.1:3000/api/v1/candidate/getCandidates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        if (arg === 'contract') {
          console.log(response.data.data, 'arg')
          const lastCandidate =
            response.data.data.candidates[response.data.data.candidates.length - 1]
          let addCandidate = [],
            obj
          for (let i = 0; i < lastCandidate.consituencies.length; i++) {
            obj = {
              name: lastCandidate.citizen.firstName + lastCandidate.citizen.lastName,
              seatType: lastCandidate.consituencies[i].seatType,
              halka: lastCandidate.consituencies[i].halka,
              party: lastCandidate.party.name,
              electionType: 'National',
              voteCount: 0,
            }
            addCandidate.push(obj)
          }
          console.log(addCandidate)
          elections(addCandidate)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    setLoading(true)
    let page = currentPage
    dispatch(getAllCandidates(++page))
      .then((response) => {
        setCandidateData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
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
  // useEffect(() => {
  //   candidateCount()
  //   result()
  // }, [state])

  const elections = async (addCandidate) => {
    console.log('inn')
    if (state.contract) {
      await state.contract
        .registerCandidate(addCandidate)
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const candidateCount = async () => {
    if (state.contract) {
      await state.contract
        .candidateCount()
        .then((response) => {
          console.log(Number(ethers.utils.formatEther(response)).toString().split('e')[0], 'cc')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const result = async () => {
    if (state.contract) {
      await state.contract
        .eachCandidateVote()
        .then((response) => {
          console.log(response, 'resultt')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const onBlockchain = async () => {
    let addCandidate = [],
      obj
    await axios
      .get(`http://127.0.0.1:3000/api/v1/candidate/getCandidates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        for (let i = 0; i < response.data.data.candidates.length; i++) {
          for (let j = 0; j < response.data.data.candidates[i].consituencies.length; j++) {
            obj = {
              name:
                response.data.data.candidates[i].citizen.firstName +
                response.data.data.candidates[i].citizen.lastName,
              seatType: response.data.data.candidates[i].consituencies[j].seatType,
              halka: response.data.data.candidates[i].consituencies[j].halka,
              party: response.data.data.candidates[i].party.name,
              electionType: 'National',
              voteCount: 0,
            }
          }
          console.log(obj)
          addCandidate.push(obj)
        }
        console.log(addCandidate, 'add')
      })
      .catch((error) => {
        console.log(error)
      })
    elections(addCandidate)
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
          {/* <CButton color="dark" onClick={onBlockchain}>
            Add To Blockchain
          </CButton> */}
          <CButton color="dark" variant="outline" onClick={() => (setModal(true), setEdit(false))}>
            Add Candidate
          </CButton>
        </div>
        {isLoading ? (
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
                    <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Party</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Province</CTableHeaderCell>
                    <CTableHeaderCell scope="col">District</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Division</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tehsil</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Cell #</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {candidateData.data && (
                  <CTableBody>
                    {candidateData.data.candidates
                      .filter((ele) => {
                        return search.toLowerCase() === ''
                          ? ele
                          : ele.name.toLowerCase().includes(search)
                      })
                      .map((candidate, index) => {
                        return (
                          <CTableRow
                            key={index}
                            onClick={() =>
                              navigate('/candidate/detail', { state: { id: candidate._id } })
                            }
                            style={{ cursor: 'pointer' }}
                          >
                            <CTableHeaderCell scope="row">
                              <img
                                src={`http://localhost:3000/images/web/Citizen/${candidate.citizen.photo}`}
                                alt=""
                                className="logo"
                              />
                            </CTableHeaderCell>
                            <CTableDataCell>
                              {candidate.citizen.firstName} {candidate.citizen.lastName}
                            </CTableDataCell>
                            <CTableDataCell>{candidate.party.name}</CTableDataCell>
                            <CTableDataCell>{candidate.citizen.province}</CTableDataCell>
                            <CTableDataCell>{candidate.citizen.district}</CTableDataCell>
                            <CTableDataCell>{candidate.citizen.division}</CTableDataCell>
                            <CTableDataCell>{candidate.citizen.tehsil}</CTableDataCell>
                            <CTableDataCell>{candidate.citizen.cell}</CTableDataCell>
                            <CTableDataCell className="icons" onClick={(e) => e.stopPropagation()}>
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
                            </CTableDataCell>
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
        {modal ? (
          <AddCandidate
            closeModal={closeModal}
            editData={editData}
            id={id}
            edit={edit}
            isToast={isToast}
            allCandidates={allCandidates}
          />
        ) : null}
        {deleteModal ? (
          <DeleteCandidateModal
            allCandidates={allCandidates}
            closeModal={closeDeleteModal}
            id={id}
            isToast={isToast}
          />
        ) : null}
      </div>
      <ToastContainer />
    </>
  )
}

export default Candidates
