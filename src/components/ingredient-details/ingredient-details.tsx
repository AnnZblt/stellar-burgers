import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ingredientsItems } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(ingredientsItems);
  const { id } = useParams();
  const ingredientData = useMemo(
    () => ingredients.find((ingredient) => ingredient._id === id),
    [ingredients, id]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
