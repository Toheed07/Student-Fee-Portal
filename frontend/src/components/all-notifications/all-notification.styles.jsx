import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  width: 95%;
  margin: auto;
  
`;

export const TableHead = styled.th`
  background-color: #ddd;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;
