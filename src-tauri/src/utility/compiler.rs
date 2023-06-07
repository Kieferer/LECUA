use std::io::Write;
use tempfile::NamedTempFile;
use std::process::{Command, Stdio};


#[tauri::command]
pub fn compile(code: String) {
    let mut file = tempfile::NamedTempFile::new().expect("Failed to create temporary file");

    file.write_all(code.as_bytes())
        .expect("Failed to write to file");

    let file_path = file.path().to_str().expect("Invalid file path");

    let output = Command::new("rustc")
        .arg("--crate-name")
        .arg("compile_crate")
        .arg(file_path)
        .output()
        .expect("Failed to execute command");
}