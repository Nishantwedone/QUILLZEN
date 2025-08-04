import projectModel from "../models/project.model";
import projectService from "../services/project.service";
import { validationResult } from "express-validator";
import userModel from "../models/user.model";


export const createProject = async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const { name } = req.body;
        const loggedInUser = await userModel.findOne({email: req.user.email});
        const userId = loggedInUser._id;

        const newProject = await projectService.createProject({
            name,
            userId
        });

        res.status(201).json({
            message: "Project created successfully",
            project: newProject,
        });
        }catch(err){
            console.error(err);
            res.status(400).send(err.message);
        }
}