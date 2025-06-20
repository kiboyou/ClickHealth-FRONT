import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './assets/css/tailwind.output.css'
import './assets/css/main.css'
import './assets/css/planning.css'
import App from './App'
import { SidebarProvider } from './context/SidebarContext'
import { Windmill } from '@windmill/react-ui'
import store from './store'; // Importation du store Redux
import { Provider } from 'react-redux'
import Loading from './utils/Loading'


// if (process.env.NODE_ENV !== 'production') {
//   const axe = require('react-axe')
//   axe(React, ReactDOM, 1000)
// }

ReactDOM.render(
  <Provider store={store}>
    <SidebarProvider>
      <Suspense fallback={<Loading />}>
        <Windmill dark>
          <App />
        </Windmill>
      </Suspense>
    </SidebarProvider>
  </Provider>,
  document.getElementById('root')
)