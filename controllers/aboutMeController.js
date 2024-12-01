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
export const updateAboutMeController = async (req, res) => {
    try {
     
    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .send({ success: false, message: "Error updating user", error });
    }
  };
// delete
  export const deleteAboutMeController = async (req, res) => {
    try {
     
    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .send({ success: false, message: "Error updating user", error });
    }
  };
// get by id 
  export const getAboutMeByIdController = async (req, res) => {
    try {
     
    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .send({ success: false, message: "Error updating user", error });
    }
  };
// get all 
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