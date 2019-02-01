export class EventRecord{
    constructor(
        public amount: number,
        public category: string,
        public description: string,
        public type: string,
        public date: string,
        public id?: string,
        public catname?: string,
        public creator?: string
    ){}
}