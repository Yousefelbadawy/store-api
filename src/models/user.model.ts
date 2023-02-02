import User from '../types/user.types'
import bcrypt from 'bcrypt'
import db from '../database'
import * as dotenv from 'dotenv'
dotenv.config()

class UserModel {
  // create
   async signUp(user: User): Promise<User> {
    try {
      const connect = await db.connect()
      const sql = `INSERT INTO users (email , user_name , first_name , last_name , password) values ($1 , $2 , $3 , $4 , $5) returning *`

      const result = await connect.query(sql, [
        user.userEmail,
        user.user_name,
        user.first_name,
        user.last_name,
        hash_password(user.userPassword)
      ])
      connect.release()

      return result?.rows[0]
    } catch (err: any) {
      throw new Error(`Error`)
    }
  }

 
  async loginUser(userEmail: string, userPassword: string): Promise<User | undefined> {
    try {
      const connect = await db.connect()
      const sql = `SELECT password FROM users WHERE email=$1`
      const result = await connect.query(sql, [userEmail])
      if (result.rows.length) {
        const { password: hash_password } = result.rows[0].password
        const isValid = bcrypt.compare(
          `${userPassword}${process.env.BCRYPT_PASSWORD}`,
          hash_password
        )
        if (await isValid) {
          const userresult = await connect.query(
            `SELECT id ,user_name , first_name , last_name , password FROM users WHERE email=$1`,
            [userEmail]
          )

          return userresult.rows[0]
        }
      }
      connect.release()
    } catch (err: any) {
      throw new Error(`Error  `)
    }
  }

  // hash password
}
const hash_password = (pass: string) => {
  const salt = parseInt(process.env.SLART_ROUNDS as string, 10)
  return bcrypt.hash(`${pass}${process.env.BCRYPT_PASSWORD}`, salt)
}
export default UserModel
