import { useEffect, useState } from 'react';
// import { ALL_TASKS } from '../../API';
import { gql, useApolloClient } from '@apollo/client';
import TasksItem from '../TasksItem/TasksItem';
import MyModal from '../modal/MyModal';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { TaskCardStyled, TasksList } from './TasksCard.styled';

export interface ITask {
  id: number;
  name: string;
  dateStart: string;
  dateEnd: string;
}

interface TasksCardProps {
  categoryId: number;
}

const TasksCard: React.FC<TasksCardProps> = ({ categoryId }: TasksCardProps) => {
  const client = useApolloClient();
  const [tasks, setTasks] = useState<ITask[]>([]);

  const [modalAction, setModalAction] = useState(false);

  useEffect(() => {
    const category = client.readFragment({
      id: `Category:${categoryId}`,
      fragment: gql`
        fragment Tasks on Category {
          tasks {
            id
            name
            dateEnd
            dateStart
          }
        }
      `,
    });

    if (category && category.tasks) {
      setTasks(category.tasks);
    }
  }, [categoryId, client]);

  if (tasks.length === 0) {
    return <p>There are no tasks yet</p>;
  }

  const closeModal = () => {
    setModalAction(false);
  };

  return (
    <TaskCardStyled>
      <button onClick={() => setModalAction(true)}>Add new task</button>

      <MyModal visible={modalAction} setVisible={setModalAction}>
        <AddTaskForm closeModal={closeModal} categoryId={categoryId}></AddTaskForm>
      </MyModal>

      {!tasks.length && <p>There are no tasks yet</p>}
      <TasksList>
        {tasks.map(({ id, name, dateStart, dateEnd }) => {
          return (
            <TasksItem
              key={id}
              name={name}
              dateStart={dateStart}
              dateEnd={dateEnd}
              id={id}
            ></TasksItem>
          );
        })}
      </TasksList>
    </TaskCardStyled>
  );
};

export default TasksCard;
