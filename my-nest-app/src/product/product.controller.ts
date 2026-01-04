import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}
    @Get()
    @UseGuards(AuthGuard)
    getProducts(){
        return this.productService.getAllProducts();
    }
    // GET request to /product/1
    // :id is a route parameter, we can access it using @Param decorator
    @Get(':id')
    getProduct(@Param('id') id:string){
        return this.productService.getProductById(Number(id))
    }
}
