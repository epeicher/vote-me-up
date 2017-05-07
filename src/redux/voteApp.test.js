import reducer from './voteApp'

it('sets default initial state', () => {
  expect(reducer(undefined)).toEqual({})
})

it('updates votes to inital state', () => {
  const items = [1,2,3]
  const action = {
    type: 'VOTES_UPDATED',
    items
  }
  expect(reducer({},action)).toEqual(
    { items }
  )
})

it('updates votes to existing state', () => {
  const items = [1,2,3]
  const added = [4,5,6]
  const action = {
    type: 'VOTES_UPDATED',
    items: added
  }
  expect(reducer({ items },action)).toEqual(
    { items: added}
  )
})