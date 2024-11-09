import { Plus } from 'lucide-react';
import React, { useState } from 'react';

function ExperienceForm({ skills, selected, setSelected }) {

  const handleChange = (e, index) => {
    const value = e.target.value;
    setSelected((prevState) => {
      const newState = [...prevState];
      newState[index].skill = value;
      return newState;
    });
  };

  const addQuestions = ()=>{
    setSelected(state => [...state,{}])
  }

  const getAvailableSkills = (index) => {
    const alreadySelected = selected.filter((_, i) => i !== index);
    return skills.filter(skill => !alreadySelected.some(state => state.skill === skill));
  };

  const removeSkill = (index) => {
    setSelected(state => state.filter((_, ind) => index !== ind));
  };

  const handleNumberChange = (e, index) => {
    setSelected(state => {
      const newState = [...state];
      newState[index].number = e.target.value;
      return newState;
    });
  };

  const handleCheckboxChange = (e, index) => {
    setSelected(state => {
      const newState = [...state];
      newState[index].mustHave = e.target.checked; // Correctly use checked for checkboxes
      return newState;
    });
  };

  return (
    <div>
      {selected.map((item, index) => (
        <div key={index} className="bg-white p-4 shadow-md rounded-lg">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              How many years of work experience do you have with [Skill]?
            </h2>
            <button type='button' className="text-sm font-semibold text-white bg-green-600 px-2 py-1 rounded-full">
              Recommended
            </button>
            <button type='button' onClick={() => removeSkill(index)} className="text-gray-500 hover:text-black">
              &times;
            </button>
          </div>

          {/* Form Fields Section */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skill*
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleChange(e, index)}
                value={item?.skill || ''}
                name='selectedSkills'
              >
                <option value="">Select a skill</option>
                {getAvailableSkills(index).map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ideal answer (minimum):
              </label>
              <input
                type="number"
                name='noy'
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="0"
                value={item?.number || ''}
                onChange={(e) => handleNumberChange(e, index)}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name='must'
                className="mr-2"
                checked={item?.mustHave || false}
                onChange={(e) => handleCheckboxChange(e, index)}
              />
              <label className="text-sm text-gray-700">
                Must-have qualification
              </label>
            </div>
          </div>
        </div>
      ))}
      {selected.length < 4 &&
      <div>Do you wan to add any questions <Plus onClick={addQuestions}/> </div>
      }
    </div>
  );
}

export default ExperienceForm;
