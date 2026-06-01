import { GroupTableApiItem } from './groups-api.interface';

export interface GroupsViewModel {
  lang: 'es' | 'en';
  loading: boolean;
  errorMessage: string;
  showNoSimulationState: boolean;
  selectedTeamLabel: string;
  selectedGroup: string | null;
  selectedGroupData: GroupTableApiItem | null;
  groups: GroupTableApiItem[];

  // Modelo para tipar la respuesta combinada que manda nuestro backend (BFF)
  worldCup: Record<string, unknown>; // Tipado seguro para Checkpoint 2 sin usar "any"
}

