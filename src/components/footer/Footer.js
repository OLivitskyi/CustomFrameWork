
import { CustomFramework } from '../../../framework/CustomFramework';

import { filter } from './Filter';

export function Footer({items,setItems}){

    return (
        <footer className="footer" data-testid="footer">
            <span className="todo-count">{filter(items).length} item left!</span>
            <ul className="filters" data-testid="footer-navigation">
                <li>
                    <a className="selected" href="#/">
                        All
                    </a>
                </li>
                <li>
                    <a className="" href="#/active">
                        Active
                    </a>
                </li>
                <li>
                    <a className="" href="#/completed">
                        Completed
                    </a>
                </li>
            </ul>
            <button
                className="clear-completed"
                disabled=""
                onClick={() =>
                    setItems((items) =>
                        items.filter((item) => item.completed === false)
                    )
                }
            >
                Clear completed
            </button>
        </footer>
    )
}