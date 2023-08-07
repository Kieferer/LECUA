use std::process::Command;
use tauri::Result;

#[tauri::command]
pub fn send_command_to_terminal(command: String) -> String {
    let output = Command::new("powershell")
        .args(&["-NoLogo", "-NoExit", "-Command", &command])
        .output().unwrap();

    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);

    let mut result = stdout.to_string();
    if !stderr.is_empty() {
        result += "\nError Output:\n";
        result += &stderr;
    }

    result
}
