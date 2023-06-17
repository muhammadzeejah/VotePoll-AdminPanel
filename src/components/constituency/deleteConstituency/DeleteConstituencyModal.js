import React from 'react'
import PropTypes from 'prop-types'
import './DeleteConstituency.css'
import { useDispatch } from 'react-redux'
import { deleteConstituency } from 'src/redux/actions'

const DeletePartiesModal = (props) => {
  const dispatch = useDispatch()
  const onDelete = () => {
    dispatch(deleteConstituency(props.id))
      .then((response) => {
        props.isToast('success', 'deleted')
        props.allConstituency()
      })
      .catch((error) => {
        props.isToast('error')
        console.log(error)
      })
    props.closeModal()
  }
  return (
    <div className="deletePartyContainer">
      <div className="backdrop" onClick={props.closeModal} />
      <div className="deletePartyBox">
        <div className="crossIcon" onClick={props.closeModal}>
          &#9587;
        </div>
        <div style={{ marginTop: '25px' }}>Are you sure want to delete consituency!</div>
        <div className="deleteButtonContainer">
          <button className="mt-3 closeButton" onClick={props.closeModal}>
            Close
          </button>
          <button className="mt-3 button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

DeletePartiesModal.propTypes = {
  closeModal: PropTypes.func,
  isToast: PropTypes.func,
  allConstituency: PropTypes.func,
  id: PropTypes.string,
}

export default React.memo(DeletePartiesModal)
