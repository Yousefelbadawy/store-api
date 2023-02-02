import Order from '../types/order.types'
import db from '../database'
import User from '../types/user.types'

class OrderModel {
  // create
  async create(user: User): Promise<User> {
    try {
      const connect = await db.connect()
      const sql = `INSERT INTO users (email , user_name , first_name , last_name , password) values ($1 , $2 , $3 , $4 , $5) returning *`

      const result = await connect.query(sql, [
        user.userEmail,
        user.user_name,
        user.first_name,
        user.last_name,
        user.userPassword
      ])
      connect.release()

      return result?.rows[0]
    } catch (err: any) {
      throw new Error(`Error `)
    }
  }

  async login(userEmail: string, userPassword: string): Promise<User | undefined> {
    try {
      const connect = await db.connect()
      const result = await connect.query(`SELECT password FROM users WHERE email=$1`, [userEmail])
      if (result.rows.length) {
        const datauserPassword = result.rows[0].userPassword
        if (datauserPassword === userPassword) {
          const userresult = await connect.query(
            `SELECT id ,user_name , first_name , last_name , password FROM users WHERE email=$1`,
            [userEmail]
          )

          return userresult.rows[0]
        }
      }
      connect.release()
    } catch (err: any) {
      throw new Error(`Error `)
    }
  }
}

export default OrderModel
