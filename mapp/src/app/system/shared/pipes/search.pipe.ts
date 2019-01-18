import { Pipe, PipeTransform } from "@angular/core";

import { EventRecord } from '../models/event.model';

@Pipe({
    name: 'appsearch'
})
export class SearchPipe implements PipeTransform{

    transform(items: EventRecord[], value: string, field: string):any{
        if(items.length ===0 || !value) return items;

        console.log(items);
        console.log(field);
        return items.filter((i)=>{
            const t=Object.assign({},i);
            if(!isNaN(t[field])) { t[field]+=''; }
            return t[field].toLowerCase().indexOf(value.toLowerCase())!==-1;
        });
    }
}