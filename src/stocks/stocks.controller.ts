import { Controller, Get, Post, Put, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto){
    return this.stocksService.create(createStockDto);
  }

  @Get()
  findAll(@Query('title') title?: string): Stock[] {
    return this.stocksService.findAll(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Stock | null {
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto): void {
    return this.stocksService.update(+id, updateStockDto);
  }

  @Put(':id')
  replace(
      @Param('id') id: string,
      @Body() createStockDto: CreateStockDto,
  ): void {
    return this.stocksService.replace(+id, createStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.stocksService.remove(+id);
  }
}