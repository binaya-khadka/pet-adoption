import styled from 'styled-components';

export const FormContainer = styled.div`
  display: grid;
  place-items: center;
  height: calc(100vh - 12rem);
`;

export const Form = styled.form`
  padding: 3.5rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
