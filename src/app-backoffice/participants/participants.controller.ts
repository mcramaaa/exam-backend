import {
  Controller,
  Get,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationResultType } from 'src/shared/types/pagination-result.type';
import { customPagination } from 'src/shared/utils/pagination';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participants } from 'src/database/entities/participants.entity';

@ApiTags('Participants')
@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@Controller({
  path: 'backoffice/participants',
  version: '1',
})
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  @ApiQuery({ name: 'id', required: false, example: 1 })
  @ApiQuery({ name: 'name', required: false, example: 'Bejo' })
  @ApiQuery({ name: 'email', required: false, example: 'bejo@exam.com' })
  @ApiQuery({ name: 'birth', required: false, example: 'string' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('id') id: string,
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('birth') birth: string,
  ): Promise<PaginationResultType<Participants>> {
    const [data, count] = await this.participantsService.findManyWithPagination(
      {
        page,
        limit,
      },
      {
        id,
        name,
        email,
        birth,
      },
    );

    return customPagination(data, count, { page, limit });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.participantsService.findOne({ id: id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: [CreateParticipantDto] })
  create(@Body() data: CreateParticipantDto[]) {
    return this.participantsService.create(data);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantsService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.participantsService.remove(+id);
  }
}
