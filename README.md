# Project To Markdown

A Visual Studio Code extension that exports your project files to a single markdown document, making it easy to share and review your project's codebase.

## Features

- Export multiple project files to a single markdown document
- Simple configuration with comma-separated lists
- Syntax highlighting support
- File metadata inclusion
- Table of contents generation
- Support for various programming languages and text files
- Configurable output directory and file name
- File size limits for better performance
- Progress indication during export

## Installation

1. Open Visual Studio Code
2. Press `Ctrl+P` or `Cmd+P` to open the Quick Open dialog
3. Type `ext install project-to-markdown` and press Enter

Or install through the VS Code Marketplace by searching for "Project To Markdown".

## Usage

1. Open your project in VS Code
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
3. Type "Project To Markdown" and select "Project To Markdown: Export Project Files"
4. The extension will generate a markdown file containing all your project files

## Configuration

You can customize the extension's behavior through VS Code settings:

- `projectToMarkdown.extensions`: Comma-separated list of file extensions to include (without dots)
  - Example: `"md,ts,js,py,html,css"`
  - Default: `"md,ts,js,py,java,cs,html,css"`

- `projectToMarkdown.excludeFolders`: Comma-separated list of folder names to exclude
  - Example: `"node_modules,dist,build,.git"`
  - Default: `"node_modules,dist,build,.git"`

- `projectToMarkdown.outputFileName`: Name of the output markdown file
  - Default: `"CombinedProjectFiles.md"`

- `projectToMarkdown.outputDirectory`: Output directory relative to workspace root
  - Example: `"docs"`
  - Default: `""` (workspace root)

- `projectToMarkdown.maxFileSize`: Maximum file size in bytes
  - Default: `1048576` (1MB)

- `projectToMarkdown.includeFileMetadata`: Include file metadata in output
  - Default: `true`

- `projectToMarkdown.includeTableOfContents`: Include table of contents
  - Default: `true`

- `projectToMarkdown.includeSyntaxHighlighting`: Include syntax highlighting
  - Default: `true`

## Extension Settings Example

```json
{
    "projectToMarkdown.extensions": "md,ts,js,css,html",
    "projectToMarkdown.excludeFolders": "node_modules,dist,build,.git",
    "projectToMarkdown.outputFileName": "ProjectDoc.md",
    "projectToMarkdown.outputDirectory": "docs"
}
```

## Supported File Types

The extension supports all text-based files. Just add the file extension to the `extensions` setting. For example:

- Markdown (.md)
- TypeScript (.ts)
- JavaScript (.js)
- Python (.py)
- Java (.java)
- C# (.cs)
- HTML (.html)
- CSS (.css)
- And any other text-based files...

## Known Issues

- Large projects with many files may take longer to process
- Binary files are automatically excluded
- Files larger than the configured maximum size are skipped

## Release Notes

### 0.0.3

- Initial release
- Simple configuration with comma-separated lists
- Basic file export functionality
- Configurable settings
- Progress indication
- Syntax highlighting support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.