import { CustomFramework } from "../../../framework/CustomFramework";
import { Item } from "./Item";

/**
 * Main component renders the list of todo items.
 *
 * @param {object} props - Contains `items` (list of tasks) and `setItems` (function to update tasks).
 * @returns {object} - Virtual DOM representation of the main section.
 */
export function Main({ items, setItems }) {
    return CustomFramework.createElement(
        "main",
        { className: "main", "data-testid": "main" },
        CustomFramework.createElement(
            "ul",
            { className: "todo-list", "data-testid": "todo-list" },
            ...items.map((item, index) =>
                CustomFramework.createElement(Item, { key: index }, item)
            )
        ),
        CustomFramework.createElement("p", {
            onClick: () => setItems((current) => current), // Placeholder functionality
        })
    );
}
