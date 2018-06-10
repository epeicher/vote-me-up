import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
    return 'Sign In with google'
  }

  getTitle() {
    const userTitle = this.props.user ?
        ' - ' + this.props.user.email : ''
    return <span><span>Vote Me Up</span>
      <span style={{fontSize:'0.6em'}}>{userTitle}</span></span>;
  }

  render() {
    const styles = {
      root: {
        flexGrow: 1,
      }
    };

    return (
      <div className={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" style={{flex: 1}}>
              {this.getTitle()}
            </Typography>
            <Button color="inherit" onClick={this.handleSignIn.bind(this)}>{this.getLabel()}</Button>
          </Toolbar>
        </AppBar>    
      </div>
    )
  }
}

export default connect(
  st => ({user:st.user})
)(SignInBar)