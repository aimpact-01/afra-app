
import { Route, Routes as Switch } from 'react-router-dom'
import MainPage from '../../MainPage'


const Routes =() =>(
    <div>
    <Switch>
    <Route path='/mainpage' element={<MainPage/>} />
</Switch>
</div>


)

export default Routes