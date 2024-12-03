import LatestPost from "../models/latestPostModel.js";

export const creatLatestPostController = async (req, res) => {
  try {
    const { imageDescription, link, date, image } = req.body;
    const user = req.user;

    // Validate if user exists
    if (!user || !user.id) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized: User not found" });
    }

    // Service creation logic
    const createdService = await LatestPost.create({
      imageDescription,
      link,
      date,
      image,
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
      .send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};
// get all
export const getLatestPostController = async (req, res) => {
  try {
    const getAll = await LatestPost.find();
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

export const deleteLatestPostController = async (req, res) => {
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
    const deletedWork = await LatestPost.findByIdAndDelete(id);

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



export const getLatestPostByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the `id` from route parameters

    // Validate ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Latest Post ID is required to fetch data",
      });
    }

    // Perform get operation
    const latestPost = await LatestPost.findById(id);

    // Check if the post was found
    if (!latestPost) {
      return res.status(404).send({
        success: false,
        message: "Latest Post not found",
      });
    }

    // Successful response
    return res.status(200).send({
      success: true,
      data: latestPost,
      message: "Latest Post fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Latest Post by ID:", error);
    return res.status(500).send({
      success: false,
      message: "Error fetching Latest Post",
      error: error.message,
    });
  }
};



export const updateLatestPostController = async (req, res) => {
  try {
    const { imageDescription, link, date, image } = req.body;

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
    const existingUser = await LatestPost.findById(userId);
    if (!existingUser) {
      return res.status(404).send({ message: "item not found" });
    }

    // Update user
    const user = await LatestPost.findByIdAndUpdate(
      userId,
      {
        imageDescription,
        link,
        date,
        image,
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
