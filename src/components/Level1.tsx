// src/App.tsx
import React, { useState } from 'react';
import Input from './Input';
import Modal from './modal';
import RenderField from './RenderField';

interface FormData {
  name: string;
  email: string;
  age: string;
  isAttendingWithGuest: string;
  guestName: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
  guestName?: string;
}

const Level1: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    isAttendingWithGuest: 'no',
    guestName: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isModalOpen,setIsModalOpen] = useState<Boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target; 
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';

    if (!formData.age) newErrors.age = 'Age is required';
    else if (Number(formData.age) <= 10) newErrors.age = 'Age must be greater than 10';

    if (formData.isAttendingWithGuest === 'yes' && !formData.guestName) {
      newErrors.guestName = 'Guest name is required if attending with a guest';
    }

    setErrors(newErrors);
    return Object.keys(errors).length === 0
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
        setIsModalOpen(true);
    }
  };


  return (
    <div className="md:w-[40%] w-[100%] bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className=" w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Event Registration Form
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name:"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Email:"
            type="text"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Age:"
            type="number"
            name="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
            error={errors.age}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Are you attending with a guest?
              <select
                name="isAttendingWithGuest"
                value={formData.isAttendingWithGuest}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
          </div>
          {formData.isAttendingWithGuest === "yes" && (
            <Input
              label="Guest Name:"
              type="text"
              name="guestName"
              placeholder="Enter guest name"
              value={formData.guestName}
              onChange={handleChange}
              error={errors.guestName}
            />
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {RenderField("Name", formData.name)}
          {RenderField("Email", formData.email)}
          {RenderField("Age", formData.age)}
          {RenderField(
            "Attending With Guest",
            formData.isAttendingWithGuest
          )}
          {formData.guestName &&
            RenderField("Guest Name", formData.guestName)}
        </Modal>
      )}
    </div>
  );
};

export default Level1;
