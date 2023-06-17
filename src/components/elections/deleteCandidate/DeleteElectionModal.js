import React from 'react'
import PropTypes from 'prop-types'
import './DeleteElection.css'
import { useDispatch } from 'react-redux'
import { deleteElection } from 'src/redux/actions'

const DeleteCandidateModal = (props) => {
  const dispatch = useDispatch()
  const onDelete = () => {
    dispatch(deleteElection(props.id))
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
        <div style={{ marginTop: '25px' }}>Are you sure want to delete election!</div>
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

DeleteCandidateModal.propTypes = {
  closeModal: PropTypes.func,
  id: PropTypes.string,
  isToast: PropTypes.func,
  allConstituency: PropTypes.func,
}

export default React.memo(DeleteCandidateModal)
