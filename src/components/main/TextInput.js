import { CustomFramework } from "../../../framework/CustomFramework";

/**
 * TextInput component renders a text input field.
 *
 * @param {object} props - Properties passed to the component.
 * @returns {object} - Virtual DOM representation of the text input field.
 */
export function TextInput(props) {
    const [text, setText] = CustomFramework.useState(props);

    return CustomFramework.createElement(
        "div",
        null,
        CustomFramework.createElement("input", {
            className: "new-todo",
            autofocus: "true",
            value: text,
            onInput: (e) => console.log(e.target.value),
        })
    );
}
