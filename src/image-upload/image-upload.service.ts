import { Injectable, Put } from '@nestjs/common';
import { Storage } from '@squareboat/nest-storage';
import sharp from 'sharp';

@Injectable()
export class ImageUploadService {
  async uploadImage(file: any) {
    try {
      const _compressed_image = await sharp(file.buffer)
        .jpeg({ quality: 50 })
        .toBuffer();

      const result = await Storage.disk('docs').put(
        file.originalname,
        _compressed_image,
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
