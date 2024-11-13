import { CustomFramework } from "../../../framework/CustomFramework"

export function TextInput(props) {

    const [text, setText] = CustomFramework.useState(props)
    return (
        <div>
            <input
                className="new-todo"
                autofocus="true"
                value={text}
                onInput={(e) => console.log(e.target.value)}
            />
        </div>
    )
}
