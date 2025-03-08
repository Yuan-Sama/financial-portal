import type { InferSelectModel } from 'drizzle-orm';
import type { accounts } from './schema';
import type { z } from 'zod';
import type { createAccountSchema, deleteAccountsSchema, updateAccountSchema } from './validator';
import type { SuperForm } from 'sveltekit-superforms';

type Account = InferSelectModel<typeof accounts>;
type CreateAccountFormSchema = z.infer<typeof createAccountSchema>;
type UpdateAccountFormSchema = z.infer<typeof updateAccountSchema>;
type DeleteAccountsFormSchema = z.infer<typeof deleteAccountsSchema>;
type CreateAccountForm = SuperForm<CreateAccountFormSchema, any>;
type UpdateAccountForm = SuperForm<UpdateAccountFormSchema, any>;
type DeleteAccountsForm = SuperForm<DeleteAccountsFormSchema, any>;
type AccountForm = CreateAccountForm | UpdateAccountForm;
