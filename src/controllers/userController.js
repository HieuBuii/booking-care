import db from "../models";
import userServices from "../services/userServices";

const handleLogin = async (req, res) => {
  let email = await req.body.email;
  let password = await req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameters!!",
    });
  }

  let userData = await userServices.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

const handleGetAllUsers = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!!",
      users: [],
    });
  }

  let users = await userServices.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users: users,
  });
};

const handleCreateUser = async (req, res) => {
  let message = await userServices.createUser(req.body);
  return res.status(200).json(message);
};

const handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!!",
    });
  }
  let message = await userServices.deleteUser(req.body.id);
  return res.status(200).json(message);
};

const handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userServices.editUser(data);
  return res.status(200).json(message);
};

const getAllCode = async (req, res) => {
  try {
    let data = await userServices.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.warn("Get all code error: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from Server",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateUser: handleCreateUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
