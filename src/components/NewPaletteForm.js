import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import PaletteFormNav from './PaletteFormNav';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import ColorPickerForm from './ColorPickerForm';
import styles from '../styles/NewPaletteFormStyles';
import seedColors from '../seedColors';
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

  addNewColor = newColor => {
    this.setState({ colors: [...this.state.colors, newColor] });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = newPalette => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = this.state.colors;
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  };
  removeColor = name => {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== name)
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
    var colors = this.state.colors;
    colors.sort(function(a, b) {
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
    var allColors = seedColors.map(p => p.colors).flat();
    var random;
    var randomColor;
    var duplicate = true;
    //check if color exists
    while (duplicate) {
      // select random color from saved palettes
      random = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[random];
      duplicate = this.state.colors.some(
        color => color.name === randomColor.name
      );
    }
    this.setState({
      colors: [...this.state.colors, randomColor]
    });
  };

  generatePalette = () => {
    var allColors = seedColors.map(p => p.colors).flat();
    var colorsGenerated = this.state.colors;
    for (
      var index = this.state.colors.length;
      index < this.props.maxColors;
      index++
    ) {
      var random, randomColor;
      var duplicate = true;
      //check if color exists
      while (duplicate) {
        // select random color from saved palettes
        random = Math.floor(Math.random() * allColors.length);
        randomColor = allColors[random];
        if (colorsGenerated !== []) {
          duplicate = colorsGenerated.some(
            color => color.name === randomColor.name
          );
        }
      }
      colorsGenerated = [...colorsGenerated, randomColor];
    }
    this.setState({
      colors: colorsGenerated
    });
  };

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
          sortColors={this.sortColors}
        />
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
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
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColor={this.removeColor}
            axis='xy'
            onSortEnd={this.onSortEnd}
            distance={20}
          />
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
