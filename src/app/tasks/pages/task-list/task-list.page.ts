import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  
tasks$: Observable<Task[]>;

  constructor() { }

  ngOnInit() {

    this.tasks$ = of([
      {id:"123456aabb", title:"Estudar Angular", realized:false},
      {id:"123456ccdd", title:"Estudar Ionic", realized:false}]
    );

  }

}
