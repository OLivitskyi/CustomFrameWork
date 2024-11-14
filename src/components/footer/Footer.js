import { CustomFramework } from "../../../framework/CustomFramework";
import { filter } from "./Filter";

/**
 * Footer component that displays the count of remaining items,
 * navigation filters, and a button to clear completed tasks.
 *
 * @param {Array} items - List of todo items.
 * @param {Function} setItems - Function to update the list of items.
 * @returns {object} - Virtual DOM representation of the footer.
 */
export function Footer({ items, setItems }) {
    return CustomFramework.createElement(
        "footer",
        { className: "footer", "data-testid": "footer" },
        CustomFramework.createElement(
            "span",
            { className: "todo-count" },
            `${filter(items).length} item left!`
        ),
        CustomFramework.createElement(
            "ul",
            { className: "filters", "data-testid": "footer-navigation" },
            CustomFramework.createElement(
                "li",
                null,
                CustomFramework.createElement(
                    "a",
                    { className: "selected", href: "#/" },
                    "All"
                )
            ),
            CustomFramework.createElement(
                "li",
                null,
                CustomFramework.createElement(
                    "a",
                    { className: "", href: "#/active" },
                    "Active"
                )
            ),
            CustomFramework.createElement(
                "li",
                null,
                CustomFramework.createElement(
                    "a",
                    { className: "", href: "#/completed" },
                    "Completed"
                )
            )
        ),
        CustomFramework.createElement(
            "button",
            {
                className: "clear-completed",
                disabled: "",
                onClick: () =>
                    setItems((items) => items.filter((item) => !item.completed)),
            },
            "Clear completed"
        )
    );
}
