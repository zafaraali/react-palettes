import React, { Component } from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
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
    this.setState({ open: false }, this.props.hideForm());
  };
  changeStage = () => {
    this.setState({
      stage: 'emoji'
    });
  };
  savePalette = emoji => {
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
        <Dialog open={stage === 'emoji'} onClose={hideForm}>
          <DialogTitle id='form-dialog-title'>Pick a Palette Emoji</DialogTitle>

          <Picker onSelect={this.savePalette} />
        </Dialog>
        <Dialog
          open={stage === 'form'}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Enter a Palette Name</DialogTitle>
          <ValidatorForm onSubmit={this.changeStage}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new palette.
              </DialogContentText>
              <TextValidator
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
