import { Request, Response } from "express";
import db from "../database"


export async function index(req: Request, res: Response): Promise<void> {
    try {
        const result = await db.query('SELECT * FROM orders ORDER BY id ASC')
        res.status(200).json(result.rows)


    }catch (e){
        console.log(e)
    }
      
}

export async function create(req: Request, res: Response): Promise<void> {
    try {
        const connection = await db.connect()
        const sql = `INSERT INTO orders (user_id,product_id  ) values ($1 , $2) returning *`
    
        const result = await connection.query(sql, [
          req.body.userId,
          req.body.productId,
        ])
        connection.release()
    
        res.status(200).json(result?.rows[0])

      } catch (err: any) {
        console.log(err)
      }
}

export async function update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id)

        const connect = await db.connect()
      
        const result = await db.query('UPDATE orders SET userId = $1, productId = $2 WHERE id = $3', [req.body.userId, req.body.productId,req.params.id])

        connect.release()
        res.status(200).send(`edited the : ${id}`)

      } catch (err: any) {
        console.error(err)
      }
}


 export async function read(req: Request, res: Response){


    const result = await db.query('SELECT * FROM orders WHERE id = $1', [req.params.id])
    

}


