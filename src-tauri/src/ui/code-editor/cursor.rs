use std::cmp;
use crate::math::clamp;

#[tauri::command]
pub fn insert_cursor_symbol(mut text: String, pos: usize) -> String {
    text.insert(cmp::min(text.len(), pos), '┃');
    text
}

#[tauri::command]
pub fn insert_text_at_cursor(mut text: String, inserted_text: String, x: usize, y: usize) -> String {
    text = (x + y).to_string();
    text
}

/*
    ISSUE: If user reach the end of the line and step to the next one, cursorPosY is not updating cause
    its only change when ArrowUp or ArrowDown is pressed. Which means cursor can be completely out of sync
*/

#[tauri::command]
pub fn get_length_of_lines(text: String, y: usize) -> usize {
    let rows_till_y: Vec<&str> = text.lines().take(y).collect();
    let y_length = rows_till_y.join("").len();

    y_length
}

#[tauri::command]
pub fn adjust_cursor_y(text: String, mut y: usize, direction: i8) -> usize {
    let length_of_rows: usize = text.lines().collect::<Vec<&str>>().len();

    if direction > 0 && (length_of_rows - 1) > y {
        y += 1;
    } else if direction < 0 && (y > 0) {
        y -= 1;
    }

    y
}

#[tauri::command]
pub fn adjust_cursor_x(text: String, mut x: usize, mut y: usize, direction: i8) -> (usize, usize) {
    println!("{}x:{}y", (x), y);
    let current_row: Option<&str> = text.lines().take(y).collect::<Vec<&str>>().get(0).cloned();

    if let Some(row) = current_row {
        println!("lefut");
        if direction > 0 {
            if  current_row.unwrap().len() >= (x + 1) {
                x += 1;
            } else {
                x = 0;
                y += 1;
            }
        } else if direction < 0 {
            x -= 1;
        }
    }

    (x , y)
}