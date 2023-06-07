#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[path = "./utility/math.rs"]
mod math;
#[path = "./ui/code-editor/cursor.rs"]
mod cursor;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            cursor::insert_cursor_symbol,
            cursor::insert_text_at_cursor,
            cursor::adjust_cursor_y,
            cursor::adjust_cursor_x,
            cursor::get_length_of_lines,
            math::clamp
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
