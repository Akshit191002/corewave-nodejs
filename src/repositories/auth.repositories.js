const UserModel = require('../../src/models/auth.model.js');
class AuthRepository {
    async createUser(req) {
        try {
            const insertQuery = await UserModel.create({
                mobile: req.mobile,
                otp: req.otp
                
            });
            return insertQuery;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(query, updateData) {
        try {
            const updateQuery = await UserModel.findOneAndUpdate(query, updateData, { new: true });
            return updateQuery
        } catch (error) {
            throw error
        }
    }

    async alreadyExists(query) {
        try {
            const user = await UserModel.findOne(query);
            if (user) {
                return true;
            }
            return false;
        } catch (error) {
            throw error
        }
    }

    async findUserByMobile(mobile) {
        try{
            const user = await UserModel.findOne(mobile);
            return user
        } catch(error){
            throw error
        }
    }
}

module.exports = AuthRepository;
