import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/PaletteListStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = { openDelete: false, openReset: false, deleteId: '' };
  }
  openDialogDelete = id => {
    this.setState({
      openDelete: true,
      deleteId: id
    });
  };
  closeDialogDelete = () => {
    this.setState({
      openDelete: false,
      deleteId: ''
    });
  };
  openDialogReset = id => {
    this.setState({
      openReset: true,
      deleteId: id
    });
  };
  closeDialogReset = () => {
    this.setState({
      openReset: false,
      deleteId: ''
    });
  };
  goToPalette = id => {
    this.props.history.push(`/palette/${id}`);
  };
  handleDelete = () => {
    this.props.deletePalette(this.state.deleteId);
    this.closeDialogDelete();
  };
  handleReset = () => {
    this.props.resetPalettes();
    this.closeDialogReset();
  };
  resetCheck = () => {
    this.openDialogReset();
  };

  render() {
    const { palettes, classes } = this.props;
    const { openDelete, openReset } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Palettes</h1>

            <div>
              <Button
                className={classes.resetPalettes}
                onClick={this.resetCheck}
              >
                Reset
              </Button>
              <Button className={classes.createPalettes}>
                <Link to='/palette/new'>Create Palette</Link>
              </Button>
            </div>
          </nav>

          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                <MiniPalette
                  {...palette}
                  goToPalette={this.goToPalette}
                  openDialog={this.openDialogDelete}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDelete}
          aria-labelledby='delete-dialog-title'
          onClose={this.closeDialogDelete}
        >
          <DialogTitle id='delete-dialog-title'>Delete Palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CheckIcon></CheckIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItem>
            <ListItem button onClick={this.closeDialogDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CloseIcon></CloseIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
        <Dialog
          open={openReset}
          aria-labelledby='delete-dialog-title'
          onClose={this.closeDialogReset}
        >
          <DialogTitle id='delete-dialog-title'>
            Reset All Palettes To Default?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleReset}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CheckIcon></CheckIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Reset</ListItemText>
            </ListItem>
            <ListItem button onClick={this.closeDialogReset}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CloseIcon></CloseIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
