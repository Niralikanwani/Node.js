import { Response, NextFunction } from "express";

export const get404 = (req: any, res: Response, next: NextFunction) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    path: '/404',
    isAuthenticated: req.session.isLoggedIn
  });
};
