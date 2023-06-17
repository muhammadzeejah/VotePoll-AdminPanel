import React from 'react'
import PropTypes from 'prop-types'
import './DeleteCandidate.css'
import { useDispatch } from 'react-redux'
import { deleteCandidate } from 'src/redux/actions'

const DeleteCandidateModal = (props) => {
  const dispatch = useDispatch()
  const onDelete = () => {
    dispatch(deleteCandidate(props.id))
      .then((response) => {
        props.isToast('success', 'deleted')
        props.allCandidates()
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
        <div style={{ marginTop: '25px' }}>Are you sure want to delete candidate!</div>
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
  allCandidates: PropTypes.func,
}

export default React.memo(DeleteCandidateModal)
