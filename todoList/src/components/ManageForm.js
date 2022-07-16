export default class ManageForm extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode:'open'})
    }

    connectedCallback(){
        this.shadowRoot.innerHTML=`
            <div>
                <input type="text" name="learning" placeholder="Please add a learning item">
                <button class="learning">Add</button>
            </div>
            <div>
                <input type="text" name="todo" placeholder="Please add a todo item">
                <button class="todo">Add</button>
            </div>
            <style>
                :host {
                    display:flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    gap: 1rem;
                }

                div {
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

                div + div button {
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
    }
}

