export class Beer {
  constructor(
    public order: number,
    public name: string,
    public brewery: string,
    public style: string,
    public abv: number,
    public ibu: number,
    public dateFirst: string,
    public dateRecent: string,
    public checkins: number,
    public rating: number,
    public globalRating: number
  ) { }
}