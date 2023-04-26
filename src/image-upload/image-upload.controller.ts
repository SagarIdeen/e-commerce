import {
  Body,
  Controller,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageUploadService } from './image-upload.service';
import { ParseFile } from './parse-file.pipe';
// import fetch from 'node-fetch';

@Controller('image-upload')
@ApiTags('Files')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data', // 👈 set the content type
    description: 'File to upload',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       file: {
  //         // 👈 this property
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // uploadFile(@UploadedFile(ParseFile) file: Express.Multer.File) {
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('dd', file);

    return this.imageUploadService.uploadImage(file);
  }
}
