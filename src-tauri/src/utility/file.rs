use std::fs;
use std::path::{Path, PathBuf};
use serde::{Serialize};
use serde_json;

#[derive(Serialize)]
struct FileSystemNode {
    name: String,
    path: String,
    children: Option<Vec<FileSystemNode>>,
}

#[tauri::command]
pub fn load_file(path: String) -> String {
    let file_data = fs::read_to_string(path);
    file_data.unwrap()
}

#[tauri::command]
pub fn get_file_system_representation(origin: String) -> String {
    let origin_folder = Path::new(&origin);
    let root_node = build_file_system_tree(origin_folder);
    let json_string = serde_json::to_string(&root_node).expect("Failed to serialize");
    json_string
}

fn build_file_system_tree(folder_path: &Path) -> FileSystemNode {
    let folder_name = folder_path.file_name().unwrap().to_string_lossy().to_string();
    let mut children = vec![];

    if let Ok(entries) = fs::read_dir(folder_path) {
        for entry in entries {
            if let Ok(entry) = entry {
                let file_type = entry.file_type().expect("Failed to get file type");
                if file_type.is_dir() {
                    let child_folder = entry.path();
                    let child_node = build_file_system_tree(&child_folder);
                    children.push(child_node);
                } else if file_type.is_file() {
                    let file_name = entry.file_name().to_string_lossy().to_string();
                    let child_node = FileSystemNode {
                        name: file_name,
                        path: entry.path().to_string_lossy().to_string(),
                        children: None,
                    };
                    children.push(child_node);
                }
            }
        }
    }

    FileSystemNode {
        name: folder_name,
        path: folder_path.to_string_lossy().to_string(),
        children: Some(children),
    }
}