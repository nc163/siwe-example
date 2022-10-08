type SessionStateType = {
  signin: boolean
  loading: boolean
  address?: string
}

type SessionAction = { type: 'connect'; update: SessionStateType } | { type: 'disconnect'; update: SessionStateType }

type SessionDispatch = (action: SessionAction) => void

type SessionState = { state: SessionStateType; dispatch: SessionDispatch }
