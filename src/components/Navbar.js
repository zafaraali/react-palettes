import React, { Component } from 'react';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { withStyles } from 'tss-react/mui';
import Slider from '@mui/material/Slider';
import { Link } from 'react-router-dom';
import { MenuItem, IconButton } from '@mui/material';
import styles from '../styles/NavbarStyles.js';
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: 'hex',
      open: false
    };
  }
  handleChange = (e) => {
    this.setState({ format: e.target.value, open: true });
    this.props.handleChange(e.target.value);
  };
  closeSnackbar = () => {
    this.setState({
      open: false
    });
  };
  render() {
    const { level, changeLevel, isSingleColor, classes } = this.props;
    const { format, open } = this.state;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to='/'>React Palette</Link>
        </div>
        {!isSingleColor && (
          <div className={classes.levelControl}>
            <span className={classes.level}>
              Shade <strong>{level}</strong>
            </span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onChangeCommitted={(_event, value) => changeLevel(value)}
                aria-label="Shade"
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <span className={classes.formatLabel}>Copy format</span>
          <Select
            inputProps={{ 'aria-label': 'Copy format' }}
            className={classes.formatSelect}
            value={format}
            onChange={this.handleChange}
          >
            <MenuItem value='hex'>HEX - #ffffff</MenuItem>
            <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={open}
          autoHideDuration={3000}
          message={
            <span id='message-id'>
              Format Changed to {format.toUpperCase()}
            </span>
          }
          ContentProps={{ 'aria-describedby': 'message-id' }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color='inherit'
              key='close'
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    );
  }
}

export default withStyles(Navbar, styles);
