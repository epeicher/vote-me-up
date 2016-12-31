import React, { Component } from 'react';
import VideoListContainer from './containers/VideoListContainer'
import AddItem from './containers/AddItem'

class App extends Component {
  
  render() {
    return (
      <div>
        <AddItem />
        <VideoListContainer />
      </div>
    );
  }
}

export default App;
