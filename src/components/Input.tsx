import React, { forwardRef, ForwardedRef, useId } from 'react';
import { MdOutlineErrorOutline } from "react-icons/md";

interface InputType {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const Input = forwardRef(
  (
    { label, type, name, value, onChange, error, placeholder }: InputType,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const id = useId();
    return (
      <div className="mb-4">
        <label
          htmlFor={id}
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
        />
        {error && (
          <p className="text-red-600 text-md mt-1 flex items-center gap-2">
            <MdOutlineErrorOutline /> {error}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
