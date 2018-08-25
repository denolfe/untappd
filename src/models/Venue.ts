export class Venue {
  constructor(public rank: number,
              public name: string,
              public category: string,
              public address: string,
              public firstVisit: string,
              public lastVisit: string,
              public checkins: number) {
  }
}