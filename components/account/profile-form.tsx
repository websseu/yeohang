'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UserNameSchema } from '@/lib/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { updateUserName } from '@/lib/actions/user.actions';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function ProfileForm() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const form = useForm<z.infer<typeof UserNameSchema>>({
    resolver: zodResolver(UserNameSchema),
    defaultValues: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      name: session?.user?.name!,
    },
  });
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof UserNameSchema>) {
    const res = await updateUserName(values);

    if (!res.success)
      return toast({
        variant: 'destructive',
        description: res.message,
      });

    const { data, message } = res;

    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: data.name,
      },
    };

    await update(newSession);

    toast({
      description: message,
    });
    router.push('/account');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='  flex flex-col gap-5'
      >
        <div className='flex flex-col gap-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='font-bold'>New name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Name'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          size='lg'
          disabled={form.formState.isSubmitting}
          className='button col-span-2 w-full'
        >
          {form.formState.isSubmitting ? 'Submitting...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
