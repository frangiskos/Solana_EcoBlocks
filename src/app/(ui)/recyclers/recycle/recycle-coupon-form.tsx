'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HandleCouponFormValue, handleCouponSchema } from '@/utils/form-validations';
import Input from '@/components/ui/Input';

export type RecycleCouponProps = {
  onRecycleRequest: (values: HandleCouponFormValue) => unknown;
};

const RecycleCouponForm: React.FC<RecycleCouponProps> = ({ onRecycleRequest }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HandleCouponFormValue>({ resolver: zodResolver(handleCouponSchema) });

  const onSubmit = async (data: HandleCouponFormValue) => {
    onRecycleRequest(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-20">
        <h3>Recycle Coupon</h3>
        <Input
          id="coupon"
          label="Coupon code?"
          placeholder="Type coupon code"
          required={true}
          {...register('coupon')}
          error={errors?.coupon?.message}
        />

        <div className="col-span-2">
          <button className="btn" type="submit">
            Recycle
          </button>
        </div>
      </div>
    </form>
  );
};

export default RecycleCouponForm;
