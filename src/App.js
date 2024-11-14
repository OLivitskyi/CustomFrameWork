import { CustomFramework } from "../framework/CustomFramework";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { filter } from "./components/footer/Filter";

/**
 * Main application component.
 *
 * @returns {object} - Virtual DOM representation of the app.
 */
export function App() {
    const [items, setItems] = CustomFramework.useState([
        { title: "npm run build", completed: true, id: "1", editable: false },
        { title: "npm run start", completed: true, id: "2", editable: false },
        { title: "Check for working", completed: false, id: "3", editable: false },
    ]);

    return CustomFramework.createElement(
        "div",
        null,
        CustomFramework.createElement(
            "section",
            { className: "todoapp", id: "root" },
            CustomFramework.createElement(Header, { setItems }),
            CustomFramework.createElement(
                "main",
                { className: "main", "data-testid": "main" },
                CustomFramework.createElement(
                    "ul",
                    { className: "todo-list", "data-testid": "todo-list" },
                    ...filter(items).map((item) =>
                        CustomFramework.createElement(
                            "li",
                            {
                                className: item.completed ? "completed" : "",
                                "data-testid": "todo-item",
                                key: item.id,
                            },
                            CustomFramework.createElement(
                                "div",
                                { className: "view" },
                                item.editable
                                    ? CustomFramework.createElement(
                                        "div",
                                        null,
                                        CustomFramework.createElement("input", {
                                            className: "new-todo",
                                            autofocus: "true",
                                            value: item.title,
                                            onInput: (event) => {
                                                const newValue = event.target.value;
                                                setItems((items) =>
                                                    items.map((el) =>
                                                        el.id === item.id ? { ...el, title: newValue } : el
                                                    )
                                                );
                                            },
                                            onKeyDown: (event) => {
                                                if (event.key === "Enter") {
                                                    setItems((items) =>
                                                        items.map((el) =>
                                                            el.id === item.id
                                                                ? { ...el, editable: !el.editable }
                                                                : el
                                                        )
                                                    );
                                                }
                                            },
                                            onMouseOut: () => {
                                                setItems((items) =>
                                                    items.map((el) =>
                                                        el.id === item.id
                                                            ? { ...el, editable: !el.editable }
                                                            : el
                                                    )
                                                );
                                            },
                                        })
                                    )
                                    : CustomFramework.createElement(
                                        "div",
                                        {
                                            id: "label",
                                            style:
                                                "display: flex; align-items: center; width: 100%;",
                                        },
                                        CustomFramework.createElement("input", {
                                            className: "toggle",
                                            type: "checkbox",
                                            checked: item.completed,
                                            onClick: () => {
                                                setItems((items) =>
                                                    items.map((el) =>
                                                        el.id === item.id
                                                            ? { ...el, completed: !item.completed }
                                                            : el
                                                    )
                                                );
                                            },
                                        }),
                                        CustomFramework.createElement(
                                            "label",
                                            {
                                                style: "width:100%;",
                                                onDblClick: () => {
                                                    setItems((items) =>
                                                        items.map((el) =>
                                                            el.id === item.id
                                                                ? { ...el, editable: !el.editable }
                                                                : el
                                                        )
                                                    );
                                                },
                                            },
                                            item.title
                                        ),
                                        CustomFramework.createElement("img", {
                                            src: "https://www.svgrepo.com/show/80301/cross.svg",
                                            width: "16",
                                            style:
                                                "justify-content: end; padding: 20px; cursor: pointer; opacity: 70%;",
                                            onClick: () => {
                                                setItems((items) =>
                                                    items.filter((el) => el.id !== item.id)
                                                );
                                            },
                                        })
                                    )
                            )
                        )
                    )
                )
            ),
            CustomFramework.createElement(Footer, { items, setItems })
        ),
        CustomFramework.createElement(
            "footer",
            { className: "info" },
            CustomFramework.createElement("p", null, "Double-click to edit a todo")
        )
    );
}
