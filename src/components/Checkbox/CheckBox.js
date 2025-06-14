import React from 'react';
import { Field } from 'formik';

const CheckBox = () => (
  <div className="flex items-center justify-end">
    <Field
      id="remember-me-checkbox"
      name="rememberMe"
      type="checkbox"
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label
      htmlFor="remember-me-checkbox"
      className="ml-2 block text-sm text-gray-700 select-none cursor-pointer"
    >
      Remember me
    </label>
  </div>
);

export default CheckBox;
