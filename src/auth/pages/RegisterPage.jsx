import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreateUserWithEmailAndPassword } from '../../store/auth/thunks'


const formData = {
  email: 'harol@gmail.com',
  password: '123456',
  displayName: 'Harol'
};

// const formValidations = (formState) => {
//   let errors = {};

//   if (!formState.displayName) {
//     errors.displayName = 'El nombre es requerido';
//   }

//   if (!formState.email) {
//     errors.email = 'El correo es requerido';
//   } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
//     errors.email = 'El correo es inválido';
//   }

//   if (!formState.password) {
//     errors.password = 'La contraseña es requerida';
//   } else if (formState.password.length < 6) {
//     errors.password = 'La contraseña debe tener mínimo 6 caracteres';
//   }

//   return errors;
// }

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una @'],
  password: [(value) => value.length >= 6, 'El password debe tener al menos 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const { 
    formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid 
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) {
      return;
    }

    dispatch(startCreateUserWithEmailAndPassword(formState));
  }

  return (
    <AuthLayout title='Crear cuenta'>

      <h1>FormValid: { isFormValid ? 'Válido' : 'Invalido' }</h1>

      <form onSubmit={ onSubmit }
        className="animate__animated animate__fadeIn animate__faster">
        <Grid container>

        <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text" 
              placeholder="Nombre completo" 
              fullWidth
              name="displayName"
              value={displayName}
              onChange={ onInputChange } 
              error={ !!displayNameValid && formSubmitted }
              helperText={ displayNameValid }/>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Correo" 
              type="email" 
              placeholder="correo@gmail.com" 
              fullWidth
              name="email"
              value={email}
              onChange={ onInputChange }
              error={ !!emailValid && formSubmitted }
              helperText={ emailValid } />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Contraseña" 
              type="passwrord" 
              placeholder="Contraseña" 
              fullWidth
              name="password"
              value={password}
              onChange={ onInputChange }
              error={ !!passwordValid && formSubmitted }
              helperText={ passwordValid } />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
          <Grid 
            item 
            xs={ 12 } 
            sm={ 12 }
            display={ !!errorMessage ? '' : 'none' }>
              <Alert severity="error">
                { errorMessage }
              </Alert>
            </Grid>

            <Grid item xs={ 12 } sm={ 12 }>
              <Button type="submit" variant='contained' disabled={isCheckingAuthentication} fullWidth >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>
              ¿Ya tienes una cuenta?  
            </Typography>
            <Link
              component={ RouterLink }
              color='inherit'
              to='/auth/login'>
              <Typography variant='body2'>
                ingresar
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
