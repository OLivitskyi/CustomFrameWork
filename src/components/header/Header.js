import { CustomFramework } from "../../../framework/CustomFramework";
import { HeaderInput } from "./HeaderInput";

/**
 * Header component displaying the title and input for adding tasks.
 *
 * @param {Function} setItems - Function to update the list of items.
 * @returns {object} - Virtual DOM representation of the header.
 */
export function Header({ setItems }) {
    return CustomFramework.createElement(
        "header",
        { className: "header" },
        CustomFramework.createElement("h1", null, "TODO"),
        CustomFramework.createElement(HeaderInput, { setItems })
    );
}
