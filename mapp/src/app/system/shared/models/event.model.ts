export class EventRecord{
    constructor(
        public amount: number,
        public category: number,
        public description: string,
        public type: string,
        public date: string,
        public id?: number,
        public catname?: string
    ){}
}