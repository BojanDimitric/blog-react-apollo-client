import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import { store } from '../store'

import { createUserQuery, loginUserQuery } from '../queries';

const useStyles = makeStyles(theme => ({
    container: {
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    paper: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    typography: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        color: grey[400]
    },
    label: {
        color: grey[400]
    },
    checkbox: {
        color: grey[400]
    },
    button: {
        textTransform: 'none',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    }
}));

const Login = () => {
    const classes = useStyles();
    
    const { state, dispatch } = useContext(store);
    
    let mail;
    let pass;
    const [mode, setMode] = useState(true);
    const [setCreate, {}] = useMutation(createUserQuery);
    const [setLogin, {}] = useMutation(loginUserQuery);

    const reset = () => {
        mail.value = '';
        pass.value = '';
    };

    const submit = e => {
        e.preventDefault();
        if (mail.value.trim() && pass.value.trim()) {
            if (mode) {
                setLogin({ variables: { mail: mail.value.trim(), pass: pass.value.trim() } })
                    .then(res => {
                        localStorage.setItem('user', res.data.loginUser.user);
                        localStorage.setItem('token', res.data.loginUser.token);
                        const expiry = new Date(new Date().getTime() + res.data.loginUser.expiry * 60 * 60 * 1000);
                        localStorage.setItem('expiry', expiry);
                        dispatch({
                            type: 'login',
                            user: res.data.loginUser.user,
                            token: res.data.loginUser.token,
                            expiry: res.data.loginUser.expiry
                        });
                        setTimeout(() => {
                            localStorage.removeItem('user');
                            localStorage.removeItem('token');
                            localStorage.removeItem('expiry');
                            dispatch({ type: 'logout' });
                        }, expiry.getTime() - new Date().getTime());
                    })
                    .catch(err => console.log(err));
            } else {
                setCreate({ variables: { mail: mail.value.trim(), pass: pass.value.trim() } })
                    .catch(err => console.log(err));
            };
            reset();
        };
    };

    return (
        <Container className={classes.container} component='main' maxWidth='xs'>
            <Paper className={classes.paper}>
                {state.token !== null ? <Redirect to='/blogs' /> : null}
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography className={classes.typography} component="h4" variant="h4">
                    {mode ? 'Login' : 'Sign In'}
                </Typography>
                <form onSubmit={e => submit(e)} noValidate autoComplete='off'>
                    <TextField
                        type='email'
                        variant='outlined'
                        margin='normal'
                        size='small'
                        required
                        fullWidth
                        inputRef={node => mail = node}
                        label='Email'
                    />
                    <TextField
                        type='password'
                        variant='outlined'
                        margin='normal'
                        size='small'
                        required
                        fullWidth
                        inputRef={node => pass = node}
                        label='Password'
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" className={classes.checkbox} />}
                        label="Remember me"
                        className={classes.label}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.button}
                    >
                        {mode ? 'Login' : 'Sign In'}
                    </Button>
                </form>
                <Button
                    type='button'
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.button}
                    onClick={() => setMode(!mode)}
                >
                    Switch to {mode ? 'Sign In' : 'Login'}!
                </Button>
            </Paper>    
        </Container>
    );
};

export default Login;