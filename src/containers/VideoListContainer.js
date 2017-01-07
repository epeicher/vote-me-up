import React, { Component } from 'react'
import { connect } from 'react-redux'
import VideoList from '../components/VideoList'
import * as actions from '../redux/voteApp'
import LinearProgress from 'material-ui/LinearProgress';

class VideoListContainer extends Component {

  componentDidMount() {
    this.props.getVotes();
  }

  render() {
    if (!this.props.videos) return <LinearProgress mode="indeterminate" />
    return <VideoList {...this.props} />
  }
}

export default connect(
  st => ({
    videos: st.items,
    user: st.user,
  }),
  actions
)(VideoListContainer)