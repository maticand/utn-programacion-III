import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GroupsService } from '../services/groups.service';

@ApiTags('world-cup')
@Controller('world-cup')
export class GroupsController {
  // Inyección de dependencias del servicio
  constructor(private readonly groupsService: GroupsService) {}

  // Se mapea a la ruta GET /worldCupCore/world-cup/groups
  @Get('groups')
  @ApiOperation({ summary: 'Obtiene el estado de los grupos y el mundial actual' })
  @ApiResponse({ status: 200, description: 'Fase de grupos obtenida exitosamente.' })
  @ApiResponse({ status: 502, description: 'Error de comunicación con WorldCupAPI.' })
  public async getGroups() {
    // REGLA: Sin lógica de negocio, se delega todo al servicio inmediatamente
    return await this.groupsService.getGroupsData();
  }
}
