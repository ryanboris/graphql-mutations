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

export { users, posts, comments }
