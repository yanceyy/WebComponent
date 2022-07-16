import {pubSub} from '../PubSub';
export default class TodoList extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        this.itemsContent = []
        this.addTodoItem = this.addTodoItem.bind(this)
        this.removeTodoItem = this.removeTodoItem.bind(this)
        pubSub.subscribe('todo_item_added',this.addTodoItem)
    }

    removeTodoItem(key){
        this.itemsContent = this.itemsContent.filter((item)=>item.key!==key)
        pubSub.publish('todo_item_removed')
        this.render()
    }

    addTodoItem(item){
        this.itemsContent.push(item)
        this.render()
    }

    render(){
        this.ul.innerHTML=""
        this.itemsContent.forEach(item=>{
            const {content,key} = item
            const newItem = document.createElement('li')
            newItem.addEventListener('dblclick',()=>this.removeTodoItem(key))
            newItem.innerText = content
            this.ul.appendChild(newItem)
        })
    }

    connectedCallback(){
        this.shadowRoot.innerHTML=`
            <h2>Learning list</h2>
            <ul>
            </ul>
            <style>
                :host {
                    display:block;
                    border:var(--border-width) solid DarkSeaGreen;
                    padding: 2rem;
                }
                h2{
                    margin-top:0;
                }
                ul{
                    padding-Left:0;
                    font-size:1.2rem;
                    color: var(--text-primary-color);
                }
                ul li{
                    width:100%;
                    cursor:pointer;
                }
            </style>
        `
        this.ul = this.shadowRoot.querySelector('ul');
    }
}

