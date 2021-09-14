import { createConnection } from 'typeorm'
import { User } from '../../orm'

/**
 * パスワード認証を行う。
 * @param email ユーザーのemailaddress
 * @param password ハッシュ化されたパスワード
 * @returns Userが存在するときはUser,認証に失敗したらundifined
 */
async function passwordAuthentication (email: string, password: string): Promise<void |User | undefined> {
  const user = createConnection().then(async connection => {
    const userRepository = connection.getRepository(User)

    const user = await userRepository.findOne({
      email: email,
      password: password
    })
    console.log(user)

    return user
  }).catch(error => console.log(error))

  return user
}

export {
  passwordAuthentication
}
