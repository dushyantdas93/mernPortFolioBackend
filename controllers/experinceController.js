import Experience from "../models/experienceModal.js";

export const creatExperienceController = async (req, res) => {
  try {
    const {
      yearOfCompletion,
      isPresent,
      name,
      description,
      percentage,
      category,
    } = req.body;
    const user = req.user;

    // Validate if user exists
    if (!user || !user.id) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized: User not found" });
    }

    // Service creation logic
    const createdService = await Experience.create({
      yearOfCompletion,
      isPresent,
      name,
      description,
      percentage,
      category,
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
export const getExperienceController = async (req, res) => {
  try {
    const getAll = await Experience.find();
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

export const updateExperienceCdsadontroller = async (req, res) => {
  try {
    const { id } = req.params; // Extract `id` from route parameters
    const {
      yearOfCompletion,
      isPresent,
      name,
      description,
      percentage,
      category,
    } = req.body; // Extract fields from request body
    const user = req.user; // Extract user from request (assuming middleware adds it)

    // Validate if user exists
    if (!user || !user.id) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized: User not found" });
    }

    // Validate `id`
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Experience ID",
      });
    }

    // Find and update experience
    const updatedExperience = await Experience.findByIdAndUpdate(
      { _id: id, user: user.id }, // Ensure the experience belongs to the authenticated user
      {
        yearOfCompletion,
        isPresent,
        name,
        description,
        percentage,
        category,
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Enforce schema validation
      }
    );

    // Check if the document was found and updated
    if (!updatedExperience) {
      return res.status(404).send({
        success: false,
        message: "Experience not found or not authorized to update",
      });
    }

    // Success response
    return res.status(200).send({
      success: true,
      message: "Experience updated successfully",
      data: updatedExperience,
    });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateExperienceController = async (req, res) => {
  try {
    const {
      yearOfCompletion,
      isPresent,
      name,
      description,
      percentage,
      category,
    } = req.body;

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
    const existingUser = await Experience.findById(userId);
    if (!existingUser) {
      return res.status(404).send({ message: "item not found" });
    }

    // Update user
    const user = await Experience.findByIdAndUpdate(
      userId,
      {
        yearOfCompletion,
        isPresent,
        name,
        description,
        percentage,
        category,
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

export const deleteExperienceController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the `id` from route parameters

    // Validate ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Experience ID is required for deletion",
      });
    }

    // Perform delete operation
    const deletedExperience = await Experience.findByIdAndDelete(id);

    // Check if the document was found and deleted
    if (!deletedExperience) {
      return res.status(404).send({
        success: false,
        message: "Experience not found or already deleted",
      });
    }

    // Successful response
    return res.status(200).send({
      success: true,
      data: deletedExperience,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return res.status(500).send({
      success: false,
      message: "Error deleting experience",
      error: error.message,
    });
  }
};

export const getExperienceByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the `id` from route parameters

    // Validate ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Experience ID is required to fetch data",
      });
    }

    // Perform get operation
    const experience = await Experience.findById(id);

    // Check if the document was found
    if (!experience) {
      return res.status(404).send({
        success: false,
        message: "Experience not found",
      });
    }

    // Successful response
    return res.status(200).send({
      success: true,
      data: experience,
      message: "Experience fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching experience by ID:", error);
    return res.status(500).send({
      success: false,
      message: "Error fetching experience",
      error: error.message,
    });
  }
};
