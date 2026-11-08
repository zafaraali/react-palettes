import React, { Component, lazy, Suspense } from 'react';
const EmojiPicker = lazy(() => import('./EmojiPicker')); 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'form',
      newPaletteName: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }
  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPaletteNameUnique');
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false }, this.props.hideForm);
  };
  changeStage = () => {
    this.setState({
      stage: 'emoji'
    });
  };
  savePalette = (emoji) => {
    const palette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    };
    this.props.handleSubmit(palette);
    this.setState({
      stage: ''
    });
  };

  render() {
    const { newPaletteName, stage } = this.state;
    const { hideForm } = this.props;

    return (
      <>
        <Dialog
          aria-labelledby='emoji-dialog-title'
          open={stage === 'emoji'}
          onClose={hideForm}
          PaperProps={{ className: 'paletteMetaPaper' }}
        >
          <DialogTitle id='emoji-dialog-title'>
            Pick a Palette Emoji
          </DialogTitle>

          {stage === 'emoji' && <Suspense fallback={<div role='status'>Loading emojis…</div>}><EmojiPicker onSelect={this.savePalette} /></Suspense>}
        </Dialog>
        <Dialog
          open={stage === 'form'}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
          PaperProps={{ className: 'paletteMetaPaper' }}
        >
          <DialogTitle id='form-dialog-title'>Enter a Palette Name</DialogTitle>
          <ValidatorForm onSubmit={this.changeStage}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new palette.
              </DialogContentText>
              <TextValidator
                id='palette-name'
                label='Palette Name'
                value={newPaletteName}
                name='newPaletteName'
                fullWidth
                margin='normal'
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette Name', 'Name already used']}
              />
            </DialogContent>
            <DialogActions>
              <Button color='primary' onClick={hideForm}>
                Cancel
              </Button>
              <Button variant='contained' color='primary' type='submit'>
                Save Palette Name
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </>
    );
  }
}
export default PaletteMetaForm;
