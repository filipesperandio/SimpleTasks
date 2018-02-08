import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Send from 'material-ui-icons/Send';

const styles = theme => ({
  container: {
    display: "block",
    bottom: 0,
    position: "absolute",
    width: "100%"
  },
  textField: {
    width: "85%",
  },
});

class InputTask extends Component {
  state = {
    taskDescription: ''
  };

  handleChange = () => event => {
    this.setState({
      taskDescription: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            className={classes.textField}
            id="taskDescription"
            label="Task Description"
            value={this.state.taskDescription}
            onChange={this.handleChange()}
            margin="normal"
          />
          <IconButton iconStyle={{width: 24, height: 24}} style={{width: 32, height: 32, top: 5, padding: 24}} color="primary">
            <Send />
          </IconButton>
        </form>
    );
  }
}

export default withStyles(styles)(InputTask);
