import { FC, useState } from 'react';
// import { format } from 'date-fns';
import MyModal from '../modal/MyModal';
import TasksCard from '../TasksCard/TasksCard';
import EditTaskForm from '../EditTaskForm/EditTaskForm';
import { TaskCard } from './TasksItem.styled';

export interface TasksItemProps {
  id: number;
  name: string;
  dateStart: string;
  dateEnd: string;
}

const TasksItem: FC<TasksItemProps> = ({ id, name, dateStart, dateEnd }: TasksItemProps) => {
  const [modalAction, setModalAction] = useState(false);

  const closeModal = () => {
    setModalAction(false);
  };

  return (
    <TaskCard>
      <h3>{name}</h3>
      <p>start date: {dateStart}</p>
      <p>end date: {dateEnd}</p>

      <button>Delete</button>

      <button onClick={() => setModalAction(true)}>Edit</button>
      <MyModal visible={modalAction} setVisible={setModalAction}>
        <EditTaskForm closeModal={closeModal} id={id}></EditTaskForm>
      </MyModal>
    </TaskCard>
  );
};

export default TasksItem;
