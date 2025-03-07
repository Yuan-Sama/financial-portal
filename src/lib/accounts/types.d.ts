import type { InferSelectModel } from 'drizzle-orm';
import type { accounts } from './schema';
import type { z } from 'zod';
import type { createAccountSchema, updateAccountSchema } from './validator';
import type { SuperForm } from 'sveltekit-superforms';

type Account = InferSelectModel<typeof accounts>;
type CreateAccountFormSchema = z.infer<typeof createAccountSchema>;
type UpdateAccountFormSchema = z.infer<typeof updateAccountSchema>;
type CreateAccountForm = SuperForm<CreateAccountFormSchema, any>;
type UpdateAccountForm = SuperForm<UpdateAccountFormSchema, any>;
type AccountForm = CreateAccountForm | UpdateAccountForm;
