import React, { Component } from 'react'
import { connect } from 'react-redux'
import VideoList from '../components/VideoList'
import * as actions from '../redux/voteApp'
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

class VideoListContainer extends Component {

  componentDidMount() {
    this.props.getVotes();
  }

  render() {
    if (!this.props.videos) return <LinearProgress mode="indeterminate" />
    return <div>
      <VideoList {...this.props} />
     <Snackbar
          open={this.props.displayNotAllowed || false}
          message="You need to Sign In to do any action"
          autoHideDuration={2000}
          onRequestClose={this.props.userNotAllowedEnding}
        /> 
    </div>
  }
}

export default connect(
  st => ({
    videos: st.items,
    user: st.user,
    displayNotAllowed: st.displayNotAllowed
  }),
  actions
)(VideoListContainer)
