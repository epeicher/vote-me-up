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
    if (!this.props.items) return <LinearProgress mode="indeterminate" />
    return <VideoList videos={this.props.items}
      user={this.props.user}
      onVoted={this.props.voteUp}
      onDeleted={this.props.deleteItem} />
  }
}

export default connect(
  st => ({
    items: st.items,
    user: st.user,
  }),
  actions
)(VideoListContainer)