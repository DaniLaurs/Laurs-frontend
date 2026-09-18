/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ImagePlus, X, CheckCircle2 } from "lucide-react";


interface FileUploadProps {
  label: string;
  file: File | null;
  preview?: string;
  accept?: string;
  onChange: (file: File | null) => void;
}
export default function FileUpload({
  label,
  file,
  preview,
  accept = "image/*",
  onChange,
}: FileUploadProps) {
const [previewUrl, setPreviewUrl] = useState("");  useEffect(() => {
  if (file) {
    const objectUrl = URL.createObjectURL(file);

    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }

  if (preview) {
    setPreviewUrl(preview);
    return;
  }

  setPreviewUrl("");
}, [file, preview]);

  return (
    <Wrapper>
      <Label>{label}</Label>

      <UploadArea>
        <HiddenInput
          type="file"
          accept={accept}
          onChange={(e) => {
            if (e.target.files?.[0]) {
                   console.log("Arquivo selecionado:", e.target.files[0]);
              onChange(e.target.files[0]);
            }
          }}
        />

        {previewUrl ? (
         <>
         
         <SuccessMessage>
          <CheckCircle2 size={18} />
          Imagem carregada com sucesso
          </SuccessMessage>
            <RemoveButton
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onChange(null);
              }}
            >
              <X size={18} />
            </RemoveButton>

            <Preview
              src={previewUrl}
              alt="Preview"
            />

            <FileName>
              {file?.name}
            </FileName>
          </>
        ) : (
          <>

        

            <ImagePlus size={48} />

            <Title>
              Clique para escolher uma imagem
            </Title>

            <Subtitle>
              PNG • JPG • WEBP
            </Subtitle>
          </>
        )}
      </UploadArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.text};
`;

const UploadArea = styled.label`
  position: relative;

  width: 100%;
  min-height: 220px;

  border: 2px dashed ${({ theme }) => theme.colors.border};

  border-radius: 18px;

  background: ${({ theme }) => theme.colors.white};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 12px;

  cursor: pointer;

  transition: 0.25s;

  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const Preview = styled.img`
  width: 100%;
  height: 220px;

  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;

  top: 12px;
  right: 12px;

  width: 36px;
  height: 36px;

  border: none;
  border-radius: 50%;

  background: ${({ theme }) => theme.colors.danger};

  color: ${({ theme }) => theme.colors.white};

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: 0.2s;

  z-index: 2;

  &:hover {
    transform: scale(1.08);
  }
`;

const Title = styled.h3`
  margin: 0;

  font-size: 16px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.p`
  margin: 0;

  font-size: 14px;

  color: ${({ theme }) => theme.colors.textLight};
`;

const FileName = styled.p`
  margin: 12px 0 16px;

  font-size: 14px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.text};

  text-align: center;

  max-width: 90%;

  word-break: break-word;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 16px;

  color: ${({ theme }) => theme.colors.success};

  font-size: 14px;
  font-weight: 600;
`;