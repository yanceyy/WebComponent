import {pubSub} from '../PubSub'
export default class LearningList extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        this.itemsContent = []
        this.addLearningItem = this.addLearningItem.bind(this)
        pubSub.subscribe('learning_item_added',this.addLearningItem)
    }

    addLearningItem(content){
        this.itemsContent.push(content)
        this.ul.innerHTML=""
        this.itemsContent.forEach(content=>{
            const item = document.createElement('li')
            item.innerText = content;
            this.ul.appendChild(item);
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
            </style>
        `
        this.ul = this.shadowRoot.querySelector('ul');
    }
}

