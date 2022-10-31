import { Controller, Get, Header, Param, Query } from '@nestjs/common';
import fetch from 'node-fetch';

@Controller('games')
export class GamesController {
  @Header('Content-Type', 'application/json')
  @Get('fromUser/:id')
  async fromUser(
    @Param('id') id: number,
    @Query('cursor') cursor: string,
  ): Promise<string> {
    const response = cursor
      ? await fetch(
          `https://games.roblox.com/v2/users/${id}/games?sortOrder=Asc&limit=50&cursor=${cursor}`,
          {
            headers: {
              contentType: 'application/json',
            },
          },
        )
      : await fetch(
          `https://games.roblox.com/v2/users/${id}/games?sortOrder=Asc&limit=50`,
          {
            headers: {
              contentType: 'application/json',
            },
          },
        );

    return await response.json();
  }
}
