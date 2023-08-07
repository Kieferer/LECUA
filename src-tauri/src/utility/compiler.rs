use std::io::Write;
use std::process::Command;
use tempfile::NamedTempFile;

#[tauri::command]
pub fn compile(code: String) -> String {
    let mut file = NamedTempFile::new().expect("Failed to create temporary file");
    let mut output_log: String = String::new();

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
        output_log = "Compile error:".to_string() + &error_string.to_string();
    } else {
        let run_output = Command::new(directory_path + "/filename.exe")
            .output();

        match run_output {
            Ok(output) => {
                if !output.status.success() {
                    let error_string = std::str::from_utf8(&output.stderr).expect("Failed to convert error output to string");
                    output_log = "Run error: ".to_string() + &error_string.to_string();
                } else {
                    let output_string = std::str::from_utf8(&output.stdout).expect("Failed to convert output to string");
                    output_log = output_string.to_string();
                }
            }
            Err(err) => {
                output_log = err.to_string();
            }
        }
    }

    output_log += &*output.status.to_string();
    output_log
}
