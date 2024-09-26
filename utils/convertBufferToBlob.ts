export const bufferToBlob = (buffer: Buffer): Blob => {
    return new Blob([buffer], { type: 'application/pdf' }); // Altere o tipo conforme necessário
};
  