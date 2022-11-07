import express from "express";
import userController from "../controllers/userController";
// import homeController from "../controllers/homeController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";

let router = express.Router();

let initWebRoutes = (app) => {
  // router.get("/", homeController.getHomePage);
  // router.get("/crud", homeController.getCRUD);
  // router.post("/post-crud", homeController.postCRUD);
  // router.get("/get-crud", homeController.displayGetCRUD);
  // router.get("/edit-crud", homeController.getEditCRUD);
  // router.post("/put-crud", homeController.putEditCRUD);
  // router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-user", userController.handleCreateUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);
  router.post("/api/change-user-pw", userController.postChangeUserPW);
  router.post("/api/forgot-pw", userController.postForgotPW);
  router.post("/api/verify-forgot-pw", userController.postVeryfyForgotPW);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorForHome);
  router.get("/api/get-all-doctocs", doctorController.getAllDoctors);
  router.post("/api/creat-info-doctor", doctorController.saveInfoDoctor);
  router.get("/api/get-info-doctor", doctorController.getInfoDoctor);
  router.post("/api/save-schedule", doctorController.saveCreateSchedule);
  router.get("/api/schedule-doctor", doctorController.getScheduleDoctor);
  router.delete(
    "/api/delete-schedule-doctor",
    doctorController.deleteScheduleDoctor
  );
  router.get("/api/extra-doctor-info", doctorController.getExtraDoctorInfo);

  router.post("/api/patient-booking", patientController.savePatientBooking);
  router.post(
    "/api/verify-patient-booking",
    patientController.postVeryfyPatientBooking
  );

  router.post("/api/create-specialty", specialtyController.createSpecialty);
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialy);
  router.put("/api/edit-specialty", specialtyController.editSpecialty);
  router.delete("/api/delete-specialty", specialtyController.deleteSpecialty);
  router.get("/api/specialty-by-id", specialtyController.getSpecialyById);

  router.post("/api/create-clinic", clinicController.createClinic);
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  router.put("/api/edit-clinic", clinicController.editClinic);
  router.delete("/api/delete-clinic", clinicController.deleteClinic);
  router.get("/api/get-clinic-by-id", clinicController.getClinicById);

  return app.use("/", router);
};

module.exports = initWebRoutes;
