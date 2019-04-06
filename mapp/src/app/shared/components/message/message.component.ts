import { Component } from '@angular/core';

import { fadeStateTrigger } from '../../animations/fade.animation';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [fadeStateTrigger]
})
export class MessageComponent{
    title: string = '';
    type: string = '';
    isExist = false;
}
