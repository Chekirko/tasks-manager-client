import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { ADD_TASK, client } from '../../API';
import { ITask } from '../TasksCard/TasksCard';

interface IAddTaskFormProps {
  categoryId: number;
  closeModal: () => void;
}

const AddTaskForm = ({ closeModal, categoryId }: IAddTaskFormProps) => {
  const [addTask] = useMutation(ADD_TASK);

  const formik = useFormik({
    initialValues: {
      name: '',
      dateStart: '',
      dateEnd: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      dateStart: Yup.date().required('Start date is required'),
      dateEnd: Yup.date().required('End date is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await addTask({
          variables: {
            task: {
              categoryId: Number(categoryId),
              name: values.name,
              dateStart: values.dateStart,
              dateEnd: values.dateEnd,
            },
          },
        });

        if (data && data.addTask) {
          const newTask: ITask = data.addTask;
          resetForm();

          // Обновление кеша с использованием readFragment и writeFragment
          addTaskToCache(newTask);
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
      closeModal();
    },
  });

  const addTaskToCache = (newTask: ITask) => {
    try {
      const cacheId = `Category:${categoryId}`;
      const fragment = gql`
        fragment NewTask on Task {
          id
          name
          dateStart
          dateEnd
        }
      `;

      const existingTasks: ITask[] | null = client.cache.readFragment({
        id: cacheId,
        fragment,
      });

      const updatedTasks = existingTasks ? [...existingTasks, newTask] : [newTask];

      client.cache.writeFragment({
        id: cacheId,
        fragment,
        data: {
          tasks: updatedTasks,
        },
      });
    } catch (error) {
      console.error('Error updating cache:', error);
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}
      </div>
      <div>
        <label htmlFor="dateStart">Start Date</label>
        <input
          type="date"
          id="dateStart"
          name="dateStart"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dateStart}
        />
        {formik.touched.dateStart && formik.errors.dateStart && (
          <div>{formik.errors.dateStart}</div>
        )}
      </div>
      <div>
        <label htmlFor="dateEnd">End Date</label>
        <input
          type="date"
          id="dateEnd"
          name="dateEnd"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dateEnd}
        />
        {formik.touched.dateEnd && formik.errors.dateEnd && <div>{formik.errors.dateEnd}</div>}
      </div>
      <button type="button" onClick={closeModal}>
        Cansel
      </button>
      <button type="submit">Save</button>
    </form>
  );
};

export default AddTaskForm;
