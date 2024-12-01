import Service from "../models/serviceModel.js";

// create
export const createServiceController = async (req, res) => {
  try {
    const { img, name, description, recommended } = req.body;
    const user = req.user;

    // Validate if user exists
    if (!user || !user.id) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized: User not found" });
    }

    // Manual validation
    if (!img || typeof img !== "string" || img.trim().length === 0) {
      return res
        .status(400)
        .send({ success: false, message: "Valid image URL is required" });
    }
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res
        .status(400)
        .send({ success: false, message: "Valid name is required" });
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

    // Service creation logic
    const createdService = await Service.create({
      img,
      name,
      description,
      recommended,
      user: user.id,
    });

    // Response
    res.status(201).send({
      success: true,
      message: "Service created successfully",
      data: createdService,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res
      .status(500)
      .send({ success: false, message: "Internal server error", error: error.message });
  }
};
// get all 
export const getServicesController = async (req, res) => {
  try {
    const getAll = await Service.find();
    console.log(getAll);
    return res.status(200).send({
      success: true,
      getAll,
      message: "getalluser",
    });
  }  catch (error) {
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
