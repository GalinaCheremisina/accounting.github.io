type CategoryInfo = {
        name: string,
        amount: number,
        cost: number,
}

export class Archive{
    constructor(
        public info: CategoryInfo[],
        public income: number,
        public outcome: number,
        public datefrom: string,
        public dateto: string,
        public id: string
    ){}
}