import {pubSub} from '../PubSub'
import { v4 as uuidv4 } from 'uuid';

export default class ManageForm extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        this.addLearningItems = this.addLearningItems.bind(this)
        this.addTodoItems = this.addTodoItems.bind(this)
    }

    createItem(content){
        return {key:uuidv4(),content}
    }

    addLearningItems(e){
        const inputValue = this.addLearningInput.value
        const inputForm = e.target.closest('form')
        const chk_status = inputForm.checkValidity();
        if(chk_status){
            this.addLearningInput.value=""
            e.preventDefault() // prevent the pop up blank notification after add element
            pubSub.publish('learning_item_added',this.createItem(inputValue))
        }
    }

    addTodoItems(e){
        const inputValue = this.toDoInput.value
        const inputForm = e.target.closest('form')
        const chk_status = inputForm.checkValidity();
        if(chk_status){
            this.toDoInput.value=""
            e.preventDefault() // prevent the pop up blank notification after add element
            pubSub.publish('todo_item_added',this.createItem(inputValue))
        }
    }

    connectedCallback(){
        this.shadowRoot.innerHTML=`
            <form className='learning-form'>
                <input required type='text' class="learning-input" type="text" name="learning" placeholder="Please add a learning item">
                <button class="learning">Add</button>
            </form>
            <form className='todo-form'>
                <input required type='text' class="todo-input"  type="text" name="todo" placeholder="Please add a todo item">
                <button class="todo">Add</button>
            </form>
            <style>
                :host {
                    display:flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    gap: 1rem;
                }

                form {
                    width:100%;
                    display:grid;
                    grid-template-columns: 3fr 1.5fr;
                    gap: .5rem;
                }

                button{
                    background:LightSeaGreen;
                    color:white;
                    border-radius: .5rem;
                    padding: .5rem 2rem;
                    font-size: 1.2rem;
                }
                button:hover{
                    cursor:pointer;
                }

                form + form button {
                    background: DarkSeaGreen;
                }

                input{
                    border-radius:10px;
                    padding:.5rem;
                    border: 2px solid var(--text-primary-color,#555);
                    font-size:0.9rem;
                }
            </style>
        `

        this.addLearningButton = this.shadowRoot.querySelector('.learning')
        this.addTodoButton = this.shadowRoot.querySelector('.todo')
        this.addLearningButton.addEventListener('click', this.addLearningItems)
        this.addTodoButton.addEventListener('click', this.addTodoItems)
        this.addLearningInput = this.shadowRoot.querySelector('.learning-input')
        this.toDoInput = this.shadowRoot.querySelector('.todo-input')
    }
}

