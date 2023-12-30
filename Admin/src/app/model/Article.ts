export class Article {

    get title(): string {
        return this.title;
    }

    set title(value: string) {
        this.title = value;
    }

    get image(): { data: string, contentType: string } {
        return this.image;
      }
    
      set image(value: { data: string, contentType: string }) {
        this.image = value;
      }

    get description(): string {
        return this.description;
    }

    set description(value: string) {
        this.description = value;
    }

    get price(): string {
        return this.price;
    }

    set price(value: string) {
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
        private _title: string,
        // private _image: { data: string, contentType: string },
        private _image: { data: string, contentType: string },
        private _description: string,
        private _price: number,
        private _category: string,
        private _reviews: number
    ) { }
}