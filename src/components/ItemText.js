import React from 'react'
import anchorme from 'anchorme'

const MAX_LINK_LENGTH = 90

export default ({txt}) => {
  let anchorObj = anchorme(txt, {list:true})[0]
  let anchorRaw = anchorme(txt)
  let remainingTextIndex = anchorRaw.lastIndexOf('>')
  if(remainingTextIndex !== -1 && anchorObj) {
    let remainingText = anchorRaw.substring(remainingTextIndex+1)
    let calculatedLinkText = anchorObj.encoded.length > MAX_LINK_LENGTH ? 
      anchorObj.encoded.substring(0,MAX_LINK_LENGTH-3)+"..." : anchorObj.encoded
    return (<div>
        <a href={anchorObj.raw}>{calculatedLinkText}</a>
        {remainingText}
      </div>)
  }
  return <div>{txt}</div>
}