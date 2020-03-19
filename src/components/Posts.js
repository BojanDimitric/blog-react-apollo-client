import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { postsQuery, createPostQuery, updatePostQuery } from '../queries'

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
    back: {
        marginTop: theme.spacing(3)
    },
    typography: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    update: {
        marginTop: theme.spacing(1)
    }
}));

const Posts = props => {
    const classes = useStyles();

    const history = useHistory();

    let category;
    let title;
    let body;

    const { data: { posts } = {} } = useQuery(postsQuery, { variables: { blog: props.location.state.blog } });
    const [setCreate, {}] = useMutation(createPostQuery);

    const reset = () => {
        category.value = '';
        title.value = '';
        body.value = '';
    };

    const submit = e => {
        e.preventDefault();
        if (category.value.trim() && title.value.trim() && body.value.trim()) {
            setCreate({ 
                variables: { category: category.value.trim(), title: title.value.trim(), body: body.value.trim(), blog: props.location.state.blog },
                refetchQueries: [{ query: postsQuery, variables: { blog: props.location.state.blog } }] 
            })
                .catch(err => console.log(err));
            reset();
        };
    };

    return (
        <Container fixed>
            <div className={classes.root}>
                <Button
                    type='button'
                    variant='contained'
                    color='primary'
                    fullWidth
                    className={classes.back}
                    onClick={() => history.goBack()}
                >
                    Back!
                </Button>
                <Typography 
                    variant='h3' 
                    component='h3'
                    align='center'
                    color='textSecondary' 
                    className={classes.typography}
                >
                    Your Posts ...
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <List component="nav">
                                {
                                    posts 
                                        ? posts.map(item => (
                                            <ListItem button key={item.id}>
                                                <ListItemText 
                                                    primary={item.title} 
                                                    onClick={() => history.push({ pathname: '/post', state: { blog: props.location.state.blog, post: item.id } })}
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
                                    label='Post category'
                                    inputRef={node => category = node}
                                />
                                <TextField 
                                    variant='outlined' 
                                    margin='normal'
                                    size='small'
                                    required
                                    fullWidth
                                    label='Post title'
                                    inputRef={node => title = node}
                                />
                                <TextField 
                                    variant='outlined' 
                                    margin='normal'
                                    size='small'
                                    required
                                    fullWidth
                                    multiline
                                    rows='3'
                                    label='Post body'
                                    inputRef={node => body = node}
                                />
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                >
                                    Create Post!
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Posts;