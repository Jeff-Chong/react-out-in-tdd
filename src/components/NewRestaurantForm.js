import React, {useState} from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import {createRestaurant} from '../store/restaurants/actions';

export function NewRestaurantForm({createRestaurant}) {
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [serverError, setServerError] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();
    if (name) {
      setValidationError(false);
      setServerError(false);
      createRestaurant(name)
        .then(() => {
          setName('');
        })
        .catch(() => {
          setServerError(true);
        });
    } else {
      setValidationError(true);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      {serverError && (
        <Alert severity="error">当前餐馆名不能被保存，请重新尝试</Alert>
      )}
      {validationError && <Alert severity="error">名字不能忽略</Alert>}
      <TextField
        value={name}
        onChange={event => setName(event.target.value)}
        placeholder="Add Restaurant"
        fullWidth
        variant="filled"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        data-testid="new-restaurant-submit-button"
      >
        Add
      </Button>
    </form>
  );
}

const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
