import { styled } from 'styled-components';

interface BoardProps {
  size: number;
  borderRadius: string;
}

const Board = ({ size = 4 }: BoardProps) => {
  return (
    <div className="grid grid-cols-4">
      {Array.from({ length: size * size }, (_, index) => (
        <BoardItem key={index} className=""></BoardItem>
      ))}
    </div>
  );
};

interface BoardItemProps {
  width: string;
}

const BoardItem = styled.div<BoardItemProps>`
  background-color: 'red';
  width: ${(props) => props.width};
  height: ${(props) => props.width};
`;

export default Board;
