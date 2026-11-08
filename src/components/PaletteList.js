import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from 'tss-react/mui';
import styles from '../styles/PaletteListStyles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { blue, red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = { openDelete: false, openReset: false, deleteId: '' };
  }
  openDialogDelete = (id) => {
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
  openDialogReset = (id) => {
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
  goToPalette = (id) => {
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
            <div>
              <p className={classes.intro}>Your color library</p>
              <h1 className={classes.heading}>React Palettes</h1>
              <p className={classes.description}>
                A curated space for your favorite color systems.
              </p>
            </div>

            <div className={classes.actions}>
              <Button
                className={classes.resetPalettes}
                onClick={this.resetCheck}
              >
                Reset
              </Button>
              <Button
                className={classes.createPalettes}
                component={Link}
                to='/palette/new'
              >
                Create Palette
              </Button>
            </div>
          </nav>

          {palettes.length === 0 ? (
            <div className={classes.emptyState}>
              <span className={classes.emptyIcon}>✦</span>
              <h2>Your library is empty</h2>
              <p>Create a palette to start building your color library.</p>
              <Button
                className={classes.emptyButton}
                component={Link}
                to='/palette/new'
              >
                Create your first palette
              </Button>
            </div>
          ) : (
            <TransitionGroup className={classes.palettes}>
              {palettes.map((palette) => (
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
          )}
        </div>
        <Dialog
          open={openDelete}
          aria-labelledby='delete-dialog-title'
          onClose={this.closeDialogDelete}
          PaperProps={{ className: 'confirmDialogPaper' }}
        >
          <DialogTitle id='delete-dialog-title'>Delete Palette?</DialogTitle>
          <List>
            <ListItemButton onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CheckIcon></CheckIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItemButton>
            <ListItemButton onClick={this.closeDialogDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CloseIcon></CloseIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItemButton>
          </List>
        </Dialog>
        <Dialog
          open={openReset}
          aria-labelledby='delete-dialog-title'
          onClose={this.closeDialogReset}
          PaperProps={{ className: 'confirmDialogPaper' }}
        >
          <DialogTitle id='delete-dialog-title'>
            Reset All Palettes To Default?
          </DialogTitle>
          <List>
            <ListItemButton onClick={this.handleReset}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CheckIcon></CheckIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Reset</ListItemText>
            </ListItemButton>
            <ListItemButton onClick={this.closeDialogReset}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CloseIcon></CloseIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItemButton>
          </List>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(PaletteList, styles);
