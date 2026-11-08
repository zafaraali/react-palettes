import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from 'tss-react/mui';
import Drawer from '@mui/material/Drawer';
import PaletteFormNav from './PaletteFormNav';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from '@dnd-kit/sortable';
import useMediaQuery from '@mui/material/useMediaQuery';
import ColorPickerForm from './ColorPickerForm';
import styles from '../styles/NewPaletteFormStyles';
import seedColors from '../seedColors';
import { fillPalette } from '../paletteHelpers';
class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colors: seedColors[0].colors
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = (newColor) => {
    this.setState(({ colors }) => ({ colors: [...colors, newColor] }));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = this.state.colors;
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  };
  removeColor = (name) => {
    this.setState({
      colors: this.state.colors.filter((color) => color.name !== name)
    });
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };
  clearColors = () => {
    this.setState({
      colors: []
    });
  };
  sortColors = () => {
    var colors = [...this.state.colors];
    colors.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    this.setState({
      colors
    });
  };

  addRandomColor = () => {
    this.setState(({ colors }) => ({
      colors: fillPalette(
        colors,
        Math.min(colors.length + 1, this.props.maxColors)
      )
    }));
  };

  generatePalette = () => {
    this.setState(({ colors }) => ({
      colors: fillPalette(colors, this.props.maxColors)
    }));
  };

  render() {
    const { classes, maxColors, palettes, mobile } = this.props;
    const { open, colors } = this.state;
    const paletteFull = colors.length >= maxColors;
    return (
      <div className={`${classes.root} palette-editor`}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
          sortColors={this.sortColors}
        />
        <Drawer
          className={classes.drawer}
          variant={mobile ? 'temporary' : 'persistent'}
          onClose={this.handleDrawerClose}
          ModalProps={{ keepMounted: mobile }}
          slotProps={{ paper: { 'aria-label': 'Color studio' } }}
          anchor='left'
          open={open}
          classes={{
            paper: `${classes.drawerPaper} palette-drawer`
          }}
        >
          <div className={classes.drawerHeader}>
            <span className={classes.drawerTitle}>Color Studio</span>
            <Button
              onClick={this.handleDrawerClose}
              className={classes.closeDrawerBtn}
              aria-label='Close drawer and view palette'
            >
              <ChevronLeftIcon /> Done / View Palette
            </Button>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant='h4' gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant='contained'
                color='secondary'
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear Palette
              </Button>

              <Button
                variant='contained'
                color='primary'
                onClick={this.addRandomColor}
                disabled={paletteFull}
                className={classes.button}
              >
                Random Color
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={this.generatePalette}
                disabled={paletteFull}
                className={classes.button}
              >
                Generate Full
              </Button>
            </div>
            <ColorPickerForm
              paletteFull={paletteFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>

        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open && !mobile
          })}
        >
          <div className={classes.contentNavSpacer} />
          <DraggableColorList
            colors={colors}
            removeColor={this.removeColor}
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}
const StyledNewPaletteForm = withStyles(NewPaletteForm, styles);
export default function ResponsiveNewPaletteForm(props) {
  const mobile = useMediaQuery('(max-width: 768px)');
  return <StyledNewPaletteForm {...props} mobile={mobile} />;
}

