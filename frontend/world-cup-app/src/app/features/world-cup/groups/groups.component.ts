import { Component, OnInit } from '@angular/core';
import { GroupsService } from './service/groups.service';
import { GroupsViewModel } from './model/groups-view-model.interface';

@Component({
  selector: 'app-groups-page', // Usando tu selector base
  standalone: false,
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsPageComponent implements OnInit {
  // Estados reactivos de la vista
  public groupsData: GroupsViewModel | null = null;
  public isLoading: boolean = true;
  public errorMessage: string | null = null;

  constructor(private readonly groupsService: GroupsService) {}

  // REGLA: Obtener datos al iniciar el componente
  public ngOnInit(): void {
    this.fetchGroupsData();
  }

  private fetchGroupsData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.groupsService.getGroupsData().subscribe({
      next: (data: GroupsViewModel) => {
        this.groupsData = data;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        // REGLA: No debe haber errores descontrolados en consola, se gestiona el estado
        this.errorMessage = 'Ocurrió un error al cargar los datos del servidor.';
        this.isLoading = false;
        console.warn('Error capturado por la UI:', error); // Warn es aceptable para debug sin que explote
      }
    });
  }
}