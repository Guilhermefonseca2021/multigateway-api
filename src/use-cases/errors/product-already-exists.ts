export class ProductsAlreadyExistsError extends Error {
    constructor() {
        super("Products already exists. ")
    }
}