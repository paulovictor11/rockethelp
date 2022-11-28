export class UniqueEmailError extends Error {
    constructor() {
        super("Email already registered.");
    }
}
