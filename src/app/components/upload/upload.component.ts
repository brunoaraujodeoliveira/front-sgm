import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  message = '';

  fileUploaded: string | ArrayBuffer = null;

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
    this.fileList()
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.uploadService.upload(this.currentFile).subscribe(
          (event: any): void => {
            if (event instanceof HttpResponse) {
              var blob: Blob = this.convertToBlob(event.body.file.data, 'image/png');
              this.createImageFromBlob(blob);
            }
          },
          (err: any) => {
            console.log(err);
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Não foi possível realizar o upload do arquivo!';
            }
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFiles = undefined;
    }
  }

  fileList() {
    this.uploadService.fileList().subscribe(
      (event: any): void => {
        if (event instanceof HttpResponse) {
          var image = event.body[0];
          var blob: Blob = this.convertToBlob(image.file.data, 'image/png');
          this.createImageFromBlob(blob);
        }
      },
      (err: any) => {
        console.log(err);

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Não foi possível realizar o upload do arquivo!';
        }

        this.currentFile = undefined;
      });
  }

  private convertToBlob(b64Data: any, contentType: any, sliceSize: number = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});

    return blob;
  }

  private createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.fileUploaded = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
