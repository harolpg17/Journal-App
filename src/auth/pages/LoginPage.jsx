import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth/thunks'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'

const formData = {
  email: 'harol@gmail.com',
  password: '123456'
};

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(startLoginWithEmailPassword({ email, password }));
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSingIn());
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={ onSubmit }
        className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Correo" 
              type="email" 
              placeholder="correo@gmail.com" 
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange } />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Contraseña" 
              type="passwrord" 
              placeholder="Contraseña" 
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange } />
          </Grid>

          <Grid container
            sx={{ mt: 1 }}
            display={ !!errorMessage ? '' : 'none' }>
            <Grid 
              item 
              xs={ 12 } 
              sm={ 12 } >
                <Alert severity="error">
                  { errorMessage }
                </Alert>
            </Grid>
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                type="submit" 
                variant='contained' 
                fullWidth
                disabled={isAuthenticating}>
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button variant='contained' fullWidth
                disabled={isAuthenticating}
                onClick={ onGoogleSignIn }>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link
              component={ RouterLink }
              color='inherit'
              to='/auth/register'>
              <Typography variant='body2'>
                Crear una cuenta
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
