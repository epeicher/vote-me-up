import React, { Component } from 'react';
import './App.css';
import VideoListContainer from './containers/VideoListContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <VideoListContainer />
      </div>
    );
  }
}

export default App;
