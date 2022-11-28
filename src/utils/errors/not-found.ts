export class NotFoundError extends Error {
    constructor(entity: string) {
        super(`Unable to find ${entity}`);
    }
}
