import { CustomFramework } from "../../../framework/CustomFramework"

export function Input({setItems}) {
    const [text, setText] = CustomFramework.useState("")
    return (
        <div>
            <input
                className="new-todo"
                placeholder="Your goal"
                autofocus="true"
                value={text}
                onInput={(e) => setText((t) => (t = e.target.value))}

                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault()
                        setItems((items) => [
                            ...items,
                            {
                                title: text,
                                completed: false,
                                id: Math.floor(Math.random() * 10000).toString(),
                                editable: false,
                            },
                        ])
                        setText(prev=> prev ='')
                    }
                }}
            />
        </div>
    )
}
