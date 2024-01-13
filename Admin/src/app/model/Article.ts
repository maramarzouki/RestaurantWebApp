export class Article {

    get _id(): number {
        return this._id;
    }

    set _id(value: number) {
        this._id = value;
    }

    get title(): string {
        return this.title;
    }

    set title(value: string) {
        this.title = value;
    }

    get image(): string {
        return this.image;
      }
    
      set image(value: string) {
        this.image = value;
      }

    get description(): string {
        return this.description;
    }

    set description(value: string) {
        this.description = value;
    }

    get price(): number {
        return this.price;
    }

    set price(value: number) {
        this.price = value;
    }

    get category(): string {
        return this.category;
    }

    set category(value: string) {
        this.category = value;
    }

    get reviews(): string {
        return this.reviews;
    }

    set reviews(value: string) {
        this.reviews = value;
    }

    constructor(
        private __id: number, 
        private _title: string,
        // private _image: { data: string, contentType: string },
        private _image: string,
        private _description: string,
        private _price: number,
        private _category: string,
        private _reviews: number
    ) { }
}