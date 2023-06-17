import {
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableDataCell,
  CTableHeaderCell,
  CTableBody,
  CSpinner,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { cilChevronLeft, cilChevronRight, cilColorBorder, cilDelete, cilUser } from '@coreui/icons'
import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import AddParties from 'src/components/parties/addParty/AddParties'
import DeleteParty from 'src/components/parties/deleteParty/DeletePartyModal'
import './Parties.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllParties } from 'src/redux/actions'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Parties = () => {
  const [partyData, setpartyData] = useState([{}])
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [id, setId] = useState()
  const [editData, setEditData] = useState()
  const [isLoading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.PartiesReducer)
  // useEffect(() => {
  //   if (selector) {
  //     setpartyData(selector)
  //   }
  // }, [selector])

  const isToast = (response, operation) => {
    if (response === 'success') {
      if (operation === 'updated') {
        toast.success(`Party Updated Successfully!`)
      } else if (operation === 'deleted') {
        toast.success(`Party Deleted Successfully!`)
      } else {
        toast.success(`Party Added Successfully!`)
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

  const pageCount = Math.ceil(partyData.total / partyData.limit)
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
    allParties()
  }, [currentPage])
  const allParties = () => {
    setLoading(true)
    let page = currentPage
    dispatch(getAllParties(++page))
      .then((response) => {
        setpartyData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
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
          <CButton color="dark" variant="outline" onClick={() => (setModal(true), setEdit(false))}>
            Add Parties
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
                    <CTableHeaderCell scope="col">Logo</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Party&nbsp;Leader</CTableHeaderCell>
                    <CTableHeaderCell scope="col">President</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Manifesto</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {partyData.data && (
                  <CTableBody>
                    {partyData.data.parties
                      .filter((ele) => {
                        return search.toLowerCase() === ''
                          ? ele
                          : ele.name.toLowerCase().includes(search)
                      })
                      .map((party, index) => {
                        return (
                          <CTableRow
                            key={index}
                            onClick={() => navigate('/party/detail', { state: { id: party._id } })}
                            style={{ cursor: 'pointer' }}
                          >
                            <CTableHeaderCell scope="row">
                              <img
                                src={`http://localhost:3000/images/admin/Party/${party.logo}`}
                                alt=""
                                className="logo"
                              />
                            </CTableHeaderCell>
                            <CTableDataCell>{party.name}</CTableDataCell>
                            <CTableDataCell>{party.leader}</CTableDataCell>
                            <CTableDataCell>{party.president}</CTableDataCell>
                            <CTableDataCell>{party.manifesto}</CTableDataCell>
                            <CTableDataCell>{party.description}</CTableDataCell>
                            <CTableDataCell className="icons" onClick={(e) => e.stopPropagation()}>
                              <CIcon
                                icon={cilColorBorder}
                                className="me-2 editIcon"
                                onClick={() => onEdit(party)}
                              />
                              <CIcon
                                icon={cilDelete}
                                className="me-2 deleteIcon"
                                onClick={() => onDelete(party._id)}
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
          <AddParties
            closeModal={closeModal}
            editData={editData}
            id={id}
            edit={edit}
            isToast={isToast}
            allParties={allParties}
          />
        ) : null}
        {deleteModal ? (
          <DeleteParty
            closeModal={closeDeleteModal}
            allParties={allParties}
            isToast={isToast}
            id={id}
          />
        ) : null}
      </div>
      <ToastContainer />
    </>
  )
}

export default Parties
