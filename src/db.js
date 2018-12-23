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
        body: 'Blahahahahahhahahalbla aldkjfkalj  adsfljaa',
        published: true,
        author: '2'
    },
    {
        id: '12',
        title: 'B POST',
        body: 'more and more and more and more and more ',
        published: false,
        author: '2'
    },
    {
        id: '13',
        title: 'C',
        body: 'and another one and another one',
        published: true,
        author: '3'
    }
]

const comments = [
    {
        id: '25',
        text: 'asdfe3',
        post: '11',
        author: '1'
    },
    {
        id: '26',
        text: 'dfgdfgdfgdfg',
        post: '12',
        author: '2'
    },
    {
        id: '27',
        text: 'lorem ipsummmm',
        post: '12',
        author: '2'
    },
    {
        id: '28',
        text: 'aads3addsfasfe33333333333',
        post: '12',
        author: '2'
    },
    {
        id: '29',
        text: 'lorem ipsummmm',
        post: '13',
        author: '3'
    },
    {
        id: '30',
        text: 'lorem ipsummmm',
        post: '12',
        author: '2'
    },
    {
        id: '31',
        text: 'lorem ipsummmm',
        post: '12',
        author: '2'
    }
]

const db = {
    users,
    posts,
    comments
}

export { db as default }
