/**
 * Function to create a virtual DOM node.
 *
 * @param {string} type - Type of the element (e.g., 'div', 'span').
 * @param {object} props - Properties of the element (e.g., className, id).
 * @param {...any} children - Children of the element, either objects (nodes) or strings (text nodes).
 * @returns {object} - Virtual DOM node.
 */
function createNode(type, props, ...children) {
  const flatten = (arr) =>
      arr.reduce((acc, child) =>
          Array.isArray(child) ? acc.concat(flatten(child)) : acc.concat(child), []);

  const flattenedChildren = flatten(children);

  return {
    type,
    props: {
      ...props,
      children: flattenedChildren.map((child) =>
          typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

/**
 * Helper function to create a text node in the virtual DOM.
 *
 * @param {string} text - Text content.
 * @returns {object} - Virtual DOM text node.
 */
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

/**
 * Creates a real DOM element based on the provided virtual DOM node (fiber).
 *
 * @param {object} fiber - Virtual DOM node.
 * @returns {Node} - Real DOM element.
 */
function createDom(fiber) {
  const dom = fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);
  return dom;
}

const isEvent = (key) => key.startsWith("on");
const isProperty = (key) => key !== "children" && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);

/**
 * Updates DOM properties and event listeners.
 *
 * @param {Node} dom - DOM element to update.
 * @param {object} prevProps - Previous properties of the element.
 * @param {object} nextProps - New properties of the element.
 */
function updateDom(dom, prevProps, nextProps) {
  Object.keys(prevProps)
      .filter(isEvent)
      .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
      .forEach((name) => {
        const eventType = name.toLowerCase().substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
      });

  Object.keys(prevProps)
      .filter(isProperty)
      .filter(isGone(prevProps, nextProps))
      .forEach((name) => {
        dom[name] = "";
      });

  Object.keys(nextProps)
      .filter(isProperty)
      .filter(isNew(prevProps, nextProps))
      .forEach((name) => {
        dom[name] = nextProps[name];
      });

  Object.keys(nextProps)
      .filter(isEvent)
      .filter(isNew(prevProps, nextProps))
      .forEach((name) => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, nextProps[name]);
      });
}

/**
 * Completes the rendering process and applies changes to the real DOM.
 */
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

/**
 * Applies changes of a virtual DOM node to the real DOM.
 *
 * @param {object} fiber - Virtual DOM node.
 */
function commitWork(fiber) {
  if (!fiber) return;

  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;

  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    commitDeletion(fiber, domParent);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

/**
 * Deletes a node from the real DOM.
 *
 * @param {object} fiber - Virtual DOM node to delete.
 * @param {Node} domParent - Parent DOM node.
 */
function commitDeletion(fiber, domParent) {
  if (fiber && fiber.dom && domParent.contains(fiber.dom)) {
    domParent.removeChild(fiber.dom);
  } else if (fiber) {
    commitDeletion(fiber.child, domParent);
  }
}

/**
 * Begins rendering a virtual DOM node into a specified container.
 *
 * @param {object} element - Virtual DOM element.
 * @param {Node} container - Container DOM node.
 */
function mount(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  };

  deletions = [];
  nextUnitOfWork = wipRoot;
}

let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null;
let deletions = null;

/**
 * The rendering work loop that processes tasks and commits changes to the DOM.
 *
 * @param {object} deadline - Browser's idle time information.
 */
function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

/**
 * Processes a specific virtual DOM node during the work loop.
 *
 * @param {object} fiber - Virtual DOM node to process.
 * @returns {object} - The next virtual DOM node to process.
 */
function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;

  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

let wipFiber = null;
let hookIndex = null;

/**
 * Updates the state of a functional component in the virtual DOM.
 *
 * @param {object} fiber - Virtual DOM node representing the functional component.
 */
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];

  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

/**
 * Provides state management for functional components.
 *
 * @param {*} initial - Initial state value.
 * @returns {Array} - Current state and state updater function.
 */
function useReactiveState(initial) {
  const oldHook =
      wipFiber.alternate &&
      wipFiber.alternate.hooks &&
      wipFiber.alternate.hooks[hookIndex];

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });

  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

/**
 * Updates a host component in the virtual DOM.
 *
 * @param {object} fiber - Virtual DOM node representing the host component.
 */
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  reconcileChildren(fiber, fiber.props.children);
}

/**
 * Reconciles children for a given virtual DOM node.
 *
 * @param {object} wipFiber - Current work-in-progress fiber node.
 * @param {Array} elements - Array of virtual DOM child elements.
 */
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type === oldFiber.type;

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }

    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

/**
 * Component for managing routes.
 *
 * @param {object} props - Component properties.
 * @returns {object} - Rendered component for the current route.
 */
function NavigationManager({ routes }) {
  const [currentPath, setCurrentPath] = useReactiveState(window.location.pathname);

  const handleNavigation = () => {
    setCurrentPath(window.location.pathname);
  };

  window.addEventListener("popstate", handleNavigation);

  const CurrentComponent = routes[currentPath] || routes["/404"];
  return CurrentComponent
      ? createNode(CurrentComponent, {})
      : null;
}

/**
 * Link component for navigation.
 *
 * @param {object} props - Component properties.
 * @returns {object} - Rendered link element.
 */
function Link({ to, children, onClick }) {
  const handleClick = (event) => {
    event.preventDefault();
    window.history.pushState(null, "", to);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);

    if (typeof onClick === "function") {
      onClick();
    }
  };

  return createNode("a", { href: to, onClick: handleClick }, children);
}

/**
 * The CustomFramework object providing utilities for managing the virtual DOM.
 */
export const CustomFramework = {
  createElement: createNode,
  render: mount,
  useState: useReactiveState,
  Router: NavigationManager,
  Link,
};
