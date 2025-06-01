import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class ReplaceStockDto {
    @IsOptional()
    @IsUrl({}, { message: "URL изображения должен быть валидным" })
    src?: string;

    @IsOptional()
    @IsString()
    @Length(3, 100, { message: "Название должно быть 3-100 символов" })
    title?: string;

    @IsOptional()
    @IsString()
    @Length(10, 500, { message: "Описание должно быть 10-500 символов" })
    text?: string;
}