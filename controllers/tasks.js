import { taskModel } from "../model/taskModel.js";

//fetch all tasks
export async function all(req, res, next) {
  try {
    const userId = req.user._id;
    const tasks = await taskModel.find({ user: userId });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
}

//create new task
export async function createTask(req, res, next) {
  try {
    const { title, description, isCompleted } = req.body;
    const task = await taskModel.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "task created successfully",
    });
  } catch (error) {
    next(error);
  }
}

//update task status completed or not
export async function completed(req, res, next) {
  try {
    const id = req.params.id;
    const task = await taskModel.findById(id);
    if (!task) {
      return res
        .json({
          success: false,
          message: "task is not present",
        })
        .status(404);
    }

    task.isCompleted = !task.isCompleted;

    await task.save();
    res.status(200).json({
      success: true,
      message: "task updated",
    });
  } catch (error) {
    next(error);
  }
}

//Delete the task
export async function deleteTask(req, res, next) {
  try {
    const id = req.params.id;
    await taskModel.findByIdAndDelete(id);
    res
      .json({
        success: true,
        message: "successfully deleted",
      })
      .status(200);
  } catch (error) {
    next(error);
  }
}
