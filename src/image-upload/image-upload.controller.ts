import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageUploadService } from './image-upload.service';
import { ParseFile } from './parse-file.pipe';

@Controller('image-upload')
@ApiTags('Files')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          // 👈 this property
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile(ParseFile) file: Express.Multer.File) {
    this.imageUploadService.uploadImage(file);
    // console.log(file);
  }
}
