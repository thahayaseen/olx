import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class ProductDTO {
    @IsNotEmpty({ message: 'Product name is required' })
    @IsString()
    productName: string;

    @IsNotEmpty({ message: 'Price is required' })
    @IsNumber()
    price: number;

    @IsNotEmpty({ message: 'Location is required' })
    @IsString()
    location: string;

    @IsNotEmpty({ message: 'Category is required' })
    @IsString()
    category: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    seller?: string;
}
