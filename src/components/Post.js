import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { postQuery, updatePostQuery, deletePostQuery, createCommentQuery, deleteCommentsQuery } from '../queries'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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
    post: {
        textAlign: 'left'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }
}));

const Post = props => {
    const classes = useStyles();

    const history = useHistory();

    let comment;

    let category;
    let title;
    let body;

    const { data: { post } = {} } = useQuery(postQuery, { variables: { id: props.location.state.post } });
    const [setCreateComment, { }] = useMutation(createCommentQuery);
    const [setDeleteComments, { }] = useMutation(deleteCommentsQuery);
    const [setUpdatePost, { }] = useMutation(updatePostQuery);
    const [setDeletePost, { }] = useMutation(deletePostQuery);

    const resetComment = () => {
        comment.value = '';
    };

    const resetPost = () => {
        category.value = '';
        title.value = '';
        body.value = '';
    };

    const submit = e => {
        e.preventDefault();
        if (comment.value.trim()) {
            setCreateComment({
                variables: { comment: comment.value.trim(), post: props.location.state.post },
                refetchQueries: [{ query: postQuery, variables: { id: props.location.state.post } }]
            })
                .catch(err => console.log(err));
            resetComment();
        };
    };

    const remove = e => {
        e.preventDefault();
        setDeletePost({ variables: { id: post.id } })
            .catch(err => console.log(err));
        setDeleteComments({ variables: { post: post.id } })
            .catch(err => console.log(err));
        history.goBack();
    };

    const update = e => {
        e.preventDefault();
        if (category.value.trim() && title.value.trim() && body.value.trim()) {
            setUpdatePost({ 
                variables: { id: props.location.state.post, category: category.value.trim(), title: title.value.trim(), body: body.value.trim(), blog: props.location.state.blog },
                refetchQueries: [{ query: postQuery, variables: { id: props.location.state.post } }] 
            })
                .catch(err => console.log(err));
            resetPost();
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
                    Your Post
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            {
                                post
                                    ? (
                                        <>
                                            <Typography
                                                variant='h5'
                                                component='h5'
                                                color='textSecondary'
                                                className={classes.post}
                                            >
                                                {'Category: ' + post.category}
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                component='h5'
                                                color='textSecondary'
                                                className={classes.post}
                                            >
                                                {'Title: ' + post.title}
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                component='h5'
                                                color='textSecondary'
                                                className={classes.post}
                                            >
                                                {'Body: ' + post.body}
                                            </Typography>
                                            <List component="nav">
                                                {
                                                    post.comments.map(item => (
                                                        <ListItem button key={item.id}>
                                                            <ListItemText
                                                                primary={item.comment}
                                                            />
                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                        </>
                                    )
                                    : null
                            }
                            <form onSubmit={e => remove(e)} noValidate autoComplete='off'>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                >
                                    Delete this Post and Comments!
                                </Button>
                            </form>
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
                                    label='Comment text'
                                    inputRef={node => comment = node}
                                />
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                >
                                    Create Comment!
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <form onSubmit={e => update(e)} noValidate autoComplete='off'>
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
                                    Update Post!
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Post;