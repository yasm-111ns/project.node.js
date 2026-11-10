
import User from "../models/User.js";
import hashService from "../service/hashService.js";

class UserController{
    async registration(req , res){
        
       try {
        const {name , lastName, phoneNumber , email , password} = req.body

        const hashPassword =await  hashService.hashPassword(password)
        console.log(hashPassword);
        
        const user = await User.create({
            name , 
            lastName, 
            phoneNumber , 
            email , 
            password: hashPassword
        })
        res.status(200).json("Регистрация прошла успешно!")
       } catch (error) {
        throw new Error("Ошибка при хэшировании пароля")
        
       }
    }

    async login(req, res){
        try {
            const{email, password} = req.body

            const user = await User.findOne({email})

            if(!User){
              return  res.status(400).json("Неверный логин или пароль")
            }

            const isPathValid = await hashService.comparePassword(password, user.password)

            if(!isPathValid){
              return  res.status(400).json("неверный логин или пароль")
            }
          
            return res.json(user)
            
        } catch (error) {
            
        }
    }
    

}

export default new UserController()