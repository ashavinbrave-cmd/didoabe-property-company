$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.IO.Compression.FileSystem

$projectRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path.TrimEnd('\')
$releaseDirectory = Join-Path $projectRoot 'release'
if (-not (Test-Path -LiteralPath $releaseDirectory -PathType Container)) {
  New-Item -ItemType Directory -Path $releaseDirectory | Out-Null
}

$archiveName = 'didoabe-property-company-source-{0}.zip' -f (Get-Date -Format 'yyyyMMdd-HHmmss')
$archivePath = Join-Path $releaseDirectory $archiveName
$excludedDirectories = @('node_modules', 'dist', '.aistudio', '.git', 'release')
$stream = [IO.File]::Open($archivePath, [IO.FileMode]::CreateNew, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None)
$archive = $null

try {
  $archive = [IO.Compression.ZipArchive]::new(
    $stream,
    [IO.Compression.ZipArchiveMode]::Create,
    $false,
    [Text.Encoding]::UTF8
  )
  $directories = [Collections.Generic.Stack[string]]::new()
  $directories.Push($projectRoot)

  while ($directories.Count -gt 0) {
    $currentDirectory = $directories.Pop()
    foreach ($item in Get-ChildItem -LiteralPath $currentDirectory -Force) {
      if ($item.PSIsContainer) {
        if ($excludedDirectories -contains $item.Name) { continue }
        if (($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) { continue }
        $directories.Push($item.FullName)
        continue
      }

      if ($item.Name -like '.env*' -or $item.Extension -ieq '.zip') { continue }
      $relativePath = $item.FullName.Substring($projectRoot.Length + 1).Replace('\', '/')
      [IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
        $archive,
        $item.FullName,
        $relativePath,
        [IO.Compression.CompressionLevel]::Optimal
      ) | Out-Null
    }
  }
}
finally {
  if ($archive) { $archive.Dispose() }
  $stream.Dispose()
}

$result = Get-Item -LiteralPath $archivePath
Write-Output "Created $($result.FullName) ($([math]::Round($result.Length / 1MB, 2)) MB)."
