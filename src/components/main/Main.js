import { CustomFramework } from "../../../framework/CustomFramework"

import { Item } from "./Item"

export function Main({items,setItems}) {
    return (
        <main className="main" data-testid="main">
            <ul className="todo-list" data-testid="todo-list">
                {items.map((item, index) => {
                    return <Item key={index} >{item}</Item>
                })}
            </ul>
            <p onClick={()=>setItems(cn => cn =x)}></p>
        </main>
    )
}
