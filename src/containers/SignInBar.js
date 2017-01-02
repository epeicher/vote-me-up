import React from 'react'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import * as api from '../api'
import {connect} from 'react-redux'

class SignInBar extends React.Component {

  handleSignIn() {
    if(this.props.user) {
      api.signOut();
    }
    else {
      api.authenticateWithGoogle()
    }
  }

  getLabel() {
    if(this.props.user) return 'Sign Out'
    return 'Sign In'
  }

  getTitle() {
    const userTitle =
      this.props.user ?
        ' - ' + this.props.user.email : ''
    return <span><span>Vote Me Up</span>
      <span style={{fontSize:'0.6em'}}>{userTitle}</span></span>;
  }

  render() {
    return (<AppBar title={this.getTitle()}
      showMenuIconButton={false}
      iconElementRight={<FlatButton label={this.getLabel()} onClick={this.handleSignIn.bind(this)}/>}>
    </AppBar>)
  }
}

export default connect(
  st => ({user:st.user}))
(SignInBar)