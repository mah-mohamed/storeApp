import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export async function protectedRoute (req , res ,next){
try {
		const accessToken = req.cookies.access_token;
		if (!accessToken) {
			return res.status(401).json({ message: "Unauthorized - No access token provided" });
		}
		try {
			const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
			const user = await User.findById(decoded.user).select("-password");
			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}
			req.user = user;
			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
}


export function adminRoute(req,res,next){
    
    if( req.user.role ==='admin'){
		res.json({ip:req.ip ,info :req.headers["user-agent"] })
        // next()
    }
    else {
        return res.status(403).json({message : 'Unauthorized - admin only'})
}
}
export async function protectdRoute(req,res,next){
	try {
		const accessToken = req.cookies.access_token
		if ( ! accessToken) return res.status(400).json({message: 'unfound access token '})
		const decoded = jwt.verify(accessToken, ACCESS_SECRET)
	    if ( ! decoded ) return res.status(400).json({message : 'invalid access token'})
		const isFound = await User.findById(decoded.user).select('-password')
	    if ( ! isFound) return res.status(401).json({message : 'Unauthorized user'})
		req.user = isFound
	    next()
		}
	catch (error) {
		console.log('error in protectedRoute',error)
		res.status(400).json({message : error.message})
	}
}