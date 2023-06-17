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
import { cilChevronLeft, cilChevronRight, cilColorBorder, cilDelete } from '@coreui/icons'
import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import './Elections.css'
import { useDispatch } from 'react-redux'
import { getAllConstituency, getAllElections } from 'src/redux/actions'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteElectionModal from 'src/components/elections/deleteCandidate/DeleteElectionModal'
import AddElection from 'src/components/elections/addElection/AddElection'

const Consituency = () => {
  const [electionsData, setElectionsData] = useState([{}])
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

  const isToast = (response, operation) => {
    if (response === 'success') {
      if (operation === 'updated') {
        toast.success(`Election Updated Successfully!`)
      } else if (operation === 'deleted') {
        toast.success(`Election Deleted Successfully!`)
      } else {
        toast.success(`Election Added Successfully!`)
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

  const onEdit = (election) => {
    // console.log(election, 'e')
    setEditData(election)
    setEdit(true)
    setModal(!modal)
  }

  const pageCount = Math.ceil(electionsData.total / electionsData.limit)
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
    allElections()
  }, [currentPage])

  const allElections = () => {
    setLoading(true)
    let page = currentPage
    dispatch(getAllElections(++page))
      .then((response) => {
        setElectionsData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  const onReload = () => {
    allElections()
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
          <div>
            <CButton color="dark" onClick={onReload} style={{ marginRight: '10px' }}>
              Reload
            </CButton>
            <CButton
              color="dark"
              variant="outline"
              onClick={() => (setModal(true), setEdit(false))}
            >
              Add Election
            </CButton>
          </div>
        </div>
        {isLoading ? (
          <div className="spinner">
            <CSpinner color="dark" variant="grow" />
            <CSpinner color="dark" variant="grow" />
            <CSpinner color="dark" variant="grow" />
          </div>
        ) : (
          <>
            <div className="w-100">
              <CTable bordered striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Staus</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {electionsData.data && (
                  <CTableBody>
                    {electionsData.data.election
                      .filter((ele) => {
                        return search.toLowerCase() === ''
                          ? ele
                          : ele.type.toLowerCase().includes(search)
                      })
                      .map((election, index) => {
                        return (
                          <CTableRow
                            key={index}
                            onClick={() =>
                              navigate('/election/detail', { state: { id: election._id } })
                            }
                            style={{ cursor: 'pointer' }}
                          >
                            <CTableDataCell>{election.startTime.split('T')[0]}</CTableDataCell>
                            <CTableDataCell>{election.endTime.split('T')[0]}</CTableDataCell>
                            <CTableDataCell>{election.type}</CTableDataCell>
                            <CTableDataCell>
                              {new Date() > new Date(election.startTime) &&
                                new Date() < new Date(election.endTime) &&
                                'Open'}
                              {new Date() < new Date(election.startTime) && 'Pending'}
                              {new Date() > new Date(election.endTime) && 'Closed'}
                            </CTableDataCell>
                            {/* {console.log(election.startTime < election.endTime)}
                            {new Date() > new Date(election.startTime) &&
                              new Date() < new Date(election.endTime) && (
                                <CTableDataCell>Open</CTableDataCell>
                              )}
                            {new Date() > new Date(election.endTime) && (
                              <CTableDataCell>Close</CTableDataCell>
                            )}
                            {new Date() > new Date(election.startTime) && (
                              <CTableDataCell>Pending</CTableDataCell>
                            )} */}
                            <CTableDataCell className="icons" onClick={(e) => e.stopPropagation()}>
                              <CIcon
                                icon={cilColorBorder}
                                className="me-2 editIcon"
                                onClick={() => onEdit(election)}
                              />
                              <CIcon
                                icon={cilDelete}
                                className="me-2 deleteIcon"
                                onClick={() => onDelete(election._id)}
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
          <AddElection
            closeModal={closeModal}
            editData={editData}
            id={id}
            edit={edit}
            isToast={isToast}
            allConstituency={allElections}
          />
        ) : null}
        {deleteModal ? (
          <DeleteElectionModal
            closeModal={closeDeleteModal}
            allConstituency={allElections}
            isToast={isToast}
            id={id}
          />
        ) : null}
      </div>
      <ToastContainer />
    </>
  )
}

export default Consituency
