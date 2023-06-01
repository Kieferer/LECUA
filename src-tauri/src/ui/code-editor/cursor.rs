use std::cmp;

#[tauri::command]
pub fn insert_cursor_symbol(mut text: String, pos: usize,) -> String {
    text.insert(cmp::min(text.len(), pos), '┃');
    text
}

#[tauri::command]
pub fn insert_text_at_cursor(mut text: String, inserted_text: String, x: usize, y: usize) -> String {
    text = (x + y).to_string();
    text
}

#[tauri::command]
pub fn get_length_of_lines(text: String, y: usize) -> usize{
    let rows_till_y: Vec<&str> = text.lines().take(y).collect();
    let y_length = rows_till_y.join("").len();

    y_length
}