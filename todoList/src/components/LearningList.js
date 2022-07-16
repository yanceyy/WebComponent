export default class LearningList extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        this.item = []
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
    }
}

