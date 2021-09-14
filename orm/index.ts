import 'reflect-metadata'
export { User } from './entity/User'
export { Photo } from './entity/Photo'
export { Log } from './entity/Log'
export { seed } from './seed'

// import { createConnection } from 'typeorm'
// import { User } from './entity/User'

// createConnection().then(async connection => {
// console.log('Inserting a new user into the database...')
// const user = new User()
// user.firstName = 'Timber'
// user.lastName = 'Saw'
// user.age = 25
// await connection.manager.save(user)

// console.log('Saved a new user with id: ' + user.id)

// console.log('Loading users from the database...')
// const users = await connection.manager.find(User)
// console.log('Loaded users: ', users)

// console.log('Here you can setup and run express/koa/any other framework.')
// }).catch(error => console.log(error))
