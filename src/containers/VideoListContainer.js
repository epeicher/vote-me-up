import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoList from '../components/VideoList'
import * as actions from '../redux/voteApp'

class VideoListContainer extends Component {

  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    return <VideoList videos={this.props.items} />
  }
}

export default connect(
  st => ({items : st.items}),
  dispatch => {
    return {
      onVoted: (id) => dispatch(),
      onLoad: () => dispatch(actions.getData())
    }
  }
)(VideoListContainer)