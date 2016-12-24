import React from 'react'
import {List, ListItem} from 'material-ui/List';

export default (props) => {
  if(props.videos) {
    return(
      <List>
      {props.videos.map((v,i) => <ListItem key={i} primaryText={v.name}/>)}
    </List>)
    }
    else {
      return <div>Loading...</div>
    }
}