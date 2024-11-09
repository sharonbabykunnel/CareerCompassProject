import React from 'react';
import List from '../helpers/List';
import lists from './../../../const/profileList.js';

const EditOptions = () => {
  return (
    <div className='rounded-xl bg-white m-10  overflow-hidden h-74 flex flex-col '>
      {lists.map(list =><List key={list.path} list={list}/>)}
    </div>
  );
}

export default EditOptions;
