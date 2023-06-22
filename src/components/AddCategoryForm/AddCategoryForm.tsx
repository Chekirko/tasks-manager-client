import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_CATEGORY, ALL_CATEGORIES } from './../../API';

export interface ICategory {
  id: number;
  name: string;
  dateCreated: string;
  user: { id: number };
  tasks: {
    id: string;
  }[];
  userId?: number;
}

interface AddCategoryFormProps {
  closeModal: () => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ closeModal }: AddCategoryFormProps) => {
  const [addCategory, { error }] = useMutation(ADD_CATEGORY, {
    update(cache, { data: { newCategory } }) {
      const categories = cache.readQuery<{ categories: ICategory[] }>({ query: ALL_CATEGORIES });
      if (categories !== null) {
        cache.writeQuery({
          query: ALL_CATEGORIES,
          data: { categories: [{ ...newCategory, tasks: [] }, ...categories.categories] },
        });
      }
    },
  });

  const initialValues = {
    categoryName: '',
  };

  const validationSchema = Yup.object({
    categoryName: Yup.string()
      .min(6, 'Category name must be at least 6 characters')
      .required('Required'),
  });

  const AddCategoryHandler = (categoryName: string) => {
    addCategory({
      variables: { category: { name: categoryName } },
    });
  };

  const handleSubmit = (values: { categoryName: string }) => {
    AddCategoryHandler(values.categoryName);
    closeModal();
  };

  if (error) {
    return <h2>Error...</h2>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field type="text" name="categoryName" placeholder="Enter category name" />
        <ErrorMessage name="categoryName" component="div" />
        <button type="submit">Create Category</button>
      </Form>
    </Formik>
  );
};

export default AddCategoryForm;
