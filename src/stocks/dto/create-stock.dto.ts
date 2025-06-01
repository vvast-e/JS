import { IsString, IsUrl, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateStockDto {
    @ApiProperty({example: 'https://example.com/image.jpg', description: 'URL изображения' })
    @IsUrl({}, {message: "Некорректный URL изображения"})
    @IsNotEmpty()
    src:string;

    @ApiProperty({ example: 'Акция 1', description: 'Название акции' })
    @IsString()
    @Length(3,100,{message: "Название должно быть от 3 до 100 символов"})
    title:string;

    @ApiProperty({ example: 'Описание акции', description: 'Текст акции' })
    @IsString()
    @Length(10,500,{message: "Описание должно быть от 10 до 500 символов"})
    text:string;
}
