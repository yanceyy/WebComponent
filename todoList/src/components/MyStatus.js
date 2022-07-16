import {pubSub} from '../PubSub';

export default class MyStatus extends HTMLElement {

    constructor(){
        super()
        this.attachShadow({mode:'open'})
        this.todoItemsCountNumber = 0;
        this.LearningItemsCountNumber = 0;
        pubSub.subscribe('todo_item_added',()=>{
            this.todoItemsCountNumber++
            this.render()
        })
        pubSub.subscribe('todo_item_removed',()=>{
            this.todoItemsCountNumber--
            this.render()
        })
        pubSub.subscribe('learning_item_added',()=>{
            this.LearningItemsCountNumber++
            this.render()
        })
        pubSub.subscribe('learning_item_removed',()=>{
            this.LearningItemsCountNumber--
            this.render()
        })
    }

    render(){
        this.learningItemsCount.textContent=this.LearningItemsCountNumber
        this.todoItemsCount.textContent=this.todoItemsCountNumber
    }

    connectedCallback(){
        this.shadowRoot.innerHTML=`
            <div>Learning list:
            <span class="learning-items-count"> 0 </span>
            </span>
            </div>
            <div>Todo list:
            <span class="todo-items-count"> 0 </span>
            </span>
            </div>
            <style>
                :host {
                    display:block;
                    border:var(--border-width) solid var(--text-primary-color);
                    border-radius:var(--border-radius);
                    padding: 2rem;
                }
                div{
                    font-size: 1.4rem;
                }
            </style>
        `
        this.learningItemsCount = this.shadowRoot.querySelector('.learning-items-count')
        this.todoItemsCount = this.shadowRoot.querySelector('.todo-items-count')
    }
    
}

