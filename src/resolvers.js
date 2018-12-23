import uuidv4 from 'uuid/v4'

export const resolvers = {
    Query: {
        posts(parent, args, { db }, info) {
            if (!args.query) {
                return db.posts
            }

            return db.posts.filter(post => {
                return (
                    post.title
                        .toLowerCase()
                        .includes(args.query.toLowerCase()) ||
                    post.body.toLowerCase().includes(args.query.toLowerCase())
                )
            })
        },

        users(parent, args, { db }, info) {
            if (!args.query) {
                return db.users
            }

            return db.users.filter(user => {
                return user.name
                    .toLowerCase()
                    .includes(args.query.toLowerCase())
            })
        },

        comments(parent, args, { db }, info) {
            return db.comments
        }
    },

    Mutation: {
        createUser(parent, args, { db }, info) {
            const emailTaken = db.users.some(
                user => user.email === args.data.email
            )
            if (emailTaken) {
                throw new Error(
                    'That email address is taken.  Please try again, with another email.'
                )
            }

            const user = {
                id: uuidv4(),
                ...args.data
            }

            db.users.push(user)
            return user
        },

        deleteUser(parent, args, { db }, info) {
            const userIndex = db.users.findIndex(user => user.id === args.id)
            if (userIndex === -1) {
                throw new Error('User not found.')
            }

            const deletedUsers = db.users.splice(userIndex, 1)

            db.posts = db.posts.filter(post => {
                if (post.author === args.id) {
                    db.comments = db.comments.filter(
                        comment => comment.post !== post.id
                    )
                }
                return !match
            })

            db.comments = db.comments.filter(
                comment => comment.author !== args.id
            )

            return deletedUsers[0]
        },

        createPost(parent, args, { db }, info) {
            const userExists = db.users.some(
                user => user.id === args.data.author
            )
            if (!userExists) {
                throw new Error('User not found.')
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }

            db.posts.push(post)
            return post
        },

        deletePost(parent, args, { db }, info) {
            const postIndex = db.posts.findIndex(post => post.id === args.id)

            if (postIndex === -1) {
                throw new Error('Post not found.')
            }

            const deletedPosts = db.posts.splice(postIndex, 1)

            db.comments = db.comments.filter(
                comment => comment.post !== args.id
            )

            return deletedPosts[0]
        },

        createComment(parent, args, { db }, info) {
            const userExists = db.users.some(
                user => user.id === args.data.author
            )
            const postExists = db.posts.some(
                post => post.id === args.data.post && post.published
            )

            if (!userExists || !postExists) {
                throw new Error('Unable to find the user or post.')
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            db.comments.push(comment)
            return comment
        },

        deleteComment(parent, args, { db }, info) {
            const commentIndex = db.comments.findIndex(
                comment => comment.id === args.id
            )

            if (commentIndex === -1) {
                throw new Error('Comment not found.')
            }

            const deletedComments = db.comments.splice(commentIndex, 1)

            return deletedComments[0]
        }
    },
    Post: {
        author(parent, args, { db }, info) {
            return db.users.find(user => user.id === parent.author)
        },

        comments(parent, args, { db }, info) {
            return db.comments.filter(comment => comment.post === parent.id)
        }
    },

    User: {
        posts(parent, args, { db }, info) {
            return db.posts.filter(post => post.author === parent.id)
        },

        comments(parent, args, { db }, info) {
            return db.comments.filter(comment => comment.author === parent.id)
        }
    },

    Comment: {
        post(parent, args, { db }, info) {
            return db.posts.find(post => post.id === parent.post)
        },

        author(parent, args, { db }, info) {
            return db.users.find(user => user.id === parent.author)
        }
    }
}
