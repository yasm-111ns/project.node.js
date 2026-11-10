import bcrypt from "bcrypt";


class HashService{
    async hashPassword(password){
        try{
            const salt = await bcrypt.genSalt(10)

            const hash = await bcrypt.hash(password , salt)
            console.log(hash);
             return hash
        }catch(err){

        }
    }

    async comparePassword(password, hashPassword){
        try {
            return bcrypt.compare(password , hashPassword)
        } catch (error) {
            throw new Error("Ошибка при сравнении пароля")
        }
    }
}

export default new HashService();