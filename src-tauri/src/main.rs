#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[path = "./ui/code-editor/cursor.rs"]
mod cursor;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            cursor::insert_cursor_symbol
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
