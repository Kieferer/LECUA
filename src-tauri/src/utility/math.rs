#[tauri::command]
pub fn clamp(value: i32, min: i32, max: i32) -> i32 {
    value.min(max).max(min)
}