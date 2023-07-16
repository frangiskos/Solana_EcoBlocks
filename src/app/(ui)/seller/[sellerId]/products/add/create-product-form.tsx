'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductFormValue, createProductSchema } from '@/utils/form-validations';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { generateCouponCodes } from '@/utils/utils';
import { constants } from '@/constants';

export type ProductFormSchemaProps = {
  values?: Partial<CreateProductFormValue>;
  onCreateRequest: (values: CreateProductFormValue) => unknown;
};

const CreateProductForm: React.FC<ProductFormSchemaProps> = ({ values, onCreateRequest }) => {
  const [coupons, setCoupons] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateProductFormValue>({ resolver: zodResolver(createProductSchema) });

  useEffect(() => {
    console.log('useEffect total coupons', coupons.length);
  }, [coupons]);

  useEffect(() => {
    const defaultValidFrom = new Date();
    defaultValidFrom.setHours(0, 0, 0, 0);
    const defaultValidTo = new Date(defaultValidFrom.getDate());
    defaultValidTo.setFullYear(defaultValidFrom.getFullYear() + 10);
    defaultValidTo.setMonth(0);
    defaultValidTo.setDate(1);
    setValue('validFrom', defaultValidFrom.toISOString().slice(0, 10));
    setValue('validTo', defaultValidTo.toISOString().slice(0, 10));
    if (values) {
      values.name && setValue('name', values.name);
      values.validFrom && setValue('validFrom', values.validFrom);
      values.validTo && setValue('validTo', values.validTo);
      values.couponTerms && setValue('couponTerms', values.couponTerms);
      values.coupons && setValue('coupons', values.coupons);
    }
  }, [values, setValue]);

  function handleOnChange(changeEvent: React.ChangeEvent<HTMLFormElement>) {
    if (changeEvent.target.id === 'totalCoupons') {
      const totalCoupons = Number(changeEvent.target.value);
      if (
        !totalCoupons ||
        isNaN(totalCoupons) ||
        totalCoupons > constants.MAX_COUPONS ||
        totalCoupons < 1 ||
        totalCoupons === coupons.length
      ) {
        return;
      }

      if (totalCoupons > coupons.length) {
        const newCoupons = generateCouponCodes(totalCoupons - coupons.length);
        setCoupons([...coupons, ...newCoupons]);
      } else {
        setCoupons(coupons.slice(0, totalCoupons));
      }
      setValue('coupons', coupons);
    }
  }

  const onSubmit = async (data: CreateProductFormValue) => {
    onCreateRequest({ ...data, coupons, totalCoupons: coupons.length });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} onChange={handleOnChange}>
      <div className="grid grid-cols-2 gap-x-20">
        <Input
          id="name"
          label="What is your product name?"
          placeholder="Type here"
          required={true}
          {...register('name')}
          error={errors?.name?.message}
        />
        <Input
          id="couponTerms"
          label="What are the terms of the coupon?"
          placeholder="e.g. 10% off your next purchase"
          required={true}
          {...register('couponTerms')}
          error={errors?.couponTerms?.message}
        />
        <Input
          id="validFrom"
          type="date"
          label="Coupons valid from?"
          required={true}
          {...register('validFrom')}
          error={errors?.validFrom?.message}
        />
        <Input
          id="validTo"
          type="date"
          label="Coupons valid to?"
          required={true}
          {...register('validTo')}
          error={errors?.validTo?.message}
        />
        <Input
          id="totalCoupons"
          type="number"
          label="How many coupons shall we generate? Note that you can always generate more later."
          placeholder="Type here"
          {...register('totalCoupons')}
          error={errors?.totalCoupons?.message}
        />
        <Textarea
          id="coupons"
          label="coupons"
          placeholder="coupons are generated automatically"
          readOnly={true}
          value={coupons.join(', ')}
          {...register('coupons')}
          error={errors?.coupons?.message}
        />

        <div className="col-span-2">
          <button className="btn" type="submit">
            Create Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateProductForm;
