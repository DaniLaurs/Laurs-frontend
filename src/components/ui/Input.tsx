import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  ...props
}: InputProps) {
  return (
    <Container>
      {label && <Label>{label}</Label>}

      <StyledInput {...props} />

      {error && <Error>{error}</Error>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledInput = styled.input`
  width: 100%;
  height: 46px;

  padding: 0 14px;

  border-radius: 10px;

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.text};

  font-size: 15px;

  transition: 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const Error = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
`;