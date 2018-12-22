import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

// Demo user data
const users = [
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

const posts = [
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

const comments = [
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
// Type Definitions (schema)

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
        comment: Comment!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID! ): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean
        author: User! 
        comments: [Comment!]!
        
        
    }

    type Comment {
        id: ID!
        text: String!
        post: Post!
        author: User!
        
    }
`

// Resolvers

const resolvers = {
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
            const emailTaken = users.some(user => user.email === args.email)
            if (emailTaken) {
                throw new Error(
                    'That email address is taken.  Please try again, with another email.'
                )
            }

            const user = {
                id: uuidv4(),
                ...args
            }
            console.log(user)
            users.push(user)
            return user
        },

        createPost(parent, args, ctx, info) {
            const userExists = users.some(user => user.id === args.author)
            if (!userExists) {
                throw new Error('User not found.')
            }

            const post = {
                id: uuidv4(),
                ...args
            }

            posts.push(post)
            return post
        },

        createComment(parent, args, ctx, info) {
            const userExists = users.some(user => user.id === args.author)
            const postExists = posts.some(
                post => post.id === args.post && post.published
            )

            if (!userExists || !postExists) {
                throw new Error('Unable to find the user or post.')
            }

            const comment = {
                id: uuidv4(),
                ...args
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

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Server is running!')
})
