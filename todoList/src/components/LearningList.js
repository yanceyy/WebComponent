import {pubSub} from '../PubSub'
export default class LearningList extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        this.itemsContent = []
        this.addLearningItem = this.addLearningItem.bind(this)
        this.removeLearningItem = this.removeLearningItem.bind(this)
        pubSub.subscribe('learning_item_added',this.addLearningItem)
    }

    removeLearningItem(key){
        this.itemsContent = this.itemsContent.filter((item)=>item.key!==key)
        pubSub.publish('learning_item_removed')
        this.render()
    }

    addLearningItem(item){
        this.itemsContent.push(item)

        this.render()
    }

    render(){
        this.ul.innerHTML=""
        this.itemsContent.forEach(item=>{
            const {content,key} = item
            const newItem = document.createElement('li')
            newItem.addEventListener('dblclick',()=>this.removeLearningItem(key))
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
                    border:var(--border-width) solid LightSeaGreen;
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

