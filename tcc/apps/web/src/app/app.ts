import { Component } from '@angular/core';

import { environment } from '../environments/environments';

import { appwriteCreateConnection } from '@tcc/appwrite'
import { RouterOutlet } from '@angular/router';
import { Auth } from '@tcc/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Auth],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected appwrite = appwriteCreateConnection({
    endpoint: environment.appwrite.endpoint,
    project: environment.appwrite.projectId,
    databaseId: environment.appwrite.databaseId
  });
}
