import uuidv4 from 'uuid/v4'

/**
 * Dummy Data*
 * @var {object} users
 * @var {object} posts
 * @var {object} comments
 * @export {object} resolvers
 */

let users = [
    {
        id: '1',
        name: 'Ryan',
        email: 'ryan@example.com'
    },
    {
        id: '2',
        name: 'Shiela',
        email: 'shiela@example.com'
    },
    {
        id: '3',
        name: 'Tootie',
        email: 'tootie@example.com'
    }
]

let posts = [
    {
        id: '11',
        title: 'a post',
        body: 'a body',
        published: true,
        author: '2'
    },
    {
        id: '12',
        title: 'a post',
        body: 'more',
        published: false,
        author: '2'
    },
    {
        id: '13',
        title: 'a post',
        body: 'another',
        published: true,
        author: '3'
    }
]

let comments = [
    {
        id: '28',
        text: 'asdfe3',
        post: '11',
        author: '1'
    },
    {
        id: '29',
        text: 'dfgdfgdfgdfg',
        post: '12',
        author: '3'
    },
    {
        id: '30',
        text: 'lorem ipsummmm',
        post: '12',
        author: '3'
    },
    {
        id: '31',
        text: 'aads3addsfasfe33333333333',
        post: '12',
        author: '2'
    }
]

export const resolvers = {
    Query: {
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter(post => {
                return (
                    post.title
                        .toLowerCase()
                        .includes(args.query.toLowerCase()) ||
                    post.body.toLowerCase().includes(args.query.toLowerCase())
                )
            })
        },

        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter(user => {
                return user.name
                    .toLowerCase()
                    .includes(args.query.toLowerCase())
            })
        },

        comments(parent, args, ctx, info) {
            return comments
        },

        me() {
            return {
                id: '12345',
                name: 'mike',
                email: 'yo@yo.com'
            }
        },

        post() {
            return {
                id: '3333',
                title: 'my post',
                body: 'hey there',
                published: false
            }
        },

        comment() {
            return {
                id: '110',
                text: 'yo yo yo',
                post: '11'
            }
        }
    },

    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some(
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

            users.push(user)
            return user
        },

        deleteUser(parent, args, ctx, info) {
            const userIndex = users.findIndex(user => user.id === args.id)
            if (userIndex === -1) {
                throw new Error('User not found.')
            }

            const deletedUsers = users.splice(userIndex, 1)

            posts = posts.filter(post => {
                const match = post.author === args.id

                if (match) {
                    comments = comments.filter(
                        comment => comment.post !== post.id
                    )
                }
                return !match
            })

            comments = comments.filter(comment => comment.author !== args.id)

            return deletedUsers[0]
        },

        createPost(parent, args, ctx, info) {
            const userExists = users.some(user => user.id === args.data.author)
            if (!userExists) {
                throw new Error('User not found.')
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post)
            return post
        },

        createComment(parent, args, ctx, info) {
            const userExists = users.some(user => user.id === args.data.author)
            const postExists = posts.some(
                post => post.id === args.data.post && post.published
            )

            if (!userExists || !postExists) {
                throw new Error('Unable to find the user or post.')
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)
            return comment
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
        },

        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.post === parent.id)
        }
    },

    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => post.author === parent.id)
        },

        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id)
        }
    },

    Comment: {
        post(parent, args, ctx, info) {
            return posts.find(post => post.id === parent.post)
        },

        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
        }
    }
}
