export class User {
  constructor(
    public username: string,
    public totalBeerCount: number,
    public uniqueBeerCount: number,
    public badgeCount: number,
    public friendCount: number
  ) { }
}