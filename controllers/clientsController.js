import Clients from "../models/clientsModel.js";

export const creatClientsController = async (req, res) => {
  try {
    const { image, title, description, subdescription } = req.body;
    const user = req.user;

    // Validate if user exists
    if (!user || !user.id) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized: User not found" });
    }

    // Service creation logic
    const createdService = await Clients.create({
      image,
      title,
      description,
      subdescription,
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
export const getClientsController = async (req, res) => {
  try {
    const getAll = await Clients.find();
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

export const getClientsByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the `id` from route parameters

    // Validate ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Client ID is required to fetch data",
      });
    }

    // Perform get operation
    const client = await Clients.findById(id);

    // Check if the document was found
    if (!client) {
      return res.status(404).send({
        success: false,
        message: "Client not found",
      });
    }

    // Successful response
    return res.status(200).send({
      success: true,
      data: client,
      message: "Client fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    return res.status(500).send({
      success: false,
      message: "Error fetching client",
      error: error.message,
    });
  }
};


export const deleteClientsController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the `id` from route parameters

    // Validate ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Client ID is required for deletion",
      });
    }

    // Perform delete operation
    const deletedClient = await Clients.findByIdAndDelete(id);

    // Check if the document was found and deleted
    if (!deletedClient) {
      return res.status(404).send({
        success: false,
        message: "Client not found or already deleted",
      });
    }

    // Successful response
    return res.status(200).send({
      success: true,
      data: deletedClient,
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    return res.status(500).send({
      success: false,
      message: "Error deleting client",
      error: error.message,
    });
  }
};




export const updateClientsController = async (req, res) => {
  try {
    const { image, title, description, subdescription } = req.body;

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
        image,
        title,
        description,
        subdescription,
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

