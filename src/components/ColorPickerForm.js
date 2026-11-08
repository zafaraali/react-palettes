import React, { Component } from 'react';
import Button from '@mui/material/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from 'tss-react/mui';
import styles from '../styles/ColorPickerFormStyles';
import { readableText } from '../contrast';
class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: 'teal',
      newColorName: ''
    };
  }
  componentDidMount() {
    // custom rule will have name 'isColorNameUnique'
    ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', (_value) =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isColorNameUnique');
    ValidatorForm.removeValidationRule('isColorUnique');
  }

  updateCurrentColor = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addNewColor(newColor);
    this.setState({
      newColorName: ''
    });
  };
  render() {
    const { paletteFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
          <TextValidator
            id='color-name'
            variant='filled'
            margin='normal'
            className={classes.colorNameInput}
            placeholder='Color Name'
            inputProps={{ 'aria-label': 'Color Name' }}
            value={newColorName}
            name='newColorName'
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'Enter a color name',
              'Color name is already in use',
              'Color already in use'
            ]}
          />
          <Button
            className={classes.addColor}
            variant='contained'
            color='primary'
            style={{
              backgroundColor: paletteFull ? 'gainsboro' : currentColor,
              color: paletteFull ? undefined : readableText(currentColor)
            }}
            type='submit'
            disabled={paletteFull}
          >
            {paletteFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}
export default withStyles(ColorPickerForm, styles);
