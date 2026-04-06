export const requireAuth = (req, res, next) => {
    if (req.session.user){
        next(); //user authenticated, continue to next middleware
    } else {
        res.redirect("/"); // user not authenticated, redirect to login page
    }
}

export const requireAdmin = (req, res, next) => {
    if (!req.session?.user){
        return res.redirect("/"); //if no user session found, redirect to login page
    }

    if (req.session.user.role !== "admin"){
        return res.status(403).send("Forbidden") //if user role is not admin, send forbidden status message
    }

    next();
};

export const requireOfficer = (req, res, next) => {
    if (!req.session?.user){
        return res.redirect("/"); //if no user session found, redirect to login page
    }

    if (req.session.user.role !== "officer"){
        return res.status(403).send("Forbidden") //if user role is not officer, send forbidden status message
    }

    next();
};



