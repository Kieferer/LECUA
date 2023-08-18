use std::process::{Command};

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
#[tauri::command]
pub fn start_persistent_session() -> String {
    let output = Command::new("powershell")
        .args(&["-NoLogo", "-NoProfile", "-NoExit", "-File", "start_session.ps1", "|", "get-location"])
        .output()
        .expect("Failed to start persistent session");

    let stdout = String::from_utf8_lossy(&output.stdout);
    let job_id = stdout.trim().parse::<u32>().unwrap_or(0);
    println!("{}", stdout);

    job_id.to_string()
}
