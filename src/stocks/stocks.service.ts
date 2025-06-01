import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
import { FileService } from '../file.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StocksService {
  constructor(private fileService: FileService<Stock[]>) {}

  create(createStockDto: CreateStockDto) {
    const stocks = this.fileService.read();
    const stock = { ...createStockDto, id: stocks.length + 1 };
    this.fileService.add(stock);

    return stock;
  }

  findAll(title?: string): Stock[] {
    const stocks = this.fileService.read();
    return title
        ? stocks.filter((stock) =>
            stock.title.toLowerCase().includes(title.toLowerCase()),
        )
        : stocks;
  }

  findOne(id: number): Stock | null {
    const stocks = this.fileService.read();
    return stocks.find((stock) => stock.id === id) ?? null;
  }

  update(id: number, updateStockDto: UpdateStockDto): void {
    const stocks = this.fileService.read();
    const updatedStocks = stocks.map((stock) =>
        stock.id === id ? { ...stock, ...updateStockDto } : stock,
    );
    this.fileService.write(updatedStocks);
  }

  remove(id: number): void {
    const filteredStocks = this.fileService
        .read()
        .filter((stock) => stock.id !== id);
    this.fileService.write(filteredStocks);
  }

  replace(id: number, createStockDto: CreateStockDto): void {
    const stocks = this.fileService.read();
    const index = stocks.findIndex((stock) => stock.id === id);

    if (index !== -1) {
      // Полностью заменяем карточку, сохраняя тот же ID
      stocks[index] = { ...createStockDto, id };
      this.fileService.write(stocks);
    }
  }
}