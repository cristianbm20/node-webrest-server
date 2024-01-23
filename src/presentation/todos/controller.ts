import { Request, Response } from 'express'
import { prisma } from '../../data/postgres'
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos'

export class TodosController {
  public getTodos = async (req: Request, res: Response): Promise<Response> => {
    const todos = await prisma.todo.findMany()
    return res.json(todos)
  }

  public getTodoById = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
    const todo = await prisma.todo.findFirst({ where: { id } })

    return todo != null
      ? res.json(todo)
      : res.status(404).json({ error: `'Todo with ${id} not found'` })
  }

  public createTodo = async (req: Request, res: Response): Promise<Response> => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)

    if (error !== undefined && error !== null) return res.status(400).json({ error })

    if (createTodoDto === null || createTodoDto === undefined) return res.status(400).json({ error: 'Internal server error' })

    const newTodo = await prisma.todo.create({
      data: createTodoDto
    })

    return res.json(newTodo)
  }

  public updateTodo = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })

    if (error !== undefined && error !== null) return res.status(400).json({ error })

    const todo = await prisma.todo.findFirst({ where: { id } })

    if (todo === null || todo === undefined) return res.status(404).json({ error: `'Todo with ${id} not found'` })

    if (updateTodoDto === null || updateTodoDto === undefined) return res.status(400).json({ error: 'Internal server error' })

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto.values
    })

    return res.json(updatedTodo)
  }

  public deleteTodo = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = await prisma.todo.findFirst({ where: { id } })

    if (todo === null || todo === undefined) return res.status(404).json({ error: `Todo with id ${id} not found` })

    const deletedTodo = await prisma.todo.delete({ where: { id } })

    return res.json(deletedTodo)
  }
}
