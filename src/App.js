import React, { Component } from 'react';
import './App.css';
import VideoListContainer from './containers/VideoListContainer'
import AddItem from './containers/AddItem'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <AddItem />
        <VideoListContainer />
      </div>
    );
  }
}

export default App;
