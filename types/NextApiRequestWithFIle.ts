import { NextApiRequest } from 'next';

export interface FileWithBuffer {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
}

export default interface NextApiRequestWithFile extends NextApiRequest {
    file: FileWithBuffer;
}
