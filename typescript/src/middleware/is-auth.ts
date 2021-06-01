// import session from 'express-session';
import { Response, NextFunction } from "express";

export default (req: any, res: Response, next: NextFunction) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}