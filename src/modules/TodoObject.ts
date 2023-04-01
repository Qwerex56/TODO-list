export default class TodoItem {
  public id: number;

  public description: string;

  public isActive: boolean;

  constructor(id: number, description: string, isActive: boolean) {
    this.id = id;
    this.description = description;
    this.isActive = isActive;
  }
}