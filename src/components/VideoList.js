import React from 'react'
import VideoItem from './VideoItem'


export default (props) => (
    <div>
      {props.videos.map((v, i) =>
        <div key={i}>
            <VideoItem {...props} video={v} />
        </div>
      )}
    </div>
)