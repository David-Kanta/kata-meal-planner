# Script to clean and prune all Git worktrees and delete the work folder
# Usage: .\clean-worktrees.ps1

Write-Host "Cleaning Git worktrees and work folder..." -ForegroundColor Cyan

# Get all worktrees and filter for those in work/ folder
$allWorktrees = git worktree list
$worktrees = @()

foreach ($line in $allWorktrees) {
    # Extract path (first part before whitespace)
    $parts = $line -split '\s+', 2
    if ($parts.Count -ge 1) {
        $path = $parts[0].Trim()
        
        # Include worktrees that contain "\work\" or "/work/" in their path
        if ($path -match '[\\/]work[\\/]') {
            $worktrees += $path
        }
    }
}

if ($worktrees.Count -eq 0) {
    Write-Host "No worktrees found." -ForegroundColor Yellow
} else {
    Write-Host "Found $($worktrees.Count) worktree(s):" -ForegroundColor Yellow
    foreach ($wt in $worktrees) {
        Write-Host "  - $wt" -ForegroundColor Gray
    }
    
    # Remove each worktree
    foreach ($worktree in $worktrees) {
        Write-Host "`nRemoving worktree: $worktree" -ForegroundColor Yellow
        try {
            git worktree remove "$worktree" --force
            if ($LASTEXITCODE -eq 0) {
                Write-Host "  ✓ Successfully removed: $worktree" -ForegroundColor Green
            } else {
                Write-Host "  ✗ Failed to remove: $worktree" -ForegroundColor Red
            }
        } catch {
            Write-Host "  ✗ Error removing $worktree : $_" -ForegroundColor Red
        }
    }
}

# Prune worktree configuration
Write-Host "`nPruning worktree configuration..." -ForegroundColor Yellow
try {
    git worktree prune
    Write-Host "  ✓ Worktree configuration pruned" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Error pruning worktree configuration: $_" -ForegroundColor Red
}

# Delete work folder if it exists
$workFolder = "work"
if (Test-Path $workFolder) {
    Write-Host "`nDeleting work folder..." -ForegroundColor Yellow
    try {
        Remove-Item -Path $workFolder -Recurse -Force
        Write-Host "  ✓ Successfully deleted work folder" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ Error deleting work folder: $_" -ForegroundColor Red
        Write-Host "  You may need to manually delete the folder" -ForegroundColor Yellow
    }
} else {
    Write-Host "`nWork folder does not exist, skipping deletion." -ForegroundColor Gray
}

Write-Host "`nCleanup complete!" -ForegroundColor Cyan
