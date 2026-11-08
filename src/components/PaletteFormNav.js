import React, { Component } from 'react';
import classNames from 'classnames';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { withStyles } from 'tss-react/mui';
import PaletteMetaForm from './PaletteMetaForm';
import styles from '../styles/PaletteFormNavStyles';
class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    };
  }
  showForm = () => {
    this.setState({ showForm: true });
  };
  hideForm = () => {
    this.setState({
      showForm: false
    });
  };
  sortColors = () => {
    this.props.sortColors();
  };
  render() {
    const { classes, open, palettes, handleSubmit, handleDrawerOpen } =
      this.props;
    const { showForm } = this.state;
    return (
      <div className={classes.root}>
        <AppBar
          position='fixed'
          color='default'
          className={classNames(classes.appBar, 'palette-form-nav', {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Create A Palette
            </Typography>
          </Toolbar>

          <div className={classes.navBtns}>
            <Button
              variant='contained'
              color='primary'
              onClick={this.sortColors}
              className={classes.button}
            >
              Auto-Sort
            </Button>
            <Button
              component={Link}
              to='/'
              className={classes.button}
              variant='contained'
              color='secondary'
            >
              Go Back
            </Button>

            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={this.showForm}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {showForm && (
          <PaletteMetaForm
            palettes={palettes}
            handleSubmit={handleSubmit}
            hideForm={this.hideForm}
          />
        )}
      </div>
    );
  }
}
export default withStyles(PaletteFormNav, styles);
