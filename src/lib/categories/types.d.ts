import type { InferSelectModel } from 'drizzle-orm';
import type { categories } from './schema';
import type { z } from 'zod';
import type {
	createCategorySchema,
	deleteCategoriesSchema,
	updateCategorySchema
} from './validator';
import type { SuperForm } from 'sveltekit-superforms';

type Category = InferSelectModel<typeof categories>;
type CreateCategoryFormSchema = z.infer<typeof createCategorySchema>;
type UpdateCategoryFormSchema = z.infer<typeof updateCategorySchema>;
type DeleteCategoriesFormSchema = z.infer<typeof deleteCategoriesSchema>;
type CreateCategoryForm = SuperForm<CreateCategoryFormSchema, any>;
type UpdateCategoryForm = SuperForm<UpdateCategoryFormSchema, any>;
type DeleteCategoriesForm = SuperForm<DeleteCategoriesFormSchema, any>;
type CategoryForm = CreateCategoryForm | UpdateCategoryForm;
