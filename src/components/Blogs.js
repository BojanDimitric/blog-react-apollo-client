import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { store } from '../store';
import { blogsQuery, createBlogQuery } from '../queries'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    typography: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }
}));

const Blogs = () => {
    const classes = useStyles();

    const history = useHistory();

    const { state } = useContext(store);

    let name;

    const { data: { blogs } = {} } = useQuery(blogsQuery, { variables: { user: state.user } });
    const [setCreate, {}] = useMutation(createBlogQuery);

    const reset = () => {
        name.value = '';
    };

    const submit = e => {
        e.preventDefault();
        if (name.value.trim()) {
            setCreate({ 
                variables: { name: name.value.trim(), user: state.user },
                refetchQueries: [{ query: blogsQuery, variables: { user: state.user } }] 
            })
                .catch(err => console.log(err));
            reset();
        };
    };

    return (
        <Container fixed>
            <div className={classes.root}>
                <Typography 
                    variant='h3' 
                    component='h3'
                    align='center'
                    color='textSecondary' 
                    className={classes.typography}
                >
                    Your Blogs ...
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <List component="nav">
                                {
                                    blogs 
                                        ? blogs.map(item => (
                                            <ListItem button key={item.id}>
                                                <ListItemText 
                                                    primary={item.name} 
                                                    onClick={() => {
                                                        // console.log('redirect!');
                                                        // return <Redirect to={{ pathname: '/posts', state: { blog: item.id } }} push />;
                                                        // return <Redirect to="/posts" />;
                                                        history.push({ pathname: '/posts', state: { blog: item.id } }); 
                                                    }}
                                                />
                                            </ListItem>
                                        ))
                                        : null
                                }
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <form onSubmit={e => submit(e)} noValidate autoComplete='off'>
                                <TextField 
                                    variant='outlined' 
                                    margin='normal'
                                    size='small'
                                    required
                                    fullWidth
                                    label='Blog name'
                                    inputRef={node => name = node}
                                />
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                >
                                    Create Blog!
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Blogs;