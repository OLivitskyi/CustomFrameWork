import { CustomFramework } from "../../../framework/CustomFramework"

import { TextInput } from "./TextInput"

export function Item({ key = null, children }) {
    const [text, setText] = CustomFramework.useState(children[0].title)
    const [toggleInput, setToggleInput] = CustomFramework.useState(false)
    const [completed, setCompleted] = CustomFramework.useState(children[0].completed)


    return (
        <li
            className={completed ? "completed" : ""}
            data-testid="todo-item"
            key={key}
        >
            <div className="view" onDblClick={() => setToggleInput((p) => (p = !p))}>
                {toggleInput ? (
                    <div>
                        <input
                            className="new-todo"
                            autofocus="true"
                            value={children[0].title}
                            onInput={(e) => setText((p) => (p = e.target.value))}
                        />
                    </div>
                ) : (
                    <div id="label">
                        <input
                            className="toggle"
                            type="checkbox"
                            checked={completed}
                            onClick={() => setCompleted((p) => (p = !p))}
                        />
                        <label>{children[0].title}</label>
                    </div>
                )}
            </div>
        </li>
    )
}
