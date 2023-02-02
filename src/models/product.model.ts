import User from '../types/user.types'
import db from '../database'

class UserModel {
  // create
  async signUp(user: User): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO users (userEmail , user_name , first_name , last_name , userPassword) values ($1 , $2 , $3 , $4 , $5) returning *`

      const result = await connection.query(sql, [
        user.userEmail,
        user.user_name,
        user.first_name,
        user.last_name,
        user.userPassword
      ])
      connection.release()

      return result?.rows[0]
    } catch (err: any) {
      throw new Error(`Error ${user.user_name} , ${err.message}an't create user ${user.user_name} `)
    }
  }

  
  async loginUser(userEmail: string, userPassword: string): Promise<User | undefined> {
    try {
      const connection = await db.connect()
      const result = await connection.query(`SELECT userPassword FROM users WHERE userEmail=$1`, [userEmail])
      if (result.rows.length) {
        const datauserPassword = result.rows[0].userPassword
        if (datauserPassword === userPassword) {
          const userresult = await connection.query(
            `SELECT id ,user_name , first_name , last_name , password FROM users WHERE userEmail=$1`,
            [userEmail]
          )

          return userresult.rows[0]
        }
      }
      connection.release()
    } catch (err: any) {
      throw new Error(`Error  , ${err.message}an't create user ${userEmail} `)
    }
  }
}

export default UserModel
