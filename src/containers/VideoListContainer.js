import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoList from '../components/VideoList'
import * as actions from '../redux/voteApp'

class VideoListContainer extends Component {

  componentDidMount() {
    this.props.getVotes();
  }

  render() {
    return <VideoList videos={this.props.items} onVoted={this.props.onVoted} />
  }
}

export default connect(
  st => ({items : st.items}),
  dispatch => {
    return {
      onVoted: (id) => dispatch(actions.voteUp(id)),
      getVotes: () => dispatch(actions.getVotes())
    }
  }
)(VideoListContainer)