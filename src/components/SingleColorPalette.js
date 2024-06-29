import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/PaletteStyles';
class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = {
      format: 'hex'
    };
  }
  gatherShades = (palette, colorId) => {
    //return all shades of the given color
    let shades = [];
    let allColors = palette.colors;
    for (var key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorId)
      );
    }
    return shades.slice(1);
  };
  changeFormat = val => {
    this.setState({
      format: val
    });
  };
  render() {
    const { paletteName, emoji, id } = this.props.palette;
    const { format } = this.state;
    const { classes } = this.props;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} isSingleColor={true} />
        <div className={classes.colors}>
          {colorBoxes}
          <Link to={`/palette/${id}`} className={classes.goBack}>
            <div className={classes.backBtn}>Go Back</div>
          </Link>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
export default withStyles(styles)(SingleColorPalette);
