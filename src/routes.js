import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const PartiesResult = React.lazy(() => import('./views/base/result/partiesResult'))
const ProvincialPartiesResult = React.lazy(() =>
  import('./views/base/result/provincialPartiesResult'),
)
const NationalCandidateResult = React.lazy(() =>
  import('./views/base/result/nationalCandidateResult'),
)
const ProvincialCandidateResult = React.lazy(() =>
  import('./views/base/result/provincialCandidateResult'),
)
const LocalBodyCandidateResult = React.lazy(() =>
  import('./views/base/result/localBodyCandidateResult'),
)
const LocalBodyPartiesResult = React.lazy(() =>
  import('./views/base/result/localBodyPartiesResult'),
)
const parties = React.lazy(() => import('./views/parties'))
const candidates = React.lazy(() => import('./views/candidates/Candidates'))
const constituency = React.lazy(() => import('./views/constituency/Constituency'))
const Elections = React.lazy(() => import('./views/elections/Elections'))
const PartyDetail = React.lazy(() => import('./views/partyDetail/PartyDetail'))
const ConstituencyDetail = React.lazy(() => import('./views/constituencyDetail/ContituencyDetail'))
const CandidateDetail = React.lazy(() => import('./views/candidateDetail/CandidateDetail'))
const ElectionDetail = React.lazy(() => import('./views/electionDetail/ElectionDetail'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/result', name: 'Result', element: PartiesResult, exact: true },
  { path: '/result/nationalPartiesResult', name: 'National Parties', element: PartiesResult },
  {
    path: '/result/provincialPartiesResult',
    name: 'Provincial Parties',
    element: ProvincialPartiesResult,
  },
  {
    path: '/result/localBodyPartiesResult',
    name: 'Local Body Parties',
    element: LocalBodyPartiesResult,
  },
  {
    path: '/result/nationalCandidatesResult',
    name: 'National Candidate Result',
    element: NationalCandidateResult,
  },
  {
    path: '/result/provincialCandidatesResult',
    name: 'Provincial Candidate Result',
    element: ProvincialCandidateResult,
  },
  {
    path: '/result/localBodyCandidateResult',
    name: 'Local Body Candidate Result',
    element: LocalBodyCandidateResult,
  },
  { path: '/party', name: 'Parties', element: parties },
  { path: '/candidate', name: 'Candidates', element: candidates },
  { path: '/consituency', name: 'Consituency', element: constituency },
  { path: '/election', name: 'Elections', element: Elections },
  { path: '/party/detail', name: 'Party Detail', element: PartyDetail },
  { path: '/constituency/detail', name: 'Constituency Detail', element: ConstituencyDetail },
  { path: '/candidate/detail', name: 'Candidate Detail', element: CandidateDetail },
  { path: '/election/detail', name: 'Election Detail', element: ElectionDetail },
]

export default routes
