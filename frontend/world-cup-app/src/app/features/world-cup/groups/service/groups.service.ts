import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { GroupsViewModel } from '../model/groups-view-model.interface';

@Injectable({ providedIn: 'root' })
export class GroupsService {
  // Construimos la URL hacia el controller del BFF: /worldCupCore/world-cup/groups
  private readonly apiUrl = `${environment.coreServiceUrl}/world-cup/groups`;

  constructor(private readonly http: HttpClient) {}

  public getGroupsData(): Observable<GroupsViewModel> {
    // Hace el GET a http://localhost:4101/worldCupCore/world-cup/groups
    return this.http.get<GroupsViewModel>(this.apiUrl);
  }
}

