import React, { PureComponent } from 'react';
import { withStyles } from 'tss-react/mui';
import styles from '../styles/MiniPaletteStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
class MiniPalette extends PureComponent {
  deletePalette = (e) => {
    e.stopPropagation();
    this.props.openDialog(this.props.id);
  };
  render() {
    const { classes, paletteName, emoji, colors, id } = this.props;
    const miniColorBoxes = colors.map((color) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    ));

    return (
      <div className={classes.root}>
        <IconButton
          className={`${classes.deleteIcon} palette-delete`}
          onClick={this.deletePalette}
          aria-label={`Delete ${paletteName}`}
        >
          <DeleteIcon />
        </IconButton>

        <Link
          className={classes.paletteLink}
          to={`/palette/${id}`}
          aria-label={`Open ${paletteName}`}
        >
          <div className={classes.colors}>{miniColorBoxes} </div>
          <h5 className={classes.title}>
            {paletteName}
            <span className={classes.emoji}>{emoji}</span>
          </h5>
        </Link>
      </div>
    );
  }
}
export default withStyles(MiniPalette, styles);
