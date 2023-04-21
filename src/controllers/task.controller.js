import { Project } from "../models/Project.js"
import { Task } from "../models/Task.js"

export const getTasks = async (req, res) => {
  try {
    const { count, rows } = await Task.findAndCountAll()
    console.log(`getTasks ${count} results`)
    res.status(200).json(rows)
  } catch (err) {
    res.status(500).json(({ msg: `Err get Tasks ${err}` }))
  }
}

export const createTask = async (req, res) => {
  try {
    const { name, projectId } = req.body
    const newTask = await Task.create({
      name,
      projectId
    })
    if (projectId) {
      newTask.projectId = await Project.findByPk(projectId)
    }
    console.log(`createTask OK`)
    res.status(200).json(newTask)
  } catch (err) {
    res.status(500).json(({ msg: `Err create Task ${err}` }))
  }
}

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    console.log(`update task ${id}`)
    const task = await Task.findByPk(id)
    console.log(`Task original put ${task}`)
    task.set(req.body)
    const newTask = await task.save()
    if (newTask.projectId) {
      newTask.projectId = await Project.findByPk(newTask.projectId)
    }
    console.log(`updateTask OK`)
    res.status(200).json(newTask)
  } catch (err) {
    res.status(500).json({ msg: `Err update Task ${err}` })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    console.log(`deleting task ${id}`)
    Task.destroy({ where: { id } })
    console.log(`deleteTask OK`)
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ msg: `Err delete Task ${err}` })
  }
}
export const getTask = async (req, res) => {
  try {
    const { id } = req.params
    console.log(`getTask ${id}`)
    const task = await Task.findByPk(id)
    if (task.projectId) {
      task.projectId = await Project.findByPk(task.projectId)
    }
    res.status(200).json(task)
  } catch (err) {
    res.status(500).json({ msg: `Err get Task ${err}` })

  }
}