import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-common-list',
  template: `
    <h2>{{title}}</h2>
     <ul class="list-item">
       <li *ngFor="let item of dataList">
         <a href="javascript:void(0);" (click)="onClickItem(item)">
           <span class="badge">{{item.id}}</span> {{item.name}}
         </a>
       </li>
    </ul>
  `,
  styleUrls: ['./common-list.component.css']
})
export class CommonListComponent implements OnInit {
  @Input() title = '';
  @Input() dataList: any[] = [];
  @Output() clickItem = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  onClickItem(item: any) {
    this.clickItem.emit(item);
  }

}
