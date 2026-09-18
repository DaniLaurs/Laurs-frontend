import styled from "styled-components";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({
  label,
  ...props
}: TextareaProps) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}

      <StyledTextarea {...props} />
    </Wrapper>
  );
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;


const Label = styled.label`
  font-size: 14px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.text};
`;


const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;

  padding: 14px;

  border-radius: 10px;

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.text};

  font-size: 14px;

  resize: vertical;

  outline: none;

  transition: 0.2s;


  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;