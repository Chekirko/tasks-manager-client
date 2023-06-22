import React from 'react';
import { useMutation } from '@apollo/client';
import { ALL_CATEGORIES, DELETE_CATEGORY } from '../../API';

interface DeleteCategoryCardProps {
  closeModal: () => void;
  categoryId: number;
}

const DeleteCategoryCard: React.FC<DeleteCategoryCardProps> = ({
  closeModal,
  categoryId,
}: DeleteCategoryCardProps) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: ALL_CATEGORIES }],
  });

  const handleDeleteCategory = () => {
    deleteCategory({ variables: { id: Number(categoryId) } })
      .then(() => {
        console.log('Category deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };

  return (
    <>
      <p>Do you want delete this category?</p>
      <button onClick={closeModal}>No</button>
      <button onClick={handleDeleteCategory}>Yes</button>
    </>
  );
};

export default DeleteCategoryCard;
