import React from 'react'
import { ListItem } from 'material-ui/List';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import { red500 } from 'material-ui/styles/colors';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './item.css'

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


export default class VideoItem extends React.Component {

  render() {
    let props = this.props;
    let v = props.video;

    return (
      <ReactCSSTransitionGroup
        transitionName="item"
        transitionEnterTimeout={0}
        transitionLeave={false}>
        <ListItem primaryText={v.name}
          key={v.id}
          secondaryText={<span><b>{v.votes}</b> votes</span>}
          leftIcon={<StarBorder />}
          onClick={() => props.onVoted(v.id)}
          rightIcon={<IconButton
            style={styles.iconStyle}
            iconStyle={styles.clearIcon}
            onClick={() => props.onDeleted(v.id)}>
            <ContentClear hoverColor={red500} /></IconButton>}
          >
        </ListItem>
      </ReactCSSTransitionGroup>)
  }

}