
export class SelfAssigned<T> {
    constructor(o: Partial<T>) {
        return Object.assign(this, o);
    }
}