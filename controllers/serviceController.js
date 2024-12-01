import Service from "../models/serviceModel.js";

// create
export const createServiceController = async (req, res) => {
    try {
     const {img,name,description,recommended}=req.body;
     const user = req.user;

         // Manual validation
    if (!img) {
        return res.status(400).send({ success: false, message: "Image is required" });
      }
      if (!name || typeof name !== "string" || name.trim().length === 0) {
        return res.status(400).send({ success: false, message: "Valid name is required" });
      }
      if (!description || typeof description !== "string" || description.trim().length === 0) {
        return res
          .status(400)
          .send({ success: false, message: "Valid description is required" });
      }
      if (typeof recommended !== "boolean") {
        return res
          .status(400)
          .send({ success: false, message: "Recommended must be a boolean" });
      }

      const createdService = await Service.create({
        img,name,description,recommended,user:user._id
      })
      res.status(201).send({
        success: true,
        message: "Service created successfully",
        data:createdService,
      });

    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .send({ success: false, message: "Error updating user", error });
    }
  };

  // update
export const updateServiceController = async (req, res) => {
    try {
     
    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .send({ success: false, message: "Error updating user", error });
    }
  };
// delete
  export const deleteServiceController = async (req, res) => {
    try {
     
    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .send({ success: false, message: "Error updating user", error });
    }
  };
// get by id 
  export const getServiceByIdController = async (req, res) => {
    try {
     
    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .send({ success: false, message: "Error updating user", error });
    }
  };
// get all 
  export const getServicesController = async (req, res) => {
    try {
     
    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .send({ success: false, message: "Error updating user", error });
    }
  };