import React, { useState, useCallback, memo } from 'react';

import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import { Container } from './styles';

interface DropzoneProps {
  fileUpload(file: File): void;
  fileURL?: string;
}

const Dropzone: React.FC<DropzoneProps> = ({
  fileUpload,
  fileURL: FileLoaderURL,
}) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file);

      const fileURL = URL.createObjectURL(file);
      setSelectedFileUrl(fileURL);
      fileUpload(file);
    },
    [fileUpload],
  );

  const { getInputProps, getRootProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl || FileLoaderURL ? (
        <img
          src={selectedFileUrl.length !== 0 ? selectedFileUrl : FileLoaderURL}
          alt="Avatar"
        />
      ) : (
        <p>
          <FiUpload />
          Arraste ou clique para adicionar imagem do estabelecimento.
        </p>
      )}
    </Container>
  );
};

export default memo(Dropzone);
