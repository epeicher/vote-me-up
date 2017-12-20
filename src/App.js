import React, { Component } from 'react';
import VideoListContainer from './containers/VideoListContainer';
import AddItem from './containers/AddItem';
import SignInBar from './containers/SignInBar';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <SignInBar />
        <AddItem />
        <BrowserRouter>
          <Route path="/:list?" component={VideoListContainer} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
