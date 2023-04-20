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

export const ViewAllButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 16px;
  margin-left: 27px;
  cursor: pointer;

  &:hover {
    background-color: #3e8e41;
  }
`;
