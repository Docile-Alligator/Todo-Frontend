New code matches the style of the existing code base.

Separation of concern and decoupling of components are considered.

Extensive comments of the new code are available to explain the design choices and details of the implementation. Some future improvements are also noted.

New code are written in:
1. https://github.com/Docile-Alligator/Todo-Frontend/blob/master/pages/todos.js
2. https://github.com/Docile-Alligator/Todo-Frontend/blob/master/pages/signin.js
3. https://github.com/Docile-Alligator/Todo-Frontend/blob/master/pages/signup.js
4. https://github.com/Docile-Alligator/Todo-Frontend/blob/master/pages/create.js
5. https://github.com/Docile-Alligator/Todo-Frontend/blob/master/actions/todo.js
6. https://github.com/Docile-Alligator/Todo-Frontend/blob/master/reducers/todo.js
7. https://github.com/Docile-Alligator/Todo-Frontend/blob/master/components/Dialog.js
8. https://github.com/Docile-Alligator/Todo-Frontend/blob/master/components/List.js
9. https://github.com/Docile-Alligator/Todo-Frontend/blob/master/components/TodoListEntry.js
10. https://github.com/Docile-Alligator/Todo-Frontend/blob/master/components/Navbar.js

etc.

All of the requirments are met and here are some extra features.
1. Pagination (the page size is set to 3 to easily see the effect).
2. Update the same todo in both `incomplete` and `all` todo lists when they are being modified.
3. Showing loading info if something happens.
4. Delete todo.
5. Redirect to the previous page after signing in (if available).
6. Sign out.
7. Add buttons to redirect from /todos to /create and vice versa.
8. Handle some exceptions of the Promise in the existing code base.

Some of the old code are optimized. Change `href="/pages/todos"` to `href="/todos"` since the former is a wrong redirect url.
