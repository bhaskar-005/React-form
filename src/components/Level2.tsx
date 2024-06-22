// src/App.tsx
import React, { useState } from 'react';
import Input from './Input';
import Modal from './modal';
import { RiUserFill } from 'react-icons/ri';
import RenderField from './RenderField';

interface FormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    applyingForPosition: string;
    relevantExperience: string;
    portfolioURL: string;
    managementExperience: string;
    additionalSkills: string[];
    preferredInterviewTime: string;
  }
  
  interface Errors {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    applyingForPosition?: string;
    relevantExperience?: string;
    portfolioURL?: string;
    managementExperience?: string;
    additionalSkills?: string;
    preferredInterviewTime?: string;
  }

const Level2: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phoneNumber: '',
        applyingForPosition: '',
        relevantExperience: '',
        portfolioURL: '',
        managementExperience: '',
        additionalSkills: [],
        preferredInterviewTime: '',
      });
    
    const  AdditionalSkills = [
        {
            name:'javaScript'
        },
        {
            name:'CSS'
        },
        {
            name:'Python'
        },
        {
            name:'java'
        },
        {
            name:'c/c++'
        },
    ]

      const [errors, setErrors] = useState<Errors>({});
      const [isModalOpen,setIsModalOpen] = useState<Boolean>(false)
    
      const handleChange = (e:React.ChangeEvent<any>) => {
        const { name, value, type, checked } = e.target;
    
        // for handleing checkboxes
        if (type === 'checkbox') {
          if (checked) {
            //for puting the item
            setFormData({
              ...formData,
              additionalSkills: [...formData.additionalSkills, name],
            });
          } else {
            //for removind item
            setFormData({
              ...formData,
              additionalSkills: formData.additionalSkills.filter((skill) => skill !== name),
            });
          }
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      };
    
      const validateForm = () => {
        let tempErrors:Errors = {};

        if (!formData.fullName) tempErrors.fullName = "Full Name is required";
        if (!formData.email) tempErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid";
        if (!formData.phoneNumber) tempErrors.phoneNumber = "Phone Number is required";
        else if (Number(formData.phoneNumber) <= 10) tempErrors.phoneNumber = "Phone Number must be a valid number";
        if (!formData.applyingForPosition) tempErrors.applyingForPosition = "Applying for Position is required";
    
        if (formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') {
          if (!formData.relevantExperience) tempErrors.relevantExperience = "Relevant Experience is required";
          else if (Number(formData.relevantExperience) <= 0) tempErrors.relevantExperience = "Relevant Experience must be a number greater than 0";
        }
    
        if (formData.applyingForPosition === 'Designer') {
          if (!formData.portfolioURL) tempErrors.portfolioURL = "Portfolio URL is required";
          else if (!isValidUrl(formData.portfolioURL)) tempErrors.portfolioURL = "Portfolio URL must be a valid URL";
        }
    
        if (formData.applyingForPosition === 'Manager') {
          if (!formData.managementExperience) tempErrors.managementExperience = "Management Experience is required";
        }
    
        if (formData.additionalSkills.length === 0) tempErrors.additionalSkills = "At least one skill must be selected";
    
        if (!formData.preferredInterviewTime) tempErrors.preferredInterviewTime = "Preferred Interview Time is required";
    
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
      };
    
      const isValidUrl=(url:string)=>{
            const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            return regex.test(url);
      }
      
      const handleSubmit = (e:React.ChangeEvent<any>) => {
        e.preventDefault();
        if (validateForm()) {
            setIsModalOpen(true);
        }
      };

  return (
    <div className="md:w-[40%] w-[100%] bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className=" w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Job Application Form</h1>
        <form onSubmit={handleSubmit}>
      <Input
        label="Full Name:"
        name="fullName"
        type="text"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        placeholder="Enter your full name"
      />

      <Input
        label="Email:"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
      />

      <Input
        label="Phone Number:"
        name="phoneNumber"
        type="tel"
        value={formData.phoneNumber}
        onChange={handleChange}
        error={errors.phoneNumber}
        placeholder="Enter your phone number"
      />

      <div className="mb-4">
        <label htmlFor="applyingForPosition" className="block text-lg font-medium text-gray-700 mb-2">Applying for Position:</label>
        <select
          id="applyingForPosition"
          name="applyingForPosition"
          value={formData.applyingForPosition}
          onChange={handleChange}
          className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md ${errors.applyingForPosition ? 'border-red-500' : ''}`}
        >
          <option value="">Select</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
        {errors.applyingForPosition && <p className="text-red-600 text-md mt-1">{errors.applyingForPosition}</p>}
      </div>

      {formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer' ? (
        <Input
          label="Relevant Experience (Years):"
          name="relevantExperience"
          type="number"
          value={formData.relevantExperience}
          onChange={handleChange}
          error={errors.relevantExperience}
          placeholder="Enter relevant experience"
        />
      ) : null}

      {formData.applyingForPosition === 'Designer' ? (
        <Input
          label="Portfolio URL:"
          name="portfolioURL"
          type="text"
          value={formData.portfolioURL}
          onChange={handleChange}
          error={errors.portfolioURL}
          placeholder="Enter portfolio URL"
        />
      ) : null}

      {formData.applyingForPosition === 'Manager' ? (
        <Input
          label="Management Experience:"
          name="managementExperience"
          type="text"
          value={formData.managementExperience}
          onChange={handleChange}
          error={errors.managementExperience}
          placeholder="Enter management experience"
        />
      ) : null}

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">Additional Skills:</label>
        <div className="flex flex-wrap gap-4">
          {
            AdditionalSkills.map((item)=>(
            <label className="inline-flex items-center" key={item.name}>
            <input
              type="checkbox"
              name={`${item.name}`}
              checked={formData.additionalSkills.includes(`${item.name}`)}
              onChange={handleChange}
              className="form-checkbox text-indigo-600 h-5 w-5"
            />
            <span className="ml-2 text-lg text-gray-700">{`${item.name}`}</span>
          </label>
            ))
          }
        </div>
        {errors.additionalSkills && <p className="text-red-600 text-md mt-1">{errors.additionalSkills}</p>}
      </div>

      <br />

      <Input
        label="Preferred Interview Time:"
        name="preferredInterviewTime"
        type="datetime-local"
        value={formData.preferredInterviewTime}
        onChange={handleChange}
        error={errors.preferredInterviewTime}
        placeholder="Select preferred interview time"
      />

      <button type="submit" className="w-full mt-4 px-6 py-3 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Submit Application
      </button>
    </form>
      </div>
      { isModalOpen && (
    <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}>
      {RenderField('Username', formData.fullName)}
      {RenderField('Email', formData.email)}
      {RenderField('Phone Number', formData.phoneNumber)}
      {RenderField('Applying For Position', formData.applyingForPosition)}
      {RenderField('Relevant Experience', formData.relevantExperience)}
      {RenderField('Portfolio URL', formData.portfolioURL)}
      {RenderField('Management Experience', formData.managementExperience)}
      

      {formData.additionalSkills && formData.additionalSkills.length > 0 && (
        <div className="flex items-center mb-4">
          <RiUserFill className="text-4xl text-blue-500 mr-2" /> 
          <div className="text-xl font-semibold">Additional Skills:</div> 
          <div className="ml-2 flex flex-row flex-wrap gap-2">
            {formData.additionalSkills.map((skill, index) => (
              <div key={index}>{skill},</div>
            ))}
          </div>
        </div>
      )}

      {formData.preferredInterviewTime && formData.preferredInterviewTime.length > 0 && (
        <div className="flex items-center mb-4">
          <RiUserFill className="text-4xl text-blue-500 mr-2" /> 
          <div className="text-xl font-semibold">Preferred Interview Time:</div> 
          <div className="ml-2 flex flex-row flex-wrap gap-2">
            {formData.preferredInterviewTime}
          </div>
        </div>
      )}
       </Modal>
        )}
    </div>
  );
};

export default Level2;
