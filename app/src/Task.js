import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import MoreVert from 'material-ui-icons/MoreVert';

const styles = theme => ({
  root: {
  },
});


class Task extends Component {
  render() {
    const { classes } = this.props;
    const item = this.props.task;

    return(
            <ListItem
              key={item.id}
              dense
              button
              onClick={this.props.onClick}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.props.checked()}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={item.description} />
              <ListItemSecondaryAction>
                <IconButton aria-label="More">
                  <MoreVert />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
    );
  }
}

export default withStyles(styles)(Task);
