export class UpdateTodoDto {
  constructor (
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values (): { [key: string]: any } {
    const returnObj: { [key: string]: any } = {}

    if (this.text !== null && this.text !== undefined) returnObj.text = this.text
    if (this.completedAt !== null && this.completedAt !== undefined) returnObj.completedAt = this.completedAt

    return returnObj
  }

  static create (props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props
    let newCompletedAt = completedAt

    if (id === '' || id === null || id === undefined || isNaN(Number(id))) return ['ID argument must be a valid number', undefined]

    if (completedAt !== null && completedAt !== undefined && completedAt !== '') {
      newCompletedAt = new Date(completedAt)
      if (newCompletedAt.toString() === 'Invalid Date') return ['CompletedAt must be a valid date']
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)]
  }
}
