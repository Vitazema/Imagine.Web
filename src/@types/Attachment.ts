export class Attachment {
  constructor(
    public fileName: string,
    public fileExtension: string,
    public contentType: string,
    public content: string,
    public id?: string,
    public createdAt?: Date,
    public filePath?: string,
    public filePreviewPath?: string
  ) {}
}
