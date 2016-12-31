import React from 'react'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {red500} from 'material-ui/styles/colors';

const styles = {
  clearIcon: {
    width: 26,
    height: 26,
  },
  iconStyle: {
    width: 40,
    height: 40,
    padding: 0,
  }
}

export default (props) => {
  return(
    <List>
    {props.videos.map((v,i) => 
      <div key={i}>
      <ListItem primaryText={v.name}
        secondaryText={<span><b>{v.votes}</b> votes</span>}
        leftIcon={<StarBorder />}
        onClick={() => props.onVoted(v.id)}
        rightIcon={<IconButton 
          style={styles.iconStyle}
          iconStyle={styles.clearIcon}
          onClick={() => props.onDeleted(v.id)}>
          <ContentClear hoverColor={red500}/></IconButton>}
      >
      </ListItem>
      <Divider inset={true} />
      </div>
    )}
  </List>)
}