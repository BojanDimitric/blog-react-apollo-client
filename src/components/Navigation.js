import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { store } from '../store'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    iconButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
}));

const Navigation = () => {
    const { state } = useContext(store);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu' className={classes.iconButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>
                        Blog
                    </Typography>
                    {
                        state.token !== null
                            ? <Button color='inherit' component={Link} to='/logout'>Logout</Button>
                            : <Button color='inherit' component={Link} to='/login'>Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navigation;