import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChannelsService } from './channel.service';
import { Channels } from './models/channel.model';
import { ChannelDto } from './dto/channel.dto';

@Controller('channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Get()
  findAll(): Promise<Channels[]> {
    return this.channelsService.findAll();
  }

  @Post()
  createChannel(@Body() channelDto: ChannelDto): Promise<Channels> {
    return this.channelsService.createChannel(channelDto);
  }
}
