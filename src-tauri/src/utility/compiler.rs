use std::env::temp_dir;
use std::io::Write;
use tempfile::NamedTempFile;
use std::process::{Command, Stdio};


#[tauri::command]
pub fn compile(code: String) {
    let mut file = tempfile::NamedTempFile::new().expect("Failed to create temporary file");

    file.write_all(code.as_bytes())
        .expect("Failed to write to file");

    let file_path = file.path().to_str().expect("Invalid file path");
    let directory_path = file.path().parent().unwrap().to_str().unwrap().to_owned();
    println!("ez: {:?}", directory_path);


    let output = Command::new("rustc")
        .arg("--crate-name")
        .arg("filename")
        .arg(file_path)
        .arg("--out-dir " + &directory_path)
        .output()
        .expect("Failed to execute command");


    if !output.stdout.is_empty() {
        let out_string = std::str::from_utf8(&output.stdout).expect("Failed to convert output to string");
        println!("Output: {}", out_string);
    }

    if !output.stderr.is_empty() {
        let error_string = std::str::from_utf8(&output.stderr).expect("Failed to convert error output to string");
        println!("Error: {}", error_string);
    } else {
        let run_output = Command::new(&directory_path + "/filename.exe")
            .output();
        println!("Run: {:?}", run_output);

    }
    println!("status: {}", output.status);
}