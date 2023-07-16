'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HandleCouponFormValue, handleCouponSchema } from '@/utils/form-validations';
import Input from '@/components/ui/Input';

export type AssignCouponProps = {
  onCreateRequest: (values: HandleCouponFormValue) => unknown;
};

const AssignCouponForm: React.FC<AssignCouponProps> = ({ onCreateRequest }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HandleCouponFormValue>({ resolver: zodResolver(handleCouponSchema) });

  const onSubmit = async (data: HandleCouponFormValue) => {
    onCreateRequest(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-20">
        <h3>Enter your coupon code</h3>
        <Input
          id="coupon"
          label="What is your coupon code?"
          placeholder="Type here"
          required={true}
          {...register('coupon')}
          error={errors?.coupon?.message}
        />

        <div className="col-span-2">
          <button className="btn" type="submit">
            Add coupon
          </button>
        </div>
      </div>
    </form>
  );
};

export default AssignCouponForm;
