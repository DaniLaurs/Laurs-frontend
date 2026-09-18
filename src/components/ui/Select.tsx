import styled from "styled-components";

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
  label?: string;
}

export default function Select({
  label,
   children,
  ...props
}: SelectProps) {



  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
<StyledSelect {...props}>
  {children}
</StyledSelect>
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

const StyledSelect = styled.select`
  width: 100%;
  height: 44px;

  padding: 0 14px;

  border-radius: 10px;

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.text};

  font-size: 14px;

  outline: none;

  transition: 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;