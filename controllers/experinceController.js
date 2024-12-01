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
  