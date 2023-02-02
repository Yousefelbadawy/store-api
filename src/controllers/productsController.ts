import { Request, Response } from "express";
import db from "../database"


export async function index(req: Request, res: Response): Promise<void> {
    try {
        const result = await db.query('SELECT * FROM products ORDER BY id ASC')
        res.status(200).json(result.rows)


    }catch (e){
        console.error(e)
    }
      
}

export async function create(req: Request, res: Response): Promise<void> {
    try {
        const connect = await db.connect()
        const sql = `INSERT INTO products (name,price  ) values ($1 , $2) returning *`
    
        const result = await connect.query(sql, [
          req.body.name,
          req.body.price,
        ])
        connect.release()
    
        res.status(200).json(result?.rows[0])

      } catch (err: any) {
        console.log(err)
      }
}

 export async function update(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id)

        const connect = await db.connect()
      
        let result = await db.query('UPDATE products SET name = $1, price = $2 WHERE id = $3', [req.body.name, req.body.price,req.params.id])

        connect.release()

      } catch (err: any) {
        console.log(err)
      }
}


 export async function read(req: Request, res: Response): Promise<void> {


    const result = await db.query('SELECT * FROM products WHERE id = $1', [req.params.id])
    res.status(200).json(result.rows)

}



