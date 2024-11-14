import { CustomFramework } from "../../../framework/CustomFramework";

/**
 * Item component represents a single todo item in the list.
 *
 * @param {object} props - Properties including `key` and `children`.
 * @returns {object} - Virtual DOM representation of the todo item.
 */
export function Item({ key = null, children }) {
    const [text, setText] = CustomFramework.useState(children[0].title);
    const [toggleInput, setToggleInput] = CustomFramework.useState(false);
    const [completed, setCompleted] = CustomFramework.useState(children[0].completed);

    return CustomFramework.createElement(
        "li",
        {
            className: completed ? "completed" : "",
            "data-testid": "todo-item",
            key,
        },
        CustomFramework.createElement(
            "div",
            {
                className: "view",
                onDblClick: () => setToggleInput((prev) => !prev),
            },
            toggleInput
                ? CustomFramework.createElement(
                    "div",
                    null,
                    CustomFramework.createElement("input", {
                        className: "new-todo",
                        autofocus: "true",
                        value: text,
                        onInput: (e) => setText(() => e.target.value),
                    })
                )
                : CustomFramework.createElement(
                    "div",
                    { id: "label" },
                    CustomFramework.createElement("input", {
                        className: "toggle",
                        type: "checkbox",
                        checked: completed,
                        onClick: () => setCompleted((prev) => !prev),
                    }),
                    CustomFramework.createElement("label", null, text)
                )
        )
    );
}
