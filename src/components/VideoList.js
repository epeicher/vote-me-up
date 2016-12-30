import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  gridList: {
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
  cellStyle: {
    textAlign: 'left',    
    transition: 'all 0.5s',
    transitionDelay: '1s',
  },
};

export default (props) => {
  
  if(props.videos) {
    return(
      <div style={styles.root}>
      <GridList style={styles.gridList} cols={1} cellHeight={60}>
      {props.videos.map((v,i) => 
        <GridTile key={i} title={v.name} style={styles.cellStyle}
          subtitle={<span><b>{v.votes}</b> votes</span>}
          actionIcon={<IconButton onClick={() => props.onVoted(v.id)}><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          actionPosition='left'
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.25) 70%,rgba(0,0,0,0) 100%)"
        >
        </GridTile>
      )}
    </GridList>
    </div>)
    }
    else {
      return <div>Loading...</div>
    }
}