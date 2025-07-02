declare namespace Express {
    export interface Request {
        files?: Multer.File[];
    }
}
