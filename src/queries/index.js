import { gql } from 'apollo-boost';

const createUserQuery = gql`
    mutation createUser($mail: String!, $pass: String!) {
        createUser(mail: $mail, pass: $pass) {
            id,
            mail,
            pass
        }
    }`
;

const loginUserQuery = gql`
    mutation loginUser($mail: String!, $pass: String!) {
        loginUser(mail: $mail, pass: $pass) {
            user,
            token,
            expiry
        }
    }
`;

const blogsQuery = gql`
    query blogs($user: ID!) {
        blogs(user: $user) {
            id,
            name,
            user {
                id
            }
        }
    } 
`;

const createBlogQuery = gql`
    mutation createBlog($name: String!, $user: ID!) {
        createBlog(name: $name, user: $user) {
            id,
            name,
            user {
                id
            }
        }
    }
`;

const postQuery = gql`
    query post($id: ID!) {
        post(id: $id) {
            id,
            category,
            title,
            body,
            blog {
                id,
                name
            }
            comments {
                id,
                comment
            }
        }
    } 
`;

const postsQuery = gql`
    query posts($blog: ID!) {
        posts(blog: $blog) {
            id,
            category,
            title,
            body,
            blog {
                id,
                name
            }
            comments {
                id,
                comment
            }
        }
    } 
`;

const createPostQuery = gql`
    mutation createPost($category: String!, $title: String!, $body: String!, $blog: ID!) {
        createPost(category: $category, title: $title, body: $body, blog: $blog) {
            id,
            category,
            title,
            body,
            blog {
                id,
                name
            }
            comments {
                id,
                comment
            }
        }
    }
`;

const updatePostQuery = gql`
    mutation updatePost($id: ID!, $category: String!, $title: String!, $body: String!, $blog: ID!) {
        updatePost(id: $id, category: $category, title: $title, body: $body, blog: $blog) {
            id,
            category,
            title,
            body,
            blog {
                id,
                name
            }
            comments {
                id,
                comment
            }
        }
    }
`;

const deletePostQuery = gql`
    mutation deletePost($id: ID!) {
        deletePost(id: $id) {
            id,
            category,
            title,
            body,
            blog {
                id,
                name
            }
            comments {
                id,
                comment
            }
        }
    }
`;

const createCommentQuery = gql`
    mutation createComment($comment: String!, $post: ID!) {
        createComment(comment: $comment, post: $post) {
            id,
            comment,
            post {
                id
            }
        }
    }
`;

const deleteCommentsQuery = gql`
    mutation deleteComments($post: ID!) {
        deleteComments(post: $post) {
            id,
            comment,
            post {
                id
            }
        }
    }
`;

export {
    createUserQuery,
    loginUserQuery,
    blogsQuery,
    createBlogQuery,
    postQuery,
    postsQuery,
    createPostQuery,
    updatePostQuery,
    deletePostQuery,
    createCommentQuery,
    deleteCommentsQuery
};