import {Request, Response} from "express"


export const createCommentByPostIdController = async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.userId);
    res.status(200).json(req.userId)
    return
}