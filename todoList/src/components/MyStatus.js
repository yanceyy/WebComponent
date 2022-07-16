export default class MyStatus extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode:'open'})
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
    }
}

