import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var passwordHashed = bcrypt.hashSync(password, salt);
      resolve(passwordHashed);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExits = await checkUserEmail(email);
      if (isExits) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Password is wrong!!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User is not found!!";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "User is not exits. Please try other email!!";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = async (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
        if (!users) {
          resolve({});
        }
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (!check) {
        let hashPassWord = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPassWord,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
        });
        resolve({
          errCode: 0,
          message: "OK",
        });
      } else {
        resolve({
          errCode: 1,
          message: "Email is already in used, please try another email!!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.User.findOne({
        where: { id: userId },
        raw: false,
      });
      if (!foundUser) {
        resolve({
          errCode: 5,
          errMessage: "User is not exits!!",
        });
      }
      foundUser.destroy();

      resolve({
        errCode: 0,
        message: "Delete user is success!!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!!",
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (user) {
          user.firstName = data.firstName;
          user.lastName = data.lastName;
          user.address = data.address;
          user.phonenumber = data.phonenumber;

          await user.save();

          resolve({
            errCode: 0,
            message: "Update user successed!!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "User is not found!!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createUser: createUser,
  deleteUser: deleteUser,
  editUser: editUser,
};
