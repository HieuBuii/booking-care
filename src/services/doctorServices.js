import db from "../models/index";

const getTopDoctorService = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limit,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueVi", "valueEn"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueVi", "valueEn"],
          },
        ],
        raw: true,
        nest: true,
      });

      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllDoctorsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctocs = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({ errCode: 0, data: doctocs });
    } catch (e) {
      reject(e);
    }
  });
};

const saveInfoDoctorService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.doctorId ||
        !inputData.contentHTML ||
        !inputData.contentMarkdown
      ) {
        resolve({ errCode: 1, errMessage: "Missing required parameter !!" });
      } else {
        let doctor = await db.Markdown.findOne({
          where: { doctorId: inputData.doctorId },
          raw: false,
        });
        if (!doctor) {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            doctorId: inputData.doctorId,
          });
        } else {
          (doctor.contentHTML = inputData.contentHTML),
            (doctor.contentMarkdown = inputData.contentMarkdown),
            (doctor.description = inputData.description),
            await doctor.save();
        }
        resolve({
          errCode: 0,
          message: "Create user successed !!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getInfoDoctorService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing required parameter !!",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.Markdown,
              attributes: ["description", "contentMarkdown", "contentHTML"],
            },
          ],
          raw: false,
          nest: true,
        });

        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

module.exports = {
  getTopDoctorService,
  getAllDoctorsService,
  saveInfoDoctorService,
  getInfoDoctorService,
};
