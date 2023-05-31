#[tauri::command]
pub fn insert_cursor_symbol(mut text: String, x: usize, y: usize) -> String {
    text.insert(x, '┃');
    text
}

#[tauri::command]
pub fn insert_text_at_cursor(text: String, inserted_text: String, x: usize, y: usize) -> String {
    let a = (x + y).to_string();
    a
}