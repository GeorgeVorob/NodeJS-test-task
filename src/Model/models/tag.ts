export class Tag {
    id: number;
    creator: number;
    name: string;
    sortOrder: number;

    public constructor(
        _creator: number,
        _name: string,
        _sortOrder: number = 0,
        _id: number,
    ) {
        this.creator = _creator;
        this.name = _name;
        this.sortOrder = _sortOrder;
        this.id = _id;
    }
}