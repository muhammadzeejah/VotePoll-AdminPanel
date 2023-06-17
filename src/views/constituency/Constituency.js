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
import './Constituency.css'
import { useDispatch } from 'react-redux'
import { getAllConstituency } from 'src/redux/actions'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteConstituencyModal from 'src/components/constituency/deleteConstituency/DeleteConstituencyModal'
import AddConstituency from 'src/components/constituency/addConstituency/AddConstituency'

const Consituency = () => {
  const [consituencyData, setConstituencyData] = useState([{}])
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
        toast.success(`Constituency Updated Successfully!`)
      } else if (operation === 'deleted') {
        toast.success(`Constituency Deleted Successfully!`)
      } else {
        toast.success(`Constituency Added Successfully!`)
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

  const onEdit = (constiuency) => {
    setEditData(constiuency)
    setEdit(true)
    setModal(!modal)
  }
  const pageCount = Math.ceil(consituencyData.total / consituencyData.limit)
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
    allConstituency()
  }, [currentPage])

  const allConstituency = () => {
    setLoading(true)
    let page = currentPage
    dispatch(getAllConstituency(++page))
      .then((response) => {
        setConstituencyData(response.data)
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
            Add Consituency
          </CButton>
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
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Consituency&nbsp;#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Seat</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Province</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Division</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {consituencyData.data && (
                  <CTableBody>
                    {consituencyData.data.consituencies
                      .filter((ele) => {
                        return search.toLowerCase() === ''
                          ? ele
                          : ele.name.toLowerCase().includes(search)
                      })
                      .map((constituency, index) => {
                        return (
                          <CTableRow
                            key={index}
                            onClick={() =>
                              navigate('/constituency/detail', { state: { id: constituency._id } })
                            }
                            style={{ cursor: 'pointer' }}
                          >
                            <CTableDataCell>{constituency.name}</CTableDataCell>
                            <CTableDataCell>{constituency.halka}</CTableDataCell>
                            <CTableDataCell>{constituency.seatType}</CTableDataCell>
                            <CTableDataCell>{constituency.province}</CTableDataCell>
                            <CTableDataCell>{constituency.division}</CTableDataCell>
                            <CTableDataCell className="icons" onClick={(e) => e.stopPropagation()}>
                              <CIcon
                                icon={cilColorBorder}
                                className="me-2 editIcon"
                                onClick={() => onEdit(constituency)}
                              />
                              <CIcon
                                icon={cilDelete}
                                className="me-2 deleteIcon"
                                onClick={() => onDelete(constituency._id)}
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
          <AddConstituency
            closeModal={closeModal}
            editData={editData}
            id={id}
            edit={edit}
            isToast={isToast}
            allConstituency={allConstituency}
          />
        ) : null}
        {deleteModal ? (
          <DeleteConstituencyModal
            closeModal={closeDeleteModal}
            allConstituency={allConstituency}
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
