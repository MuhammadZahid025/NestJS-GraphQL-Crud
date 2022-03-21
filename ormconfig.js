module.exports = {
    username: 'postgres',
    type: 'postgres',
    host: "localhost",
    password : "1234",
    database :"graphql-crud",
    port: 5432,
    entities: ['dist/**/*.entity{.js, .ts}'],
    synchronize: false,
    migrations: ['dist/migrations/*{.js, .ts}'],
    cli: { migrationsDir: 'src/migrations'}
}
