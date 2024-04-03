export class CreateTodoDto {
  constructor (
    public readonly text: string,
    public readonly completedAt?: Date
  ) {}

  static create (props: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { text } = props

    if (text === '' || text === null || text === undefined) return ['Text argument is required', undefined]

    return [undefined, new CreateTodoDto(text)]
  }
}
