import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WorldCupApiService } from '../../basic/world-cup-api.service';

@Injectable()
export class GroupsService {
  private readonly logger = new Logger(GroupsService.name);

  // Inyectamos ConfigService para .env y WorldCupApiService para peticiones a la API 5101
  constructor(
    private readonly configService: ConfigService,
    private readonly worldCupApi: WorldCupApiService,
  ) {}

  public async getGroupsData() {
    try {
      // REGLA: Leemos el idioma de la variable de entorno, el frontend nunca lo envía
      const lang = this.configService.get<string>('APP_LANG', 'es');
      
      // Hacemos las llamadas necesarias a la WorldCupAPI pasándole el query param del idioma
      const currentWorldCup = await this.worldCupApi.get<any>(`/world-cup/current`, { lang });
      const currentGroups = await this.worldCupApi.get<any>(`/world-cup/current/groups`, { lang });

      // Agrupamos la data en un solo objeto para simplificar la vida al frontend
      return {
        worldCup: currentWorldCup,
        groups: currentGroups
      };

    } catch (error) {
      // Log interno para backend dev
      this.logger.error(`Fallo en WorldCupAPI (Groups): ${error.message}`, error.stack);
      
      // REGLA: Capturar y convertir error. Nunca pasar error crudo al frontend.
      throw new HttpException(
        {
          messageCode: 'EXTERNAL_API_ERROR',
          message: 'No se pudo obtener la fase de grupos en este momento.'
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}