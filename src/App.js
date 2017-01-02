import React, { Component } from 'react';
import VideoListContainer from './containers/VideoListContainer'
import AddItem from './containers/AddItem'
import SignInBar from './containers/SignInBar'

class App extends Component {
  
  render() {
    return (
      <div>
        <SignInBar />
        <AddItem />
        <VideoListContainer />
      </div>
    );
  }
}

export default App;
