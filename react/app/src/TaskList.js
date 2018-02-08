import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Task from './Task';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    width: '100%',
    background: theme.palette.background.paper,
  },
});

class TaskList extends Component {
  items = [
    { id: 1, description: "Task1", done: false },
    { id: 2, description: "Task2", done: true }
  ];

  state = {
    tasks: []
  };

  handleToggle = task => () => {
    const state = this.state;
    task.done = !task.done;
    state[task.id] = task;

    this.setState({ state });
  };

  done = task => () => {
    const taskState = this.state[task.id];
    console.log(taskState);
    return taskState && taskState.done || task.done;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {
            this.items.map(item => (
              <Task
                task={item}
                onClick={this.handleToggle(item)}
                checked={this.done(item)}
              />
            ))
          }
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(TaskList);
