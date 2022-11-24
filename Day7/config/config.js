module.exports = {
    server_port: 3000,
    db_url: 'mongodb://127.0.0.1:27017/frontend',
    db_schemas: [{file:'./member_schema', collection:'member2', schemaName: 'MemberScheam', modelName: 'MemberModel'}],
    facebook: {
        clientID: '1195875968023442',
        clientSecret: '21b0e2fd31753ac87ef618c017b5d712',
        callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback'
    }
}