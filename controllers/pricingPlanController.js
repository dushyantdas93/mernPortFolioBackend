import PricingPlan from "../models/pricingPlanModel.js";

export const creatPricingPlanController = async (req, res) => {
  try {
    const { category, description, price, supports, image } = req.body;
    const user = req.user;

    // Validate if user exists
    if (!user || !user.id) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized: User not found" });
    }

    // Service creation logic
    const createdService = await PricingPlan.create({
      category,
      description,
      price,
      supports,
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
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// get all
export const getPricingPlanController = async (req, res) => {
  try {
    const getAll = await PricingPlan.find();
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

export const deletePricingPlanController = async (req, res) => {
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
    const deletedWork = await PricingPlan.findByIdAndDelete(id);

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



export const updatePricingPlanController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the `id` from route parameters
    const updateData = req.body; // Data to update

    // Validate ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Pricing Plan ID is required for updating",
      });
    }

    // Perform update operation
    const updatedPlan = await PricingPlan.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    // Check if the plan was found and updated
    if (!updatedPlan) {
      return res.status(404).send({
        success: false,
        message: "Pricing Plan not found or update failed",
      });
    }

    // Successful response
    return res.status(200).send({
      success: true,
      data: updatedPlan,
      message: "Pricing Plan updated successfully",
    });
  } catch (error) {
    console.error("Error updating Pricing Plan:", error);
    return res.status(500).send({
      success: false,
      message: "Error updating Pricing Plan",
      error: error.message,
    });
  }
};


export const getPricingPlanByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the `id` from route parameters

    // Validate ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Pricing Plan ID is required to fetch data",
      });
    }

    // Perform get operation
    const pricingPlan = await PricingPlan.findById(id);

    // Check if the pricing plan was found
    if (!pricingPlan) {
      return res.status(404).send({
        success: false,
        message: "Pricing Plan not found",
      });
    }

    // Successful response
    return res.status(200).send({
      success: true,
      data: pricingPlan,
      message: "Pricing Plan fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Pricing Plan by ID:", error);
    return res.status(500).send({
      success: false,
      message: "Error fetching Pricing Plan",
      error: error.message,
    });
  }
};


export const deletePricingPlanByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the `id` from route parameters

    // Validate ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Pricing Plan ID is required for deletion",
      });
    }

    // Perform delete operation
    const deletedPlan = await PricingPlan.findByIdAndDelete(id);

    // Check if the plan was found and deleted
    if (!deletedPlan) {
      return res.status(404).send({
        success: false,
        message: "Pricing Plan not found or already deleted",
      });
    }

    // Successful response
    return res.status(200).send({
      success: true,
      data: deletedPlan,
      message: "Pricing Plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Pricing Plan:", error);
    return res.status(500).send({
      success: false,
      message: "Error deleting Pricing Plan",
      error: error.message,
    });
  }
};

