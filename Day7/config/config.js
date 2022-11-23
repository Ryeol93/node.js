module.exports = {
    server_port: 3000,
    db_url: 'mongodb://127.0.0.1:27017/frontend',
    db_schemas: [{file:'./member_schema', collection:'member2', schemaName: 'MemberScheam', modelName: 'MemberMode'}],
    facebook: {
        clientID: '',
        clientSecret: '',
        callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback'
    }
}