import './style.css'
import ManageForm from './components/ManageForm.js'
import LearningList from './components/LearningList.js'
import TodoList from './components/TodoList.js'
import MyStatus from './components/MyStatus.js'
import {PubSub} from './PubSub.js'


customElements.define('manage-form',ManageForm)
customElements.define('learning-list',LearningList)
customElements.define('todo-list',TodoList)
customElements.define('my-status',MyStatus)

const pubSub = PubSub.createInstance();
pubSub.subscribe('learning_item_added',()=>{})