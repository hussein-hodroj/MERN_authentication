//json web token 

import jwt from 'jsonwebtoken'; 

//create the token
//we need to add the userId in the payload this is the way that jwt works because we need it when we validate the token.
const generateToken = (res, userId) => {
const token = jwt.sign ({ userId }, process.env.JWT_SECRET, { 
    expiresIn : '30d'
});
// save it in a cookie
res.cookie ('jwt', token , {
    httpOnly: true, 
    //krmel mtl l https w nehna bl url localhost ma mnsta3mel https fa mnhot hayde l secure
    //in development it will be faulse but if it is not development it will be true (https)
    secure: process.env.NODE_ENV !== 'development', 
    //prevent crf attacks 
    sameSite: 'strict', 
    //when does it expires hon hatayneha 30 yom hek l function l ela
    maxAge: 30 * 24 * 60 * 60* 1000 
    });
};

export default generateToken;
