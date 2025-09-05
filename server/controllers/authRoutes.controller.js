import User from "../models/user.model.js"
import { redis } from "../lib/redis.js"
import  jwt  from "jsonwebtoken"
 function generateTokens(userId){
    const accessToken =  jwt.sign({user : userId},process.env.ACCESS_SECRET, {
        expiresIn : 15*60
    })
    const refreshToken = jwt.sign({user :userId},process.env.REFRESH_SECRET, {
        expiresIn : 7*24*60*60
    })
    return { accessToken, refreshToken}
}
async function storeRefreshToken(userId,refreshToken){
    await redis.set(`refresh_token:${userId}`,refreshToken,'EX',7*24*60*60)
}
 function setCookie(res , accessToken,refreshToken){
     res.cookie('access_token',accessToken,{
        httpOnly : true ,//xss
        secure : process.env.NODE_ENV==="production",
        sameSite : 'strict' ,//CSRF
        maxAge : 15*60*1000
    })
     res.cookie('refresh_token',refreshToken,{
        httpOnly : true ,//xss
        secure : process.env.NODE_ENV==="production",
        sameSite : 'strict' ,//CSRF
        maxAge : 7*24*60*60*1000
    })
}
export  async function signUpFunc(req ,res){
    const {name , password , email} = req.body
    const preference  = [req.ip,req.headers["user-agent"]]
    try{
    const userExist = await User.findOne({email})
    if(userExist){ return res.status(400).json({userExist,message : 'user already exists'})}
    else{
    const user = new User({name, password, email , preference})
    await user.save()
// auth
    const { accessToken, refreshToken} = generateTokens(user._id)
    await storeRefreshToken(user._id,refreshToken)
     setCookie(res,accessToken,refreshToken)

    return res.status(200).json({user:{
        id : user._id,
        name : user.name,
        email : user.email
    },
        message : "user created succsefully"})
    }}catch(e){
     return res.status(400).json({message : "there's an error nigger"})
    }
}



export async function loginFunc(req ,res){
const {_id,name , email , password} = req.body
const user = await User.findOne({email})
if (user && (await user.comparePassword(password))){
    const {accessToken,refreshToken} = generateTokens(user._id)
    await storeRefreshToken(user._id,refreshToken)
    setCookie(res,accessToken,refreshToken)
    res.status(201).json({message : "user logged in !"})
}else{
    res.status(401).json({message : 'invalid email or password'})
}

}


export async function logoutFunc(req ,res){
try{
const refreshToken = req.cookies.refresh_token
if (refreshToken){
    const decoded = jwt.verify(refreshToken,process.env.REFRESH_SECRET)
    console.log(`refresh_token:${decoded.user}`)
    await redis.del(`refresh_token:${decoded.user}`)
}
res.clearCookie("access_token")
res.clearCookie("refresh_token")
res.status(200).json({message : "logout succesfully"})
}catch(e){
res.status(400).json({message : "logout unsuccesfully",error : e.message})

}
}

export async function refreshTokenFunc(req,res){
    try{
     const refreshToken = req.cookies.refresh_token
     if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
     const decoded = jwt.verify(refreshToken,process.env.REFRESH_SECRET)
     const redisToken = await redis.get(`refresh_token:${decoded.user}`)
     if ( decoded && ( redisToken == refreshToken)){
        const accessToken = jwt.sign({user : decoded.user},process.env.ACCESS_SECRET,{expiresIn : '15m'})
        res.cookie('access_token',accessToken,{
        httpOnly : true ,//xss
        secure : process.env.NODE_ENV==="production",
        sameSite : 'strict' ,//CSRF
        maxAge : 15*60*1000
    })
        return res.status(200).json({message: "access token has been refreshed"})
     }else{
      return  res.status(401).json({message: "try next time lil bro"})
     }

    }catch(e){
        console.log('error')
      return res.status(400).json({message: e.message})
    }
}
