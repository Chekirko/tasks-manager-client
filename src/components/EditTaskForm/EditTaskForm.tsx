import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useApolloClient } from '@apollo/client';
import { UPDATE_CATEGORY } from '../../API';

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

interface UpdateCategoryFormProps {
  closeModal: () => void;
  id: number;
}

const EditTaskForm: React.FC<UpdateCategoryFormProps> = ({
  closeModal,
  id,
}: UpdateCategoryFormProps) => {
  const client = useApolloClient();
  const [updateCategory, { error: updateError }] = useMutation(UPDATE_CATEGORY);

  const handleUpdateCategory = async (categoryId: number, categoryName: string) => {
    try {
      const { data } = await updateCategory({
        variables: {
          category: {
            id: categoryId,
            name: categoryName,
          },
        },
      });

      if (data && data.category) {
        const updatedCategory = data.category;
        client.cache.modify({
          fields: {
            categories(existingCategories = []) {
              const updatedCategories = existingCategories.map((category: ICategory) => {
                if (category.id === updatedCategory.id) {
                  return {
                    ...category,
                    ...updatedCategory,
                  };
                }
                return category;
              });
              return updatedCategories;
            },
          },
        });
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const initialValues = {
    categoryName: '',
  };

  const validationSchema = Yup.object({
    categoryName: Yup.string()
      .min(6, 'Category name must be at least 6 characters')
      .required('Required'),
  });

  const handleSubmit = (values: { categoryName: string }) => {
    handleUpdateCategory(Number(id), values.categoryName);
    closeModal();
  };

  if (updateError) {
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
        <button type="button" onClick={closeModal}>
          Cansel
        </button>
        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
};

export default EditTaskForm;
