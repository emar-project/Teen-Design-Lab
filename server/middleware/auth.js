import jwt from "jsonwebtoken";

const secret = "`rR,%lBXa1NxvIbYVAjB])*d+zWr2?t$>prXh0#(%3,DR@[]b@?GBm4s]f$B$cQ";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, secret);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;