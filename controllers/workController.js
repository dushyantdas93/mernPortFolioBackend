import Work from "../models/workModel.js";

export const creatWorkController = async (req, res) => {
    try {
      const { screenshot,
        category,
        name,
        link} = req.body;
      const user = req.user;
  
      // Validate if user exists
      if (!user || !user.id) {
        return res
          .status(401)
          .send({ success: false, message: "Unauthorized: User not found" });
      }
  
     
  
      // Service creation logic
      const createdService = await Work.create({
        screenshot,
        category,
        name,
        link ,
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
  export const getWorkController = async (req, res) => {
    try {
      const getAll = await Work.find();
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

export const deleteWorkController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the `id` from route parameters

    // Validate ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Work ID is required for deletion",
      });
    }

    // Perform delete operation
    const deletedWork = await Work.findByIdAndDelete(id);

    // Check if the work entry was found and deleted
    if (!deletedWork) {
      return res.status(404).send({
        success: false,
        message: "Work not found or already deleted",
      });
    }

    // Successful response
    return res.status(200).send({
      success: true,
      data: deletedWork,
      message: "Work deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting work:", error);
    return res.status(500).send({
      success: false,
      message: "Error deleting work",
      error,
    });
  }
};



export const updateWorkController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the `id` from route parameters
    const updateData = req.body; // Data to be updated

    // Validate ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Work ID is required for updating",
      });
    }

    // Perform update operation
    const updatedWork = await Work.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    // Check if the work entry was found and updated
    if (!updatedWork) {
      return res.status(404).send({
        success: false,
        message: "Work not found or update failed",
      });
    }

    // Successful response
    return res.status(200).send({
      success: true,
      data: updatedWork,
      message: "Work updated successfully",
    });
  } catch (error) {
    console.error("Error updating work:", error);
    return res.status(500).send({
      success: false,
      message: "Error updating work",
      error,
    });
  }
};


export const getWorkByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the `id` from route parameters

    // Validate ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Work ID is required to fetch data",
      });
    }

    // Perform get operation
    const work = await Work.findById(id);

    // Check if the work entry was found
    if (!work) {
      return res.status(404).send({
        success: false,
        message: "Work not found",
      });
    }

    // Successful response
    return res.status(200).send({
      success: true,
      data: work,
      message: "Work fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching work by ID:", error);
    return res.status(500).send({
      success: false,
      message: "Error fetching work",
      error,
    });
  }
};

  