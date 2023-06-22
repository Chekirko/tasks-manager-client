import { FC, useEffect, useState } from 'react';
import CategoriesItem from '../CategoriesItem/CategoriesItem';
import { useQuery } from '@apollo/client';
import { ALL_CATEGORIES } from '../../API';
import MyModal from '../modal/MyModal';
import AddCategoryForm from '../AddCategoryForm/AddCategoryForm';
import { AddCategoryButton, CardWrapper } from './CategoriesList.styled';

interface Category {
  name: string;
  dateCreated: string;
  id: number;
  tasks: {
    id: string;
  }[];
}

const CategoriesList: FC = () => {
  const { loading, error, data } = useQuery(ALL_CATEGORIES);
  const [categories, setCategories] = useState<Category[]>([]);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (data && data.categories) {
      setCategories(data.categories);
    }
  }, [data]);

  const closeModal = () => {
    setModal(false);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error || !data || !data.categories) {
    return <h2>Error...</h2>;
  }
  return (
    <CardWrapper>
      <AddCategoryButton onClick={() => setModal(true)}>Add category</AddCategoryButton>

      <MyModal visible={modal} setVisible={setModal}>
        <AddCategoryForm closeModal={closeModal}></AddCategoryForm>
      </MyModal>
      {categories.map(({ name, dateCreated, id, tasks }) => {
        return (
          <CategoriesItem
            key={name}
            name={name}
            date={dateCreated}
            sum={tasks.length}
            id={id}
          ></CategoriesItem>
        );
      })}
    </CardWrapper>
  );
};

export default CategoriesList;
