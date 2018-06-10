import React, { Component } from 'react'
import { connect } from 'react-redux'
import VideoList from '../components/VideoList'
import * as actions from '../redux/voteApp'
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class VideoListContainer extends Component {

  state = {
    openDeleteDialog: false,
    openEditDialog: false
  };

  componentDidMount() {
    this.props.getVotes();
  }

  askForDeletion = (id, title) => {
    this.setState({openDeleteDialog: true, id, title});
  }

  handleCloseDeleteDialog = () => {
    this.setState({openDeleteDialog: false});
  }

  handleDelete = () => {
    this.props.deleteItem(this.state.id)
    this.handleCloseDeleteDialog();
  }

  askForEdition = (id, link, title) => {
    this.setState({ openEditDialog: true, id, title, link });
  };

  handleLinkChange = event => {
    this.setState({ link: event.target.value });
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleCloseEditDialog = () => {
    this.setState({ openEditDialog: false });
  };

  handleEdit = () => {
    if (!this.state.link || !this.state.title)
      return;

    this.props.itemEdited(this.state.id, `${this.state.link} - ${this.state.title}`);
    this.handleCloseEditDialog();
  }

  render() {
    if (!this.props.videos)
      return <LinearProgress mode="indeterminate" />

    return (
      <div>
        <VideoList {...this.props} 
          deleteItem={this.askForDeletion} editItem={this.askForEdition} />
        <Snackbar
          open={this.props.displayNotAllowed || false}
          message="You need to Sign In to do any action"
          autoHideDuration={2000} />

        <Dialog
          disableBackdropClick
          open={this.state.openDeleteDialog}
          onClose={this.handleCloseDeleteDialog}
        >
          <DialogTitle>{"Delete item"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the item <b>{this.state.title}</b>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          disableBackdropClick
          open={this.state.openEditDialog}
          onClose={this.handleCloseEditDialog}
        >
          <DialogTitle>{"Edit item"}</DialogTitle>
          <DialogContent>
            <TextField
              required
              id="title"
              label="Title"
              value={this.state.title}
              onChange={this.handleTitleChange}
              margin="dense"
              fullWidth />
            <TextField
              required
              id="link"
              label="Link"
              value={this.state.link}
              onChange={this.handleLinkChange}
              margin="dense"
              fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseEditDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleEdit} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
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
