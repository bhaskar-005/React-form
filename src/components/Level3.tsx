import React, { useState } from "react";
import Input from "./Input";
import RenderField from "./RenderField";
import Modal from "./modal";


interface SurveyFormData {
    fullName: string;
    email: string;
    surveyTopic: string;
    favoriteLanguage?: string;
    yearsExperience?: number;
    exerciseFrequency?: string;
    dietPreference?: string;
    highestQualification?: string;
    fieldOfStudy?: string;
    feedback: string;
  }

const Level3: React.FC = () => {
        const [formData, setFormData] = useState<SurveyFormData>({
          fullName: '',
          email: '',
          surveyTopic: '',
          feedback: '',
        });
        const [isModalOpen,setIsModalOpen] = useState<Boolean>(false)
        const [errors, setErrors] = useState<Partial<SurveyFormData>>({});
      
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
        };
      
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (validateForm()) {
            setIsModalOpen(true);
          }
        };
      
        const validateForm = (): boolean => {
          let tempErrors: Partial<any> = {};
          if (!formData.fullName) tempErrors.fullName = "Full Name is required";
          if (!formData.email) tempErrors.email = "Email is required";
          else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid";
          if (!formData.surveyTopic) tempErrors.surveyTopic = "Survey Topic is required";
          if (formData.surveyTopic === 'Technology') {
            if (!formData.favoriteLanguage) tempErrors.favoriteLanguage = "Favorite Programming Language is required";
            if (!formData.yearsExperience || formData.yearsExperience <= 0) tempErrors.yearsExperience = "Years of Experience must be greater than 0";
          } else if (formData.surveyTopic === 'Health') {
            if (!formData.exerciseFrequency) tempErrors.exerciseFrequency = "Exercise Frequency is required";
            if (!formData.dietPreference) tempErrors.dietPreference = "Diet Preference is required";
          } else if (formData.surveyTopic === 'Education') {
            if (!formData.highestQualification) tempErrors.highestQualification = "Highest Qualification is required";
            if (!formData.fieldOfStudy) tempErrors.fieldOfStudy = "Field of Study is required";
          }
          if (!formData.feedback || formData.feedback.length < 50) tempErrors.feedback = "Feedback is required and must be at least 50 characters";
      
          setErrors(tempErrors);
          return Object.keys(tempErrors).length === 0;
        };
      


  return (
    <div className="md:w-[40%] w-[100%] bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className=" w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Survey Form with Dependent Questions and Dynamic Sections
        </h1>
        <form onSubmit={handleSubmit}>
      <div className="mb-4">
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
      </div>

      <div className="mb-4">
        <label htmlFor="surveyTopic" className="block text-lg font-medium text-gray-700 mb-2">
          Survey Topic:
        </label>
        <select
          id="surveyTopic"
          name="surveyTopic"
          value={formData.surveyTopic}
          onChange={handleChange}
          className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md ${errors.surveyTopic ? 'border-red-500' : ''}`}
        >
          <option value="">Select</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
        {errors.surveyTopic && <p className="text-red-600 text-md mt-1">{errors.surveyTopic}</p>}
      </div>

      {/* Conditional sections based on survey topic */}
      {formData.surveyTopic === 'Technology' && (
        <div>
          <div className="mb-4">
            <label htmlFor="favoriteLanguage" className="block text-lg font-medium text-gray-700 mb-2">
              Favorite Programming Language:
            </label>
            <select
              id="favoriteLanguage"
              name="favoriteLanguage"
              value={formData.favoriteLanguage || ''}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md ${errors.favoriteLanguage ? 'border-red-500' : ''}`}
            >
              <option value="">Select</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.favoriteLanguage && <p className="text-red-600 text-md mt-1">{errors.favoriteLanguage}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="yearsExperience" className="block text-lg font-medium text-gray-700 mb-2">
              Years of Experience:
            </label>
            <input
              type="number"
              id="yearsExperience"
              name="yearsExperience"
              value={formData.yearsExperience || ''}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md ${errors.yearsExperience ? 'border-red-500' : ''}`}
              placeholder="Enter your years of experience"
            />
            {errors.yearsExperience && <p className="text-red-600 text-md mt-1">{errors.yearsExperience}</p>}
          </div>
        </div>
      )}

      {formData.surveyTopic === 'Health' && (
        <div>
          <div className="mb-4">
            <label htmlFor="exerciseFrequency" className="block text-lg font-medium text-gray-700 mb-2">
              Exercise Frequency:
            </label>
            <select
              id="exerciseFrequency"
              name="exerciseFrequency"
              value={formData.exerciseFrequency || ''}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md ${errors.exerciseFrequency ? 'border-red-500' : ''}`}
            >
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <p className="text-red-600 text-md mt-1">{errors.exerciseFrequency}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="dietPreference" className="block text-lg font-medium text-gray-700 mb-2">
              Diet Preference:
            </label>
            <select
              id="dietPreference"
              name="dietPreference"
              value={formData.dietPreference || ''}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md ${errors.dietPreference ? 'border-red-500' : ''}`}
            >
              <option value="">Select</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && <p className="text-red-600 text-md mt-1">{errors.dietPreference}</p>}
          </div>
        </div>
      )}

      {formData.surveyTopic === 'Education' && (
        <div>
          <div className="mb-4">
            <label htmlFor="highestQualification" className="block text-lg font-medium text-gray-700 mb-2">
              Highest Qualification:
            </label>
            <select
              id="highestQualification"
              name="highestQualification"
              value={formData.highestQualification || ''}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md ${errors.highestQualification ? 'border-red-500' : ''}`}
            >
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.highestQualification && <p className="text-red-600 text-md mt-1">{errors.highestQualification}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="fieldOfStudy" className="block text-lg font-medium text-gray-700 mb-2">
              Field of Study:
            </label>
            <input
              type="text"
              id="fieldOfStudy"
              name="fieldOfStudy"
              value={formData.fieldOfStudy || ''}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md ${errors.fieldOfStudy ? 'border-red-500' : ''}`}
              placeholder="Enter your field of study"
            />
            {errors.fieldOfStudy && <p className="text-red-600 text-md mt-1">{errors.fieldOfStudy}</p>}
          </div>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="feedback" className="block text-lg font-medium text-gray-700 mb-2">
          Feedback:
        </label>
        <textarea
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md ${errors.feedback ? 'border-red-500' : ''}`}
          placeholder="Enter your feedback (at least 50 characters)"
        ></textarea>
        {errors.feedback && <p className="text-red-600 text-md mt-1">{errors.feedback}</p>}
      </div>

      <button type="submit" className="w-full mt-4 px-6 py-3 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Submit Application
      </button>
    </form>
      </div>
      { isModalOpen && (
    <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}>
      {RenderField('Username', formData.fullName)}
      {RenderField('Email', formData.email)}
      {RenderField('Survey Topic', formData.surveyTopic)}
      {RenderField('Favorite Language', formData.favoriteLanguage!)}
      {RenderField('Years of Experience', formData.yearsExperience?.toString()!)}
      {RenderField('Exercise Frequency', formData.exerciseFrequency!)}
      {RenderField('Diet Preference', formData.dietPreference!)}
      {RenderField('Highest Qualification', formData.highestQualification!)}
      {RenderField('Field of Study', formData.fieldOfStudy!)}
      {RenderField('Feedback', formData.feedback)}
       </Modal>
        )}
    </div>
  );
};

export default Level3;
