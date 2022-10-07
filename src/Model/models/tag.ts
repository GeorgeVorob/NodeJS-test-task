export class Tag {
    id: number;
    creator: string;
    name: string;
    sortorder: number;

    public constructor(
        _creator: string,
        _name: string,
        _sortOrder: number = 0,
        _id: number,
    ) {
        this.creator = _creator;
        this.name = _name;
        this.sortorder = _sortOrder;
        this.id = _id;
    }
}