import projectModel from "../models/project.model";



export const createProject = async ({
    name, userId
}) => {
    if (!name) {
        throw new Error("Name are required");
    }
    if (!userId) {
        throw new Error("User ID is required");
    }

    const project = await projectModel.create({
        name,
        users: [ userId ]
    })
    return project;
}