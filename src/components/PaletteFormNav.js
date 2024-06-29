import React, { Component } from 'react';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import styles from '../styles/PaletteFormNavStyles';
class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: '',
      showForm: false
    };
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('PaletteNameUnique', value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
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
    const {
      classes,
      open,
      palettes,
      handleSubmit,
      handleDrawerOpen
    } = this.props;
    const { showForm } = this.state;
    return (
      <div className={classes.root}>
        <AppBar
          position='fixed'
          color='default'
          className={classNames(classes.appBar, {
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
            <Link to='/'>
              <Button
                className={classes.button}
                variant='contained'
                color='secondary'
              >
                Go Back
              </Button>
            </Link>

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
export default withStyles(styles, { withTheme: true })(PaletteFormNav);
