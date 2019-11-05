import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Task } from '../model/task.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ThrowStmt } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TasksDbService {

	private collection: AngularFirestoreCollection<Task>;

	constructor(private db: AngularFirestore, private authentication: AuthenticationService) {

		this.authentication.stateAuthentication$.subscribe(user => {
			if(user) {
				this.db.collection(`/users/${user.uid}/tasks`);
			} else {
				this.db.collection(null);
			}
		})

	}

	create(tk: Task): Promise<Task> {
		return this.collection.add(tk).then(() => tk);
	}

	update(tk: Task): Promise<Task> {
		return this.collection.doc<Task>(tk.id).update(tk).then(() => tk);
	}

	delete(tk: Task): Promise<void> {
		return this.collection.doc<Task>(tk.id).delete();
	}

	searchAll(): Observable<Task[]> {
		return this.collection.valueChanges();
	}

	searchId(id: string): Observable<Task> {
		return this.collection.doc<Task>(id).valueChanges();
	}
}
