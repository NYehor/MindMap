const statuses = ['own', 'sharable', 'trash'];

export default {
    name: 'languages',
    category: null,
    status: statuses[0],
    nodes: [
        {
            node: {
                name: 'languages'
            },
            parent: {}
        },
        {
            node: {
                name: 'classic'
            },
            parent: {
                name: 'languages'
            }
        },
        {
            node: {
                name: 'backend'
            },
            parent: {
                name: 'languages'
            }
        },
        {
            node: {
                name: 'frontend'
            },
            parent: {
                name: 'languages'
            }
        },
        {
            node: {
                name: 'mobile'
            },
            parent: {
                name: 'languages'
            }
        },
        {
            node: {
                name: 'C++'
            },
            parent: {
                name: 'classic'
            }
        },
        {
            node: {
                name: 'Pascal'
            },
            parent: {
                name: 'classic'
            }
        },
        {
            node: {
                name: 'C'
            },
            parent: {
                name: 'classic'
            }
        }
    ],
    largeSnippets: []
}