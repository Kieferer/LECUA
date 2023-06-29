use std::any::Any;
use std::env::temp_dir;
use std::io::Write;
use tempfile::NamedTempFile;
use std::process::{Command, ExitStatus, Stdio};

#[tauri::command]
pub fn compile(code: String) {
    let mut file = tempfile::NamedTempFile::new().expect("Failed to create temporary file");

    file.write_all(code.as_bytes())
        .expect("Failed to write to file");

    let file_path = file.path().to_str().expect("Invalid file path");
    let directory_path = file.path().parent().unwrap().to_str().unwrap().to_owned();

    let output = Command::new("rustc")
        .arg("--crate-name")
        .arg("filename")
        .arg(file_path)
        .arg("--out-dir")
        .arg(directory_path.clone())
        .output()
        .expect("Failed to execute command");

    if !output.status.success() {
        let error_string = std::str::from_utf8(&output.stderr).expect("Failed to convert error output to string");
        println!("Compile error: {}", error_string);
    } else {
        let run_output = Command::new(directory_path + "/filename.exe")
            .output();

        match run_output {
            Ok(output) => {
                if !output.status.success() {
                    let error_string = std::str::from_utf8(&output.stderr).expect("Failed to convert error output to string");
                    println!("Run error: {}", error_string);
                } else {
                    let output_string = std::str::from_utf8(&output.stdout).expect("Failed to convert output to string");
                    println!("{}", output_string);
                }
            }
            Err(err) => {
                println!("Failed to execute run command: {}", err);
            }
        }
    }

    println!("status: {}", output.status);
}
