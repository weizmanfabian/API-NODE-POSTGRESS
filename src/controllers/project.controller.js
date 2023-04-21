import { Project } from '../models/Project.js'

export const getProjects = async (req, res) => {
  try {
    const { count, rows } = await Project.findAndCountAll();
    console.log(`getProjects ${count} results`)
    res.status(200).json(rows)
  } catch (err) {
    res.status(500).json(({ msg: `Err get Projects ${err}` }))
  }
}

export const getProject = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findByPk(id)
    console.log(`getProject: ${project}`)
    res.status(!project ? 404 : 200).json(!project ? { msg: 'Project does not exist' } : project)
  } catch (err) {
    res.status(500).json(({ msg: `Err get Project ${err}` }))
  }
}

export const createProject = async (req, res) => {
  try {
    console.log(req.body)
    const newProject = await Project.create(req.body)
    console.log(`createProject OK`)
    res.status(200).json(newProject)
  } catch (err) {
    res.status(500).json({ msg: `Err create Project ${err}` })
  }
}

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const {
      name,
      priority,
      description
    } = req.body
    console.log(`update project ${id}`)
    console.log(req.body)
    const project = await Project.findByPk(id)
    project.name = name
    project.priority = priority
    project.description = description
    await project.save()
    console.log(`updateProject OK`)
    res.json(project)
  } catch (err) {
    res.status(500).json({ msg: `Err update Project ${err}` })
  }
}

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params
    console.log(`deleting project ${id}`)
    Project.destroy({
      where: {
        id
      }
    })
    console.log(`deleteProject OK`)
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({ msg: `Err delete Project ${err}` })
  }
}