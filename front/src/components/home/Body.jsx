import React from 'react'
import Side from './Side'
import MainBody from './MainBody'
import {QueryClientProvider,QueryClient} from '@tanstack/react-query'

const queryClient = new QueryClient();

const Body = () => {
  return (
    <div  className='bg-lite_user w-full h-[90vh] grid grid-cols-3 gap-3  '>
      
      <Side/>
      <div className='col-span-2 h-full overflow-scroll scrollbar-hide'>
      <QueryClientProvider client={queryClient}>
        <MainBody/>
      </QueryClientProvider>
      </div>
    </div>
  )
}

export default Body
