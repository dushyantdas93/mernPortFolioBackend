import Experience from "../models/experienceModal.js";

export const creatExperienceController = async (req, res) => {
    try {
      const { yearOfCompletion,
        isPresent,
        name,
        description,
        percentage,
        category } = req.body;
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
        category ,
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
  export const getExperienceController = async (req, res) => {
    try {
      const getAll = await Experience.find();
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
  

  export const updateExperienceController = async (req, res) => {
    try {
      const { id } = req.params; // Extract the `id` from route parameters
      const updateData = req.body; // Data to update

      // Validate ID
      if (!id) {
        return res.status(400).send({
          success: false,
          message: "Experience ID is required for updating",
        });
      }

      // Perform update operation
      const updatedExperience = await Experience.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      // Check if the document was found and updated
      if (!updatedExperience) {
        return res.status(404).send({
          success: false,
          message: "Experience not found or update failed",
        });
      }

      // Successful response
      return res.status(200).send({
        success: true,
        data: updatedExperience,
        message: "Experience updated successfully",
      });
    } catch (error) {
      console.error("Error updating experience:", error);
      return res.status(500).send({
        success: false,
        message: "Error updating experience",
        error: error.message,
      });
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
