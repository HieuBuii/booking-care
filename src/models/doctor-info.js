"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor_info.belongsTo(models.User, { foreignKey: "doctorId" });
      Doctor_info.belongsTo(models.Allcode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceTypeData",
      });
      Doctor_info.belongsTo(models.Allcode, {
        foreignKey: "proviceId",
        targetKey: "keyMap",
        as: "provinceTypeData",
      });
      Doctor_info.belongsTo(models.Allcode, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "paymentTypeData",
      });
      Doctor_info.belongsTo(models.Specialty, {
        foreignKey: "specialtyId",
        targetKey: "id",
        as: "doctorInfoData",
      });
      Doctor_info.belongsTo(models.Clinic, {
        foreignKey: "clinicId",
        targetKey: "id",
        as: "doctorClinicData",
      });
    }
  }
  Doctor_info.init(
    {
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      proviceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_info",
      freezeTableName: true,
    }
  );
  return Doctor_info;
};
