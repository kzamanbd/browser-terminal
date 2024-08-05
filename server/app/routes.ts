import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        title: 'Express Testing',
        message: 'The app is working properly!',
        users: `${req.protocol}://${req.get('host')}${req.originalUrl}api/users`,
        frontend: 'http://localhost:3000'
    });
});

export default router;
