import { Request, Response } from "express";
import db from "../database"


export async function index(req: Request, res: Response): Promise<void> {
    try {
        const result = await db.query('SELECT * FROM users ORDER BY id ASC')
        res.status(200).json(result.rows)


    }catch (e){
        console.error(e)
    }
      
}

export async function create(userObj:any): Promise<any> {
    try {
        console.log("user ==>",userObj)
        const connect = await db.connect()
        const sql = `INSERT INTO users (email,password  , firstname , lastname ) values ($1 , $2 , $3 , $4 , $5) returning *`
    

      } catch (err: any) {
        console.error(err)
      }
}

export async function update(req: Request, res: Response): Promise<void> {
    try {
        const connect = await db.connect()
      
        let results = await db.query('UPDATE users SET name = $1, userEmail = $2 WHERE id = $3', [req.body.userEmail, req.body.userEmail, req.body.userEmail])

        connect.release()
        res.status(200).send(`edited: ${req.body.userEmail}`)

      } catch (err: any) {
        console.error(err)
      }
}


export async function read(req: Request, res: Response): Promise<void> {


    const result = await db.query('SELECT * FROM users WHERE id = $1', [req.body.id])
    res.status(200).json(result.rows)

}


