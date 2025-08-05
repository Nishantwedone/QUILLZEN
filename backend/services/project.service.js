import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Name are required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }

  let project;
  try {
    project = await projectModel.create({
      name,
      users: [userId],
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      throw new Error("Project name already exists");
    }
    throw error;
  }
  return project;
};

export const getAllProjectByUserId = async ({ userId }) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const allUserProjects = await projectModel.find({
    users: userId,
  });

  return allUserProjects;
};

export const addUsersToProject = async ({ projectId, users, userId }) => {
  if (!projectId) {
    throw new Error("Project ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid Project ID");
  }

  if (!users || !Array.isArray(users) || users.length === 0) {
    throw new Error("Users must be an array with at least one user");
  }

  if (
    !Array.isArray(users) ||
    users.some((userId) => !mongoose.Types.ObjectId.isValid(userId))
  ) {
    throw new Error("Invalid User ID(s) in the array");
  }

  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid User ID");
  }

  const project = await projectModel.findOne({
    _id: projectId,
    users: userId,
  });

  if (!project) {
    throw new Error("Project not found or user is not belong to this project");
  }

  const updatedProject = await projectModel.findOneAndUpdate(
    { _id: projectId },
    {
      $addToSet: {
        users: {
          $each: users,
        },
      },
    },
    { new: true }
  );
  if (!updatedProject) {
    throw new Error("Failed to add users to the project");
  }
  return updatedProject;
};
