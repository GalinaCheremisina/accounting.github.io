import { Component, OnInit, Input } from '@angular/core';

import { Archive } from '../../shared/models/archive.model';

@Component({
  selector: 'app-list-archive',
  templateUrl: './list-archive.component.html',
  styleUrls: ['./list-archive.component.scss']
})
export class ListArchiveComponent implements OnInit {

  @Input() archives: Archive[] = [];

  constructor() { }

  ngOnInit() {
  }

}
