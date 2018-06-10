import React from 'react'
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import './item.css'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'

const styles = {
  viewed: {
    backgroundColor: 'lightgrey'
  },
  textField: {
    fontSize: '1.5em',
    paddingLeft: '20px',
    height: '68px',
    width: '100%'
  },
  iconViewed : {
    width: 40,
    display: 'inline-block',
    verticalAlign: 'top'
  },
  actions: {
    display: 'flex'
  },
  cardContent: {
    root: {
      paddingTop: 0
    }
  }
}

export default class VideoItem extends React.Component {

  getVoteIcon() {
    const userId = this.props.user ? this.props.user.uid : undefined;
    
    return (!userId || !this.props.video.votedBy || !this.props.video.votedBy[userId])
      ? <StarBorder color="primary" onClick={e => this.handleVote(e, this.props.video.id)} />
      : <Star color="primary" onClick={e => this.handleVote(e, this.props.video.id)} />
  }

  onEdit(e,id) {
    e.stopPropagation();
    if(!this.props.user) return this.props.userNotAllowedStarting();    
    this.props.editItem(id);
  }

  handleVote(e, id) {
    if(!this.props.user) return this.props.userNotAllowedStarting();

    this.props.voteUp(id)
  }

  handleInput(e) {
    const {id, editedValue} = this.props.video;
    // esc
    if(e.which === 27) this.props.cancelEditing(id);
    // enter
    if(e.which === 13) this.props.itemEdited(id, editedValue);
  }

  handleDelete(e, {id, title}) {
    e.stopPropagation();
    if(!this.props.user) return this.props.userNotAllowedStarting();

    this.props.deleteItem(id, title);
  }

  handleEdit(e, {id, link, title}) {
    e.stopPropagation();
    if(!this.props.user) return this.props.userNotAllowedStarting();

    this.props.editItem(id, link, title);
  }

  handleViewed(e, viewed, id) {
    if(!this.props.user) return this.props.userNotAllowedStarting();
    this.props.viewed(id, viewed)
  }

  render() {
    const { video } = this.props;

    return (
      <Card style={video.viewed ? styles.viewed : {}}>
        <CardHeader
          avatar={
            <Avatar>
              {video.votes || "0"}
            </Avatar>
          }
          title={video.title}
          //subheader="September 2018"   <-- NICE TO HAVE!
        />
        <CardContent style={{paddingTop: 0, paddingBottom: 5, marginLeft: 58}}>
          <Typography color="textSecondary" className="ellipses">
            <a href={video.link} target="blank">{video.link}</a>
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing className={this.props.user ? '' : 'hide' }>
          <IconButton style={{ marginLeft: 8 }}>
            {this.getVoteIcon()}
          </IconButton>
          <div style={{marginLeft: 'auto', marginRight: 8}}>
            <IconButton>
              <EditIcon onClick={e => this.handleEdit(e, video)} />
            </IconButton>
            <IconButton>
              <DeleteIcon onClick={e => this.handleDelete(e, video)} />
            </IconButton>
            {(video.viewed) ?
              <IconButton aria-label="Mark as not viewed">
                <CheckBoxIcon onClick={e => this.handleViewed(e, false, video.id)} />
              </IconButton>
              :
              <IconButton aria-label="Mark as viewed">
                <CheckBoxOutlineBlankIcon onClick={e => this.handleViewed(e, true, video.id)} />
              </IconButton>
            }
            </div>
        </CardActions>
      </Card>
    )
  }
}
