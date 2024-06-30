import { diskStorage } from 'multer';
import { extname } from 'path';

export const MulterOptions = (path: string) => {
  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, `./storage/${path}`);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(
          null,
          `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
        );
      },
    }),
  };
};
