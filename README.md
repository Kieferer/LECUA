## LECUA
**LECUA is a lightweight code editor suitable for experimenting with single-file applications written in Rust.** It aims to include just enough features to make it possible and slightly ease the development of micro-projects, mainly for testing purposes. Based on its features and functionality, it's a desktop native app giving a similar experience or even an alternative to online code compilers.

![LECUA](https://i.imgur.com/P7hze84.png)

## Used technologies
### Backend
* Rust
* Tauri
### Frontend
* Javascript
* Vite
* React

## Features
* **Code Editor:** The tool which makes it possible to modify code with syntax highlighting for better code readability. Handles shortcuts and manages the insertion of code snippets.

* **Hierarchy:** A project explorer which visualizes the hierarchy between folders and files in the given workspace. Files can be opened to edit by selecting a file from the tree view. Folders can collapse and reopen by the user to hide and show the contents of them.

* **Terminal:** It's more like a debug console that displays compile and run-time errors and output of the running code without the ability to handle user input and start its own processes.
## Usage
The application currently runs stable on the Windows platform.
The project can be started with the ```npm run tauri dev``` command and built with the ```npm run tauri build``` which is not recommended yet due to the Terminal.
| Shortcut | Action |
| ------------- |:-------------:|
| Alt+T | Run code |
| Ctrl+S | Save file |
| F5 | Reload frontend |
## Plans
You can find the tickets since August on [Trello](https://trello.com/invite/b/Ldn05Yre/ATTIaf22268a7218b7ad2540dc975b7b4ff57AA8EECB/lecua).
* **Graphical Interface Menu Buttons:** Implement functionality of File, Edit, and View buttons to streamline common actions.
* **Customizable Shortcut System:** Create a shortcut system that allows to change key combinations by the user for common actions.
* **Java Code Compilation:** Extend support for compiling and running Java code. The code editor would detect in which language the code is written and run it in the appropriate environment.
* **Enhanced Terminal:**
  * ~~Extend the capabilities of the Terminal tool by making it able to handle user input which makes it possible to work with larger projects which are using package managers or doing versioning inside the editor and launch its own processes.~~
  * Create a persistent session-like environment where users can input commands that run in the same context, allowing the effects of previous commands to impact following ones similar to the traditional terminal's behavior.
* **Custom Code Snippets:** Create a library full of language-specific snippets which can be extended with custom ones.
* **Resizable Tools:** Fix the now deleted code which made allowed the user to resize the windows of tools relative to others.
* **Testing and GitHub Actions:** Life quality improvements with code-coverage and CI/CD pipelines
