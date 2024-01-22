import { Request, Response } from 'express'

const todos = [
  { id: 1, text: 'Learn javascript', completedAt: new Date() },
  { id: 2, text: 'Create new project', completedAt: null },
  { id: 3, text: 'Learn swift', completedAt: new Date() }
]

export class TodosController {
  public getTodos = (req: Request, res: Response): Response => {
    return res.json(todos)
  }

  public getTodoById = (req: Request, res: Response): Response => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
    const todo = todos.find(todo => todo.id === id)

    return todo != null
      ? res.json(todo)
      : res.status(404).json({ error: `'Todo with ${id} not found'` })
  }

  public createTodo = (req: Request, res: Response): Response => {
    const { text } = req.body

    if (text === '' || text === null || text === undefined) return res.status(400).json({ error: 'Text argument is required' })

    const newTodo = { id: todos.length + 1, text, completedAt: null }

    todos.push(newTodo)

    return res.json(newTodo)
  }

  public updateTodo = (req: Request, res: Response): Response => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = todos.find(todo => todo.id === id)
    if (todo === null || todo === undefined) return res.status(404).json({ error: `'Todo with ${id} not found'` })

    const { text, completedAt } = req.body

    if (text !== null && text !== undefined && text !== '') todo.text = text

    todo.completedAt = completedAt === 'null'
      ? null
      : completedAt !== undefined
        ? new Date(completedAt)
        : todo.completedAt

    return res.json(todo)
  }

  public deleteTodo = (req: Request, res: Response): Response => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = todos.find(todo => todo.id === id)

    if (todo === null || todo === undefined) return res.status(404).json({ error: `Todo with id ${id} not found` })

    todos.splice(todos.indexOf(todo), 1)

    return res.json(todo)
  }
}
