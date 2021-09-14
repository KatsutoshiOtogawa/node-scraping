import { createConnection } from 'typeorm'
import { User } from './entity/User'

async function seed () {
  createConnection().then(async connection => {
    connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { firstName: 'Timber', lastName: 'Saw', age: 13, email: 'hello@example.com', password: 'abcde' },
        { firstName: 'Phantom', lastName: 'Lancer', age: 13, email: 'aaa@example.com', password: 'abcdefg' }
      ])
      .execute()
  }).catch(error => console.log(error))
  // await getConnection()
  //   .createQueryBuilder()
  //   .insert()
  //   .into(User)
  //   .values([
  //     { firstName: 'Timber', lastName: 'Saw', age: 13, email: 'hello@example.com', password: 'abcde' },
  //     { firstName: 'Phantom', lastName: 'Lancer', age: 13, email: 'aaa@example.com', password: 'abcdefg' }
  //   ])
  //   .execute()
}

export {
  seed
}
