import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import styles from '../styles/ColorBoxStyles';
import { withStyles } from '@material-ui/styles';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }
  changCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  };
  render() {
    const {
      name,
      background,
      paletteId,
      id,
      showingFullPalette,
      classes
    } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.changCopyState}>
        <div className={classes.colorBox} style={{ background }}>
          {copied && (
            <div className={`${classes.copyMsg} ${classes.showMsg}`} role='status'>
              Copied <strong>{background}</strong>
            </div>
          )}
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={e => e.stopPropagation()}
            >
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
