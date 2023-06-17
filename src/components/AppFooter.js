import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a
          href="https://coreui.io"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#3c4b64' }}
        >
          VotePoll
        </a>
        <span className="ms-1">&copy; 2022.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
