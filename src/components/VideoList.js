import React from 'react'
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import VideoItem from './VideoItem'


export default (props) => (
    <List>
      {props.videos.map((v, i) =>
        <div key={i}>
            <VideoItem {...props} video={v} />
          <Divider inset={true} />
        </div>
      )}
    </List>
)