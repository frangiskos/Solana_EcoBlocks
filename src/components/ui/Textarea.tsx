import clsx from 'clsx';
import React, { forwardRef } from 'react';

interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
  name: string;
  id: string;
  type?: string;
  className?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      name,
      id,
      type = 'text',
      className,
      required = false,
      label = '',
      placeholder = '',
      error = '',
      disabled = false,
      ...otherProps
    },
    ref
  ) => (
    <div className="relative flex flex-col">
      <div className="form-control w-full max-w-xs">
        {label && (
          <label htmlFor={id} className={clsx('label')}>
            <span className="label-text">
              {label} {required && <span> *</span>}
            </span>
          </label>
        )}
        <textarea
          id={id}
          name={name}
          className={clsx('textarea textarea-bordered h-24', error && 'textarea-error')}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          ref={ref}
          {...otherProps}
        ></textarea>
        {error && (
          <label className="label">
            <span className="label-text-alt">{error}</span>
          </label>
        )}
      </div>
    </div>
  )
);

Textarea.displayName = 'Textarea';
export default Textarea;
