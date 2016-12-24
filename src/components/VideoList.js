import React from 'react'

export default (props) => {
  if(props.videos) {
    return(
      <ol>
      {props.videos.map((v,i) => <li key={i}>{v.name}</li>)}
    </ol>)
    }
    else {
      return <div>Loading...</div>
    }
}