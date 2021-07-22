const GetFileBlobUsingURL = function (url: string, convertBlob: Function) {
  fetch(url, { mode: 'cors' })
    .then((response) => response.blob())
    .then((result) => convertBlob(result));
};

const blobToFile = function (blob: any, name: string) {
  blob.lastModifiedDate = new Date();
  blob.name = name;
  return blob;
};

export const GetFileObjectFromURL = function (filePathOrUrl: string, cb: (file: File) => void) {
  GetFileBlobUsingURL(filePathOrUrl, function (blob: any) {
    cb(blobToFile(blob, 'testFile.jpg'));
  });
};
