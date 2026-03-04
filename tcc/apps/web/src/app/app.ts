import { Component } from '@angular/core';

import { environment } from '../environments/environments';

import { appwriteCreateConnection } from  '@tcc/appwrite'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected appwrite = appwriteCreateConnection({
    endpoint: environment.appwrite.endpoint,
    project: environment.appwrite.projectId
  });
}
