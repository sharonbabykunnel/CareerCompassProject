import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import appStore, { persistor } from '../utils/appStore.js'
import router from './route.jsx'
import {SocketContext} from './context/socketContext.jsx'
import { VideoCallProvider } from './context/videoCallContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <PersistGate persistor={persistor}>
    <VideoCallProvider> 
      <SocketContext>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router}/>
        </Suspense>
      </SocketContext>
      </VideoCallProvider>
    </PersistGate>
  </Provider>,
)
