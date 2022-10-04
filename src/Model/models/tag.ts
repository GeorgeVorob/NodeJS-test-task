export class Tag {
    uid: number;
    creator: number;
    name: string;
    sortOrder: number;

    public constructor(
        _creator: number,
        _name: string,
        _sortOrder: number = 0,
        _uid: number,
    ) {
        this.creator = _creator;
        this.name = _name;
        this.sortOrder = _sortOrder;
        this.uid = _uid;
    }
}