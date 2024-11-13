import { CustomFramework } from "../framework/CustomFramework"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"

import { filter } from "./helper/filter"

export function App() {
  const [items, setItems] = CustomFramework.useState([
    { title: "npm run build", completed: true, id: "1", editable: false },
    { title: "npm run start", completed: true, id: "2", editable: false },
    { title: "Check for working", completed: false, id: "3", editable: false },
  ])

  return (
      <div>
        <section className="todoapp" id="root">
          <Header setItems={setItems} />
          <main className="main" data-testid="main">
            <ul className="todo-list" data-testid="todo-list">
              {filter(items).map((item) => {
                return (
                    <li
                        className={item.completed ? "completed" : ""}
                        data-testid="todo-item"
                        key={item.id}
                    >
                      <div className="view">
                        {item.editable ? (
                            <div>
                              <input
                                  className="new-todo"
                                  autofocus="true"
                                  value={item.title}
                                  onInput={(event) => {
                                    if (event.key === "Enter") {
                                      console.log("ENTER")
                                      event.preventDefault()
                                      setItems((items) =>
                                          items.map((el) =>
                                              el.id === item.id
                                                  ? { ...el, editable: false }
                                                  : el
                                          )
                                      )
                                    } else {
                                      const newValue = event.target.value
                                      setItems((items) =>
                                          items.map((el) =>
                                              el.id === item.id
                                                  ? { ...el, title: newValue }
                                                  : el
                                          )
                                      )
                                    }
                                  }}
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                      event.preventDefault()
                                      setItems((items) =>
                                          items.map((el) =>
                                              el.id === item.id
                                                  ? { ...el, editable: !el.editable }
                                                  : el
                                          )
                                      )
                                    }
                                  }}
                                  onMouseOut={() => {
                                    setItems((items) =>
                                        items.map((el) =>
                                            el.id === item.id
                                                ? { ...el, editable: !el.editable }
                                                : el
                                        )
                                    )
                                  }}
                              />
                            </div>
                        ) : (
                            <div
                                id="label"
                                style="display: flex; align-items: center; width:100%"
                            >
                              <input
                                  className="toggle"
                                  type="checkbox"
                                  checked={item.completed}
                                  onClick={() => {
                                    setItems((items) =>
                                        items.map((el) =>
                                            el.id === item.id
                                                ? { ...el, completed: !item.completed }
                                                : el
                                        )
                                    )
                                  }}
                              />
                              <label
                                  style="width:100%"
                                  onDblClick={() => {
                                    setItems((items) =>
                                        items.map((el) =>
                                            el.id === item.id
                                                ? { ...el, editable: !item.editable }
                                                : el
                                        )
                                    )
                                  }}
                              >
                                {item.title}
                              </label>

                              <img
                                  src="https://www.svgrepo.com/show/80301/cross.svg"
                                  width="16"
                                  style="justify-content: end; padding: 20px; cursor:pointer; opacity: 70%"
                                  onClick={() => {
                                    setItems((items) =>
                                        items.filter((el) =>
                                            el.id !== item.id
                                        )
                                    )
                                  }}
                              />
                            </div>
                        )}
                      </div>
                    </li>
                )
              })}
            </ul>
          </main>

          <Footer items={items} setItems={setItems} />
        </section>

        <footer className="info">
          <p>Double-click to edit a todo</p>
        </footer>
      </div>
  )
}
