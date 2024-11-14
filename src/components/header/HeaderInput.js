import { CustomFramework } from "../../../framework/CustomFramework";

/**
 * HeaderInput component for adding new tasks.
 *
 * @param {Function} setItems - Function to update the list of tasks.
 * @returns {object} - Virtual DOM representation of the input field.
 */
export function HeaderInput({ setItems }) {
    const [text, setText] = CustomFramework.useState("");

    return CustomFramework.createElement(
        "div",
        null,
        CustomFramework.createElement("input", {
            className: "new-todo",
            placeholder: "Your goal",
            autofocus: "true",
            value: text,
            onInput: (e) => setText(() => e.target.value),
            onKeyDown: (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    setItems((items) => [
                        ...items,
                        {
                            title: text,
                            completed: false,
                            id: Math.floor(Math.random() * 10000).toString(),
                            editable: false,
                        },
                    ]);
                    setText(() => "");
                }
            },
        })
    );
}
