export class Customer {

    get firstname(): string {
        return this.firstname;
    }

    set firstname(value: string) {
        this.firstname = value;
    }

    get lastname(): string {
        return this.lastname;
    }

    set lastname(value: string) {
        this.lastname = value;
    }

    get email(): string {
        return this.email;
    }

    set email(value: string) {
        this.email = value;
    }

    get password(): string {
        return this.password;
    }

    set password(value: string) {
        this.password = value;
    }

    get Token(): string {
        return this.Token;
    }

    set Token(value: string) {
        this.Token = value;
    }

    constructor(
        private _firstname: string,
        private _lastname: string,
        private _email: string,
        private _password: string,
        private _token: string
    ) { }
}