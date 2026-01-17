import { Component } from '@angular/core';

import { environment } from '../environments/environments';

import { appwriteCreateConnection } from  '@tcc/appwrite'

@Component({
  imports: [],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected appwrite = appwriteCreateConnection({
    endpoint: environment.appwrite.endpoint,
    project: environment.appwrite.projectId
  });
}
