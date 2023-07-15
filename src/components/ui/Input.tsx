import clsx from 'clsx';
import React, { forwardRef } from 'react';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  id: string;
  className?: string;
  isInvalid?: boolean;
  errorText?: string;
  required?: boolean;
  placeholder: string;
  infoText?: string;
  type?: string;
  isDisabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      name,
      id,
      isInvalid = false,
      errorText,
      placeholder,
      infoText = '',
      required = false,
      isDisabled = false,
      type = 'text',
      ...otherProps
    },
    ref
  ) => (
    <div className="relative flex flex-col">
      <div>
        <label
          htmlFor={id}
          className={clsx(
            'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
            isInvalid ? 'text-red-600' : ''
          )}
        >
          First name
        </label>
        <input
          type="text"
          id={id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required
        ></input>
      </div>

      <input
        id={id}
        name={name}
        type={type}
        className={clsx(
          'mt-10 block w-full rounded-md border-transparent bg-gray-100',
          'focus:border-gray-300 focus:bg-white focus:ring-0',
          isInvalid ? 'border-red-600 focus:ring-red-600' : '',
          isDisabled ? 'bg-gray-200' : '',
          className
        )}
        disabled={isDisabled}
        placeholder={placeholder}
        ref={ref}
        {...otherProps}
      ></input>

      <label htmlFor={id} className="relative block">
        {isInvalid && errorText && (
          <span className="-mb-3 block py-1 pl-4 text-left text-sm text-red-600">{errorText}</span>
        )}
      </label>
    </div>
  )
);
Input.displayName = 'Input';

export default Input;
