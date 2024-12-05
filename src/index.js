import { Windmill } from '@windmill/react-ui'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './assets/css/main.css'
import './assets/css/planning.css'
import './assets/css/tailwind.output.css'
import { SidebarProvider } from './context/SidebarContext'
import store from './store'; // Importation du store Redux
import Loading from './utils/Loading'


// if (process.env.NODE_ENV !== 'production') {
//   const axe = require('react-axe')
//   axe(React, ReactDOM, 1000)
// }

ReactDOM.render(
  <Provider store={store}>
    <SidebarProvider>
      <Suspense fallback={<Loading />}>
        <Windmill>
          <App />
        </Windmill>
      </Suspense>
    </SidebarProvider>
  </Provider>,
  document.getElementById('root')
)