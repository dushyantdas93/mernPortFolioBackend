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
    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0
    ) {
      return res
        .status(400)
        .send({ success: false, message: "Valid description is required" });
    }
    // if (typeof recommended !== "boolean") {
    //   return res
    //     .status(400)
    //     .send({ success: false, message: "Recommended must be a boolean" });
    // }

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
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
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
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .send({ success: false, message: "Error updating user", error });
  }
};

export const updateServiceController = async (req, res) => {
  try {
    const { img, name, description, recommended } = req.body;

    // Debugging logs
    console.log("Request Params:", req.params.id);
    console.log("Request Body:", req.body);

    if (!Object.keys(req.body).length) {
      return res.status(400).send({ message: "No data provided to update" });
    }

    // Validate User ID format
    const userId = req.params.id;
    if (!userId?.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({ message: "Invalid user ID format" });
    }

    // Check if user exists
    const existingUser = await Service.findById(userId);
    if (!existingUser) {
      return res.status(404).send({ message: "item not found" });
    }

    // Update user
    const user = await Service.findByIdAndUpdate(
      userId,
      {
        img,
        name,
        description,
        recommended,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user,
    });
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
    const { id } = req.params; // Get the ID from the request parameters
    // Perform delete operation (Assume you have a Service model)
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res
        .status(404)
        .send({ success: false, message: "Service not found" });
    }

    res
      .status(200)
      .send({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res
      .status(500)
      .send({ success: false, message: "Error deleting service", error });
  }
};

// get by id
export const getServiceByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters

    // Assume you have a Service model
    const service = await Service.findById(id);

    if (!service) {
      return res
        .status(404)
        .send({ success: false, message: "Service not found" });
    }

    res.status(200).send({
      success: true,
      message: "Service fetched successfully",
      data: service,
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    res
      .status(500)
      .send({ success: false, message: "Error fetching service", error });
  }
};
