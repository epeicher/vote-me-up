import React, { Component } from 'react'
import { connect } from 'react-redux'
import VideoList from '../components/VideoList'
import * as actions from '../redux/voteApp'
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';

class VideoListContainer extends Component {

  state = {
    openDialog: false,
  };

  componentDidMount() {
    this.props.getVotes();
  }

  askForDeletion = (id,name) => {
    this.setState({openDialog: true, id, name});
  }

  handleClose = () => {
    this.setState({openDialog: false});
  }

  handleDelete = () => {
    this.props.deleteItem(this.state.id, this.state.name)
    this.handleClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDelete}
      />,
    ];

    if (!this.props.videos) return <LinearProgress mode="indeterminate" />
    return <div>
      <VideoList {...this.props} 
        deleteItem={this.askForDeletion} />
      <Snackbar
        open={this.props.displayNotAllowed || false}
        message="You need to Sign In to do any action"
        autoHideDuration={2000}
        onRequestClose={this.props.userNotAllowedEnding}
        />
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.openDialog}
        onRequestClose={this.handleClose}
        >
        Are you sure you want to delete the item <b>{this.state.name}</b>?
        </Dialog>
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
