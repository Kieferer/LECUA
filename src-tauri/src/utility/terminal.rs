use std::process::Command;

#[tauri::command]
pub fn send_command_to_terminal(command: String) -> String {
    let output = Command::new("powershell")
        .args(&["-NoLogo", "-NoExit", "-Command", &command])
        .output().unwrap();

    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);

    let mut result = String::new();
    if !stderr.is_empty() {
        result = "\nError Output:\n".parse().unwrap();
        result += &stderr;
    }
    result += &*stdout.to_string();

    result
}
