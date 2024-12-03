import AboutMe from "../models/aboutMeModel.js";

// create
export const createAboutMeController = async (req, res) => {
    try {
     const {
      resume,
        description,
        completedProjects,
        ongoingProjects,
        remeningProjects,
        
        webPercentage,
        designPercentage,
        animationPercentage}=req.body;

     const user = req.user;

  

      const createdAboutMe = await AboutMe.create({
        resume,
        description,
        completedProjects,
        ongoingProjects,
        remeningProjects,
        
        webPercentage,
        designPercentage,
        animationPercentage ,user:user.id
      })
      res.status(201).send({
        success: true,
        message: "AboutMe created successfully",
        data:createdAboutMe,
      });

    } catch (error) {
      console.error("Error creating aboutme :", error);
      res
        .status(500)
        .send({ success: false, message: "Error creating aboutme", error });
    }
  };

  // update

  export const getAboutMeController = async (req, res) => {
    try {
      const getAll = await AboutMe.find();
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
  




export const updateAboutMeController = async (req, res) => {
  try {
    const {
      description,
      completedProjects,
      ongoingProjects,
      remeningProjects,

      webPercentage,
      designPercentage,
      animationPercentage,
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
    const existingUser = await AboutMe.findById(userId);
    if (!existingUser) {
      return res.status(404).send({ message: "item not found" });
    }

    // Update user
    const user = await AboutMe.findByIdAndUpdate(
      userId,
      {
        description,
        completedProjects,
        ongoingProjects,
        remeningProjects,

        webPercentage,
        designPercentage,
        animationPercentage,
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



export const deleteAboutMeController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the `id` from route parameters

    // Validate ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "AboutMe ID is required for deletion",
      });
    }

    // Perform delete operation
    const deletedAboutMe = await AboutMe.findByIdAndDelete(id);

    // Check if the document was found and deleted
    if (!deletedAboutMe) {
      return res.status(404).send({
        success: false,
        message: "AboutMe not found or already deleted",
      });
    }

    // Successful response
    return res.status(200).send({
      success: true,
      data: deletedAboutMe,
      message: "AboutMe deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting AboutMe:", error);
    return res.status(500).send({
      success: false,
      message: "Error deleting AboutMe",
      error: error.message,
    });
  }
};


export const getAboutMeByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the `id` from route parameters

    // Validate ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "AboutMe ID is required to fetch data",
      });
    }

    // Perform get operation
    const aboutMe = await AboutMe.findById(id);

    // Check if the document was found
    if (!aboutMe) {
      return res.status(404).send({
        success: false,
        message: "AboutMe not found",
      });
    }

    // Successful response
    return res.status(200).send({
      success: true,
      data: aboutMe,
      message: "AboutMe fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching AboutMe by ID:", error);
    return res.status(500).send({
      success: false,
      message: "Error fetching AboutMe",
      error: error.message,
    });
  }
};
