# Project To Markdown

A Visual Studio Code extension that exports your project files to a single markdown document, making it easy to share and review your project's codebase.

## Features

- Export multiple project files to a single markdown document
- Customizable file inclusion/exclusion patterns
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

- `projectToMarkdown.includePattern`: Files to include in the export (default: `**/*.{md,ts,js,py,java,cs,html,css}`)
- `projectToMarkdown.excludePattern`: Files to exclude from the export (default: `**/node_modules/**`)
- `projectToMarkdown.outputFileName`: Name of the output markdown file (default: `CombinedProjectFiles.md`)
- `projectToMarkdown.outputDirectory`: Output directory relative to workspace root
- `projectToMarkdown.maxFileSize`: Maximum file size in bytes (default: 1MB)
- `projectToMarkdown.includeFileMetadata`: Include file metadata in output (default: true)
- `projectToMarkdown.includeTableOfContents`: Include table of contents (default: true)
- `projectToMarkdown.includeSyntaxHighlighting`: Include syntax highlighting (default: true)

## Extension Settings Example

```json
{
    "projectToMarkdown.includePattern": "**/*.{js,ts,md}",
    "projectToMarkdown.excludePattern": "**/node_modules/**",
    "projectToMarkdown.outputFileName": "ProjectDoc.md",
    "projectToMarkdown.outputDirectory": "docs",
    "projectToMarkdown.maxFileSize": 2097152,
    "projectToMarkdown.includeFileMetadata": true,
    "projectToMarkdown.includeTableOfContents": true,
    "projectToMarkdown.includeSyntaxHighlighting": true
}
```

## Supported File Types

The extension supports all text-based files, including but not limited to:

- Markdown (.md)
- TypeScript (.ts)
- JavaScript (.js)
- Python (.py)
- Java (.java)
- C# (.cs)
- HTML (.html)
- CSS (.css)
- And many more...

## Known Issues

- Large projects with many files may take longer to process
- Binary files are automatically excluded
- Files larger than the configured maximum size are skipped

## Release Notes

### 0.1.0

- Initial release
- Basic file export functionality
- Configurable settings
- Progress indication
- Syntax highlighting support

