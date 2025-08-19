import jwt from 'jsonwebtoken';
const userAuth=async(req, res, next)=>{
    try{
        console.log("user auth called");
       const authHeader = req.headers?.authorization;
        if(!authHeader)
        {
            return res.status(401).json({message:" Not Authorized Login again"});
        }

        const mainToken = authHeader.split(" ")[1];
      
        const decoded=jwt.verify(mainToken, process.env.JWT_SECRET_KEY);
         if (!decoded?.id) {
            return res.status(403).json({ message: "Invalid user Credentials" });
        }
        req.user=decoded.id;
        next();

    }catch(err)
    {
        console.log("user auth error");
        console.log(err.message);

      return res.status(500).json({message:"Internal server error"+err.message});
    }
}
export default userAuth;
