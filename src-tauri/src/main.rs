#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[path = "./utility/math.rs"]
mod math;
#[path = "./utility/compiler.rs"]
mod compiler;
#[path = "./ui/code-editor/cursor.rs"]
mod cursor;
#[path = "./utility/file.rs"]
mod file;
#[path = "./utility/terminal.rs"]
mod terminal;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            cursor::insert_cursor_symbol,
            cursor::insert_text_at_cursor,
            cursor::adjust_cursor_y,
            cursor::adjust_cursor_x,
            cursor::get_length_of_lines,
            compiler::compile,
            math::clamp,
            file::get_file_system_representation,
            file::load_file,
            terminal::send_command_to_terminal
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
