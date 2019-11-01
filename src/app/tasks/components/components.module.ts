import { NgModule } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
	declarations: [
		TaskItemComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		TaskItemComponent
	]
})
export class ComponentsModule { }
