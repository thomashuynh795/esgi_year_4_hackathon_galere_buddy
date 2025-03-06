import { Injectable } from "@nestjs/common";
import { extname } from "path";

@Injectable()
export class CommonUtilsFileService {

    public getMimeType(
        fileExtension: string
    ): string {
        const mimeTypes: { [key: string]: string } = {
            "jpeg": "image/jpeg",
            "jpg": "image/jpeg",
            "png": "image/png"
        };
        return mimeTypes[fileExtension.toLowerCase()] || "application/octet-stream";
    }

    public isValidMimeType(file: Express.Multer.File): boolean {
        const fileExtension = extname(file.originalname).slice(1);
        const expectedMimeType = this.getMimeType(fileExtension);
        const allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "application/pdf",
            "application/epub+zip"
        ];
        return allowedMimeTypes.includes(file.mimetype) && file.mimetype === expectedMimeType;
    }

    public isZipFile(
        buffer: Buffer
    ): boolean {
        const zipSignature = [0x50, 0x4B, 0x03, 0x04];
        return buffer.slice(0, 4).every((byte, index) => byte === zipSignature[index]);
    }

    public extractExtension(
        filename: string
    ): string {
        const match: RegExpMatchArray = filename.match(/\.(jpeg|jpg|png)$/i);
        if (match) {
            return match[0].substring(1);
        }
        return null;
    }
}
