export interface ResourceAccessService<T> {
    findOne(resourceId: number): Promise<T>;
}