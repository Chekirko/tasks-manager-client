import { FC, useState } from 'react';
import { format } from 'date-fns';
import MyModal from '../modal/MyModal';
import ActionCard from '../ActionCard/ActionCard';
import TasksCard from '../TasksCard/TasksCard';
import { ItemWrapper } from './CategoriesItem.styled';

export interface CategoriesItemProps {
  id: number;
  name: string;
  date: string;
  sum: number;
}

const CategoriesItem: FC<CategoriesItemProps> = ({ name, date, id, sum }) => {
  const [modalAction, setModalAction] = useState(false);
  const [tasksInfo, setTasksInfo] = useState(false);

  const closeModal = () => {
    setModalAction(false);
  };

  const formattedDate = format(new Date(date), 'dd.MM.yyyy');
  return (
    <>
      <ItemWrapper>
        <h2>{name}</h2>
        <span>{sum} tasks</span>
        <span>{formattedDate}</span>
        <button onClick={() => setModalAction(true)}>Actions</button>
        <MyModal visible={modalAction} setVisible={setModalAction}>
          <ActionCard closeModal={closeModal} id={id}></ActionCard>
        </MyModal>
        <button onClick={() => setTasksInfo(!tasksInfo)}>More</button>
      </ItemWrapper>

      {tasksInfo && <TasksCard categoryId={id} />}
    </>
  );
};

export default CategoriesItem;
