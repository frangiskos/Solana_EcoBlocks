import { db } from '@/utils/db';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSellerFormValue, createSellerSchema } from '@/utils/form-validations';

export type SellerFormSchemaProps = {
  values?: Partial<CreateSellerFormValue>;
  onCreateRequest: (values: CreateSellerFormValue) => unknown;
};

const CreateSellerForm: React.FC<SellerFormSchemaProps> = ({ values, onCreateRequest }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<CreateSellerFormValue>({ resolver: zodResolver(createSellerSchema) });

  useEffect(() => {
    if (values) {
      values.name && setValue('name', values.name);
      values.url && setValue('url', values.url);
      values.description && setValue('description', values.description);
      values.address && setValue('address', values.address);
    }
  }, [values, setValue]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = () => {
    setIsSubmitting(false);
  };

  function handleOnChange(changeEvent: React.ChangeEvent<HTMLFormElement>) {
    console.log('handleOnChange', changeEvent);
  }

  const onSubmit = async (data: CreateSellerFormValue) => {
    if (isSubmitting) {
      onCreateRequest(data);
    } else {
      // Check if seller name is already taken
      const sellerNameExists = await db.sellers.sellerNameExists(data.name);

      if (sellerNameExists) {
        setError('name', {
          type: 'manual',
          message: 'Business name is already taken',
        });
      } else {
        setIsSubmitting(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={handleOnChange}>
      <div className="grid grid-cols-2 gap-x-20">
        <div className="form-control w-full max-w-xs">
          <label className={clsx('label') && errors.name ? 'text-error' : ''} htmlFor="name">
            <span className="label-text">What is your business name?</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Type here"
            className={clsx('input input-bordered w-full max-w-xs' && errors.name && 'input-error')}
            disabled={isSubmitting}
            {...register('name')}
          />
          {errors.name && (
            <label className="label">
              <span className="label-text-alt">{errors.name?.message}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className={clsx('label') && errors.url ? 'text-error' : ''} htmlFor="url">
            <span className="label-text">What is your business page?</span>
          </label>
          <input
            type="url"
            id="url"
            placeholder="Type here"
            className={clsx('input input-bordered w-full max-w-xs' && errors.url && 'input-error')}
            disabled={isSubmitting}
            {...register('url')}
          />
          {errors.url && (
            <label className="label">
              <span className="label-text-alt">{errors.url?.message}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className={clsx('label') && errors.url ? 'text-error' : ''} htmlFor="address">
            <span className="label-text">What is your business page?</span>
          </label>
          <input
            type="text"
            id="address"
            placeholder="Type here"
            className={clsx('input input-bordered w-full max-w-xs' && errors.address && 'input-error')}
            disabled={isSubmitting}
            {...register('address')}
          />
          {errors.address && (
            <label className="label">
              <span className="label-text-alt">{errors.address?.message}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className={clsx('label') && errors.description ? 'text-error' : ''} htmlFor="description">
            <span className="label-text">Tell us about your company (optional)</span>
          </label>
          <textarea
            id="description"
            placeholder="Type here"
            className={clsx(
              'textarea textarea-bordered w-full max-w-xs h-24' && errors.description && 'textarea-error'
            )}
            disabled={isSubmitting}
            {...register('description')}
          />
          {errors.description && (
            <label className="label">
              <span className="label-text-alt">{errors.description?.message}</span>
            </label>
          )}
        </div>

        {/* <Input
          id="projectName"
          type="text"
          placeholder="Project Name"
          isDisabled={isSubmitting}
          isInvalid={!!errors.projectName}
          errorText={errors.projectName?.message as string | undefined}
          {...register('projectName')}
        />
       */}

        <div className="col-span-2">
          <button className="btn" disabled={isSubmitting} type="submit">
            Button
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateSellerForm;
